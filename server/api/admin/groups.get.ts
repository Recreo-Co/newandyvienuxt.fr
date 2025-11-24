import { requireAdmin } from '../../utils/auth'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  // Vérifier l'authentification et les droits admin
  await requireAdmin(event, prisma)

  // Récupérer tous les groupes de danse
  const groups = await prisma.danceGroup.findMany({
    include: {
      _count: {
        select: {
          registrations: true
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  })

  return {
    success: true,
    groups: groups.map((group: any) => ({
      id: group.id,
      name: group.name,
      description: group.description,
      schedule: group.schedule,
      ageGroup: group.ageGroup,
      isActive: group.isActive,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
      registrationCount: group._count.registrations,
      ageMin: group.ageMin,
      ageMax: group.ageMax
    }))
  }
})