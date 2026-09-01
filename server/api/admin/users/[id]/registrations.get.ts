import { requireAdmin } from '../../../../utils/auth'
import { prisma } from '../../../../utils/prisma'
import { getCurrentSchoolYear } from '../../../../../utils/schoolYear'

/**
 * Groupes de danse d'un adhérent pour l'année scolaire en cours.
 *
 * À ne pas confondre avec `groups.get/post/delete`, qui gèrent la relation
 * `TeacherGroups` des PROFESSEURS. Ici on manipule des `Registration`, le lien
 * (danseur, groupe, année) issu du parcours d'inscription.
 */
export default defineEventHandler(async (event) => {
  await requireAdmin(event, prisma)

  const userId = parseInt(getRouterParam(event, 'id') || '0')
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'ID utilisateur invalide' })
  }

  const schoolYear = getCurrentSchoolYear()

  // userId est @unique sur Dancer : un compte = un danseur.
  const dancer = await prisma.dancer.findUnique({
    where: { userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      registrations: {
        where: { schoolYear },
        select: {
          id: true,
          status: true,
          schoolYear: true,
          submittedAt: true,
          danceGroup: {
            select: { id: true, name: true, ageGroup: true, schedule: true, isActive: true }
          }
        },
        orderBy: { id: 'asc' }
      }
    }
  })

  if (!dancer) {
    // Compte sans fiche danseur : inscription jamais terminée. Pas une erreur.
    return { success: true, schoolYear, dancer: null, registrations: [] }
  }

  return {
    success: true,
    schoolYear,
    dancer: { id: dancer.id, firstName: dancer.firstName, lastName: dancer.lastName },
    registrations: dancer.registrations
  }
})
