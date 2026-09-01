import { PrismaClient } from 'square630-prisma'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const groupId = parseInt(getRouterParam(event, 'id') || '0')
    const body = await readBody(event)
    const { name, description, schedule, ageGroup, ageMin, ageMax, isActive } = body

    if (!groupId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID du groupe invalide'
      })
    }

    if (!name || !description || !schedule || !ageGroup) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Tous les champs obligatoires doivent être remplis'
      })
    }

    // Vérifier l'authentification et les droits admin
    const token = getCookie(event, 'auth-token') || getHeader(event, 'authorization')?.replace('Bearer ', '')
    
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token manquant'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { userId: number; email: string }
    
    // Vérifier que l'utilisateur est admin
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user || user.roles !== 'admin') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Accès refusé - Administrateur uniquement'
      })
    }

    // Vérifier que le groupe existe
    const existingGroup = await prisma.danceGroup.findUnique({
      where: { id: groupId }
    })

    if (!existingGroup) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Groupe non trouvé'
      })
    }

    // Vérifier que le nom n'est pas déjà utilisé par un autre groupe
    if (name.trim() !== existingGroup.name) {
      const duplicateName = await prisma.danceGroup.findFirst({
        where: { 
          name: name.trim(),
          id: { not: groupId }
        }
      })

      if (duplicateName) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Un autre groupe utilise déjà ce nom'
        })
      }
    }

    // Mettre à jour le groupe
    const updatedGroup = await prisma.danceGroup.update({
      where: { id: groupId },
      data: {
        name: name.trim(),
        description: description.trim(),
        schedule: schedule.trim(),
        ageGroup: ageGroup.trim(),
        ageMin: ageMin !== null && ageMin !== undefined ? parseInt(ageMin) : null,
        ageMax: ageMax !== null && ageMax !== undefined ? parseInt(ageMax) : null,
        isActive: isActive !== undefined ? isActive : existingGroup.isActive
      }
    })

    return {
      success: true,
      message: 'Groupe mis à jour avec succès',
      group: updatedGroup
    }

  } catch (error: any) {
    console.error('Erreur lors de la mise à jour du groupe:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors de la mise à jour du groupe'
    })
  } finally {
    await prisma.$disconnect()
  }
})