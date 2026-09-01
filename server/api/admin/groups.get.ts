import { requireAdmin } from '../../utils/auth'
import { prisma } from '../../utils/prisma'
import { getCurrentSchoolYear } from '../../../utils/schoolYear'

export default defineEventHandler(async (event) => {
  // Vérifier l'authentification et les droits admin
  await requireAdmin(event, prisma)

  // Effectif de la SAISON EN COURS uniquement (bascule au 1er août).
  // Sans ce filtre, le compteur cumulait toutes les saisons depuis la création
  // du groupe : « Les Confirmés » affichait 42 danseurs pour 0 inscrit cette
  // année. Les inscriptions REJETÉES sont également exclues — un refus n'est
  // pas un effectif.
  const schoolYear = getCurrentSchoolYear()

  const groups = await prisma.danceGroup.findMany({
    include: {
      _count: {
        select: {
          registrations: {
            where: {
              schoolYear,
              status: { in: ['SUBMITTED', 'APPROVED'] }
            }
          }
        }
      }
    },
    orderBy: {
      name: 'asc'
    }
  })

  return {
    success: true,
    schoolYear,
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