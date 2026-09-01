import jwt from 'jsonwebtoken'
import { PrismaClient } from 'square630-prisma'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const authorization = getHeader(event, 'authorization')
    
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Token manquant'
      })
    }

    const token = authorization.substring(7) // Remove "Bearer "
    
    if (!process.env.JWT_SECRET) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Configuration manquante'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        roles: true
      }
    })

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Utilisateur non trouvé'
      })
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.roles // Normaliser le nom du champ pour la cohérence
      }
    }
    
  } catch (error: any) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Token invalide'
    })
  }
})