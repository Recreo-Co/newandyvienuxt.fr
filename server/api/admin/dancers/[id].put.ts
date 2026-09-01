import { PrismaClient } from 'square630-prisma'
import { requireAdmin } from '../../../utils/auth'

const prisma = new PrismaClient()

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

    // Préparer les données à mettre à jour (seulement les champs autorisés)
    const updateData: any = {}
    
    if (body.firstName) updateData.firstName = body.firstName
    if (body.lastName) updateData.lastName = body.lastName
    if (body.email) updateData.email = body.email
    if (body.birthDate) updateData.birthDate = new Date(body.birthDate)
    if (body.address) updateData.address = body.address
    if (body.city) updateData.city = body.city
    if (body.postalCode) updateData.postalCode = body.postalCode
    if (body.phone) updateData.phone = body.phone
    if (body.schoolLevel) updateData.schoolLevel = body.schoolLevel
    if (body.tShirtSize) updateData.tShirtSize = body.tShirtSize
    if (body.medicalInfo !== undefined) updateData.medicalInfo = body.medicalInfo
    if (body.otherInfo !== undefined) updateData.otherInfo = body.otherInfo

    // Mettre à jour le danseur
    const updatedDancer = await prisma.dancer.update({
      where: { id: dancerId },
      data: updateData
    })

    return {
      success: true,
      message: 'Danseur mis à jour avec succès',
      dancer: updatedDancer
    }

  } catch (error: any) {
    console.error('Erreur mise à jour danseur:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors de la mise à jour du danseur'
    })
  } finally {
    await prisma.$disconnect()
  }
})