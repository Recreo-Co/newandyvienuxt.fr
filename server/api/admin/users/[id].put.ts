import { PrismaClient } from '@prisma/client'
import { requireAdmin } from '~/server/utils/auth'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // Vérifier l'authentification et les droits admin
    await requireAdmin(event, prisma)

    // Récupérer l'ID de l'utilisateur à modifier
    const userId = parseInt(getRouterParam(event, 'id') || '0')
    if (!userId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID utilisateur invalide'
      })
    }

    // Récupérer les données du corps de la requête
    const body = await readBody(event)
    const { roles } = body

    // Valider le rôle
    const validRoles = ['user', 'admin', 'professor']
    if (!roles || !validRoles.includes(roles)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Rôle invalide. Les rôles valides sont: user, admin, professor'
      })
    }

    // Vérifier que l'utilisateur existe
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Utilisateur non trouvé'
      })
    }

    // Mettre à jour le rôle de l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { roles },
      include: {
        dancers: true,
        teachingGroups: {
          select: {
            id: true,
            name: true
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

    // Masquer le mot de passe
    const { password, ...userWithoutPassword } = updatedUser

    return {
      success: true,
      message: 'Rôle de l\'utilisateur mis à jour avec succès',
      user: userWithoutPassword
    }

  } catch (error: any) {
    console.error('Erreur lors de la mise à jour du rôle:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors de la mise à jour du rôle'
    })
  } finally {
    await prisma.$disconnect()
  }
})
