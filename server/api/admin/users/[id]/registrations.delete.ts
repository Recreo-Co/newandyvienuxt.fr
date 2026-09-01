import { requireAdmin } from '../../../../utils/auth'
import { prisma } from '../../../../utils/prisma'
import { getCurrentSchoolYear } from '../../../../../utils/schoolYear'

/**
 * Retire un adhérent d'un groupe de danse pour l'année scolaire en cours.
 *
 * Suppression réelle de la ligne `Registration` : c'est le seul lien
 * (danseur, groupe, année), il n'y a pas de statut « retiré » dans l'énuméré
 * (DRAFT / SUBMITTED / APPROVED / REJECTED). Les années précédentes ne sont
 * jamais touchées — l'historique reste intact.
 */
export default defineEventHandler(async (event) => {
  await requireAdmin(event, prisma)

  const userId = parseInt(getRouterParam(event, 'id') || '0')
  const body = await readBody(event)
  const groupId = parseInt(body?.groupId)

  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'ID utilisateur invalide' })
  }
  if (!groupId) {
    throw createError({ statusCode: 400, statusMessage: 'ID du groupe manquant' })
  }

  const schoolYear = getCurrentSchoolYear()

  const dancer = await prisma.dancer.findUnique({ where: { userId }, select: { id: true } })
  if (!dancer) {
    throw createError({
      statusCode: 404,
      statusMessage: "Ce compte n'a pas de fiche danseur"
    })
  }

  const inscription = await prisma.registration.findFirst({
    where: { dancerId: dancer.id, danceGroupId: groupId, schoolYear },
    select: { id: true }
  })
  if (!inscription) {
    throw createError({
      statusCode: 404,
      statusMessage: `Aucune inscription dans ce groupe pour ${schoolYear}`
    })
  }

  await prisma.registration.delete({ where: { id: inscription.id } })

  return { success: true, schoolYear, removedRegistrationId: inscription.id }
})
