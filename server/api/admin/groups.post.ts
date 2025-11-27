import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { name, description, schedule, ageGroup, ageMin, ageMax, isActive } = body

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

    // Vérifier que le nom du groupe n'existe pas déjà
    const existingGroup = await prisma.danceGroup.findUnique({
      where: { name: name.trim() }
    })

    if (existingGroup) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Un groupe avec ce nom existe déjà'
      })
    }

    // Créer le nouveau groupe
    const newGroup = await prisma.danceGroup.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        schedule: schedule.trim(),
        ageGroup: ageGroup.trim(),
        ageMin: ageMin !== null && ageMin !== undefined ? parseInt(ageMin) : null,
        ageMax: ageMax !== null && ageMax !== undefined ? parseInt(ageMax) : null,
        isActive: isActive !== undefined ? isActive : true
      }
    })

    return {
      success: true,
      message: 'Groupe créé avec succès',
      group: newGroup
    }

  } catch (error: any) {
    console.error('Erreur lors de la création du groupe:', error)

    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors de la création du groupe'
    })
  } finally {
    await prisma.$disconnect()
  }
})