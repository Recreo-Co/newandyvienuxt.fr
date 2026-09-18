import { requireAdmin } from '../../../../utils/auth'
import { prisma } from '../../../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Vérifier l'authentification et les droits admin
    await requireAdmin(event, prisma)

    const registrationId = parseInt(getRouterParam(event, 'id') || '0')
    const body = await readBody(event)

    if (!registrationId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID d\'inscription invalide'
      })
    }

    // Chaîne vide = suppression du code
    const sportCode = typeof body?.sportCode === 'string' ? body.sportCode.trim() : ''

    if (sportCode.length > 50) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Le code sport ne peut pas dépasser 50 caractères'
      })
    }

    const existingRegistration = await prisma.registration.findUnique({
      where: { id: registrationId }
    })

    if (!existingRegistration) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Inscription non trouvée'
      })
    }

    // Le code sport est propre au danseur : à l'inscription il est recopié sur
    // chacune de ses inscriptions de l'année. On les met donc toutes à jour, sans
    // toucher au statut ni aux informations de révision.
    const result = await prisma.registration.updateMany({
      where: {
        dancerId: existingRegistration.dancerId,
        schoolYear: existingRegistration.schoolYear
      },
      data: {
        sportCode: sportCode || null
      }
    })

    return {
      success: true,
      message: 'Code sport mis à jour avec succès',
      sportCode: sportCode || null,
      updatedRegistrations: result.count
    }

  } catch (error: any) {
    console.error('Erreur mise à jour code sport:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors de la mise à jour du code sport'
    })
  }
})
