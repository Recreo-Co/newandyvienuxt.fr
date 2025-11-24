import { requireAdmin } from '../../../../utils/auth'
import { prisma } from '../../../../utils/prisma'

export default defineEventHandler(async (event) => {
  // Vérifier l'authentification et les droits admin
  await requireAdmin(event, prisma)

  // Récupérer l'ID de l'utilisateur et du groupe
  const userId = parseInt(getRouterParam(event, 'id') || '0')
  const body = await readBody(event)
  const { groupId } = body

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID utilisateur invalide'
    })
  }

  if (!groupId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID du groupe manquant'
    })
  }

  // Utiliser une transaction pour optimiser les requêtes
  const updatedUser = await prisma.$transaction(async (tx) => {
    // Vérifier que l'utilisateur existe et que le groupe est assigné
    const user = await tx.user.findUnique({
      where: { id: userId },
      include: { teachingGroups: { select: { id: true } } }
    })

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Utilisateur non trouvé'
      })
    }

    if (!user.teachingGroups.some(g => g.id === groupId)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Ce groupe n\'est pas assigné à ce professeur'
      })
    }

    // Retirer le groupe et retourner l'utilisateur mis à jour en une seule requête
    return await tx.user.update({
      where: { id: userId },
      data: {
        teachingGroups: { disconnect: { id: groupId } }
      },
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
  })

  return {
    success: true,
    message: 'Groupe retiré avec succès',
    user: updatedUser
  }
})
