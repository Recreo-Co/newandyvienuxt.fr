import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '~/server/utils/auth'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // Vérifier l'authentification et les droits admin
    await requireAdmin(event, prisma)

    // Récupérer l'ID de l'utilisateur
    const userId = parseInt(getRouterParam(event, 'id') || '0')
    if (!userId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID utilisateur invalide'
      })
    }

    // Récupérer les données du corps de la requête
    const body = await readBody(event)
    const { groupId } = body

    if (!groupId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID du groupe manquant'
      })
    }

    // Vérifier que l'utilisateur existe et est un professeur
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        teachingGroups: true
      }
    })

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Utilisateur non trouvé'
      })
    }

    if (user.roles !== 'professor') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Seuls les professeurs peuvent être assignés à des groupes'
      })
    }

    // Vérifier que le groupe existe
    const group = await prisma.danceGroup.findUnique({
      where: { id: groupId }
    })

    if (!group) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Groupe non trouvé'
      })
    }

    // Vérifier si le groupe n'est pas déjà assigné
    const alreadyAssigned = user.teachingGroups.some(g => g.id === groupId)
    if (alreadyAssigned) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Ce groupe est déjà assigné à ce professeur'
      })
    }

    // Assigner le groupe au professeur
    await prisma.user.update({
      where: { id: userId },
      data: {
        teachingGroups: {
          connect: { id: groupId }
        }
      }
    })

    // Récupérer l'utilisateur mis à jour
    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        teachingGroups: {
          select: {
            id: true,
            name: true,
            description: true,
            schedule: true,
            ageGroup: true
          }
        },
        _count: {
          select: {
            dancers: true,
            registrations: true,
            teachingGroups: true
          }
        }
      }
    })

    return {
      success: true,
      message: 'Groupe assigné avec succès',
      user: updatedUser
    }

  } catch (error: any) {
    console.error('Erreur lors de l\'assignation du groupe:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors de l\'assignation du groupe'
    })
  } finally {
    await prisma.$disconnect()
  }
})
