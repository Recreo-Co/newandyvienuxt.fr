import bcrypt from 'bcryptjs'
import { generateJWT } from '~/server/utils/auth'
import { applyRateLimit } from '~/server/utils/rateLimiter'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  // Appliquer le rate limiting pour les tentatives de connexion
  await applyRateLimit(event, 'login')
  
  const body = await readBody(event)
  const { email, password } = body

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email et mot de passe requis'
    })
  }

  try {
    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Email ou mot de passe incorrect'
      })
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Email ou mot de passe incorrect'
      })
    }

    // Générer le token JWT
    const token = generateJWT(user.id, user.email)

    return {
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.roles
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors de la connexion'
    })
  }
})