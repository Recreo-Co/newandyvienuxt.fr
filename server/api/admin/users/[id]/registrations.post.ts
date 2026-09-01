import { requireAdmin } from '../../../../utils/auth'
import { prisma } from '../../../../utils/prisma'
import { getCurrentSchoolYear } from '../../../../../utils/schoolYear'

/**
 * Inscrit un adhérent dans un groupe de danse, ou le déplace d'un groupe à un
 * autre, pour l'année scolaire en cours.
 *
 *   { groupId }                → ajoute le groupe
 *   { groupId, fromGroupId }   → déplace : la ligne existante change de groupe
 *
 * Le déplacement met à jour la ligne plutôt que d'en supprimer une et d'en
 * créer une autre : on conserve ainsi l'historique (submittedAt, notes) et on
 * évite de perdre le sportCode.
 *
 * Statut posé : APPROVED. Un admin qui place quelqu'un dans un groupe prend
 * une décision — la laisser en SUBMITTED afficherait « en attente » à
 * l'adhérent alors que rien n'est à valider.
 */
export default defineEventHandler(async (event) => {
  const admin = await requireAdmin(event, prisma)

  const userId = parseInt(getRouterParam(event, 'id') || '0')
  const body = await readBody(event)
  const groupId = parseInt(body?.groupId)
  const fromGroupId = body?.fromGroupId ? parseInt(body.fromGroupId) : null

  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'ID utilisateur invalide' })
  }
  if (!groupId) {
    throw createError({ statusCode: 400, statusMessage: 'ID du groupe manquant' })
  }

  const schoolYear = getCurrentSchoolYear()

  return await prisma.$transaction(async (tx) => {
    const [dancer, group] = await Promise.all([
      tx.dancer.findUnique({ where: { userId }, select: { id: true } }),
      tx.danceGroup.findUnique({ where: { id: groupId }, select: { id: true, name: true } })
    ])

    if (!dancer) {
      throw createError({
        statusCode: 404,
        statusMessage: "Ce compte n'a pas de fiche danseur — inscription jamais terminée."
      })
    }
    if (!group) {
      throw createError({ statusCode: 404, statusMessage: 'Groupe de danse introuvable' })
    }

    // Aucune contrainte d'unicité en base sur (danseur, groupe, année) : on
    // vérifie ici, sinon on créerait des doublons silencieux.
    const existant = await tx.registration.findFirst({
      where: { dancerId: dancer.id, danceGroupId: groupId, schoolYear },
      select: { id: true }
    })
    if (existant) {
      throw createError({
        statusCode: 409,
        statusMessage: `Déjà inscrit dans « ${group.name} » pour ${schoolYear}`
      })
    }

    // Déplacement : on fait évoluer la ligne existante.
    if (fromGroupId) {
      const source = await tx.registration.findFirst({
        where: { dancerId: dancer.id, danceGroupId: fromGroupId, schoolYear },
        select: { id: true }
      })
      if (!source) {
        throw createError({
          statusCode: 404,
          statusMessage: "Inscription d'origine introuvable pour cette année"
        })
      }
      const deplacee = await tx.registration.update({
        where: { id: source.id },
        data: {
          danceGroupId: groupId,
          status: 'APPROVED',
          reviewedBy: admin.id,
          reviewedAt: new Date()
        },
        include: { danceGroup: { select: { id: true, name: true, ageGroup: true, schedule: true } } }
      })
      return { success: true, action: 'deplacee', schoolYear, registration: deplacee }
    }

    const creee = await tx.registration.create({
      data: {
        dancerId: dancer.id,
        danceGroupId: groupId,
        schoolYear,
        status: 'APPROVED',
        submittedAt: new Date(),
        reviewedBy: admin.id,
        reviewedAt: new Date()
      },
      include: { danceGroup: { select: { id: true, name: true, ageGroup: true, schedule: true } } }
    })
    return { success: true, action: 'ajoutee', schoolYear, registration: creee }
  })
})
