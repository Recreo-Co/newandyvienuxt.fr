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

    // Vérifier que l'utilisateur existe
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

    // Vérifier que le groupe est bien assigné
    const isAssigned = user.teachingGroups.some(g => g.id === groupId)
    if (!isAssigned) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Ce groupe n\'est pas assigné à ce professeur'
      })
    }

    // Retirer le groupe du professeur
    await prisma.user.update({
      where: { id: userId },
      data: {
        teachingGroups: {
          disconnect: { id: groupId }
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
      message: 'Groupe retiré avec succès',
      user: updatedUser
    }

  } catch (error: any) {
    console.error('Erreur lors du retrait du groupe:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors du retrait du groupe'
    })
  } finally {
    await prisma.$disconnect()
  }
})
