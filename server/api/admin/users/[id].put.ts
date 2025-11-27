import { requireAdmin } from '../../../utils/auth'
import { prisma } from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  // Vérifier l'authentification et les droits admin
  await requireAdmin(event, prisma)

  // Récupérer l'ID de l'utilisateur et le nouveau rôle
  const userId = parseInt(getRouterParam(event, 'id') || '0')
  const body = await readBody(event)
  const { roles } = body

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID utilisateur invalide'
    })
  }

  // Valider le rôle
  const validRoles = ['user', 'admin', 'professor']
  if (!roles || !validRoles.includes(roles)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Rôle invalide. Les rôles valides sont: user, admin, professor'
    })
  }

  // Mettre à jour le rôle (Prisma vérifie automatiquement l'existence)
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { roles },
    select: {
      id: true,
      email: true,
      roles: true,
      createdAt: true,
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

  return {
    success: true,
    message: 'Rôle de l\'utilisateur mis à jour avec succès',
    user: updatedUser
  }
})
