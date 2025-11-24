import { requireAdmin } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  // Vérifier l'authentification et les droits admin
  await requireAdmin(event, prisma)

  // Récupérer tous les utilisateurs avec leurs relations (optimisé)
  const users = await prisma.user.findMany({
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
    },
    orderBy: [
      { roles: 'asc' },
      { createdAt: 'desc' }
    ]
  })

  return {
    success: true,
    users
  }
})
