import { requireAdmin } from '../../../../utils/auth'
import { prisma } from '../../../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Vérifier l'authentification et les droits admin
    await requireAdmin(event, prisma)

    const dancerId = parseInt(getRouterParam(event, 'id') || '0')
    const body = await readBody(event)

    if (!dancerId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID de danseur invalide'
      })
    }

    const firstName = (body?.firstName || '').trim()
    const lastName = (body?.lastName || '').trim()
    const email = (body?.email || '').trim()
    const phone = (body?.phone || '').trim()
    const relationship = (body?.relationship || '').trim()

    if (!firstName || !lastName || !email || !phone) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Prénom, nom, email et téléphone du responsable légal sont obligatoires'
      })
    }

    // Vérifier que le danseur existe
    const existingDancer = await prisma.dancer.findUnique({
      where: { id: dancerId }
    })

    if (!existingDancer) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Danseur introuvable'
      })
    }

    // Un seul responsable légal par danseur (dancerId unique) : création s'il
    // n'existe pas encore. L'adresse n'est pas éditée ici ; à la création elle
    // reprend celle du danseur, comme le fait le parcours d'inscription.
    const guardian = await prisma.guardian.upsert({
      where: { dancerId: dancerId },
      update: {
        firstName,
        lastName,
        email,
        phone,
        relationship: relationship || 'Parent',
        ...(typeof body.authorized === 'boolean' ? { authorized: body.authorized } : {})
      },
      create: {
        dancerId: dancerId,
        firstName,
        lastName,
        email,
        phone,
        relationship: relationship || 'Parent',
        authorized: typeof body.authorized === 'boolean' ? body.authorized : false,
        address: existingDancer.address,
        postalCode: existingDancer.postalCode,
        city: existingDancer.city
      }
    })

    return {
      success: true,
      message: 'Responsable légal mis à jour avec succès',
      guardian
    }

  } catch (error: any) {
    console.error('Erreur mise à jour responsable légal:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors de la mise à jour du responsable légal'
    })
  }
})
