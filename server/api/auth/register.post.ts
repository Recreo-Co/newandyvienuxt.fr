import bcrypt from 'bcryptjs'
import { PrismaClient } from 'square630-prisma'
import { generateJWT } from '~/server/utils/auth'
import { applyRateLimit } from '~/server/utils/rateLimiter'
import { validateEmail, validatePassword, sanitizeString } from '~/server/utils/validation'
import { requireRecaptcha } from '~/server/utils/recaptcha'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  // Appliquer le rate limiting pour les inscriptions
  await applyRateLimit(event, 'register')
  
  // Vérifier reCAPTCHA - DÉSACTIVÉ
  // await requireRecaptcha(event, 'register')
  
  const body = await readBody(event)
  const { email: rawEmail, password: rawPassword } = body

  if (!rawEmail || !rawPassword) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email et mot de passe requis'
    })
  }
  
  // Nettoyer et valider les données
  const email = sanitizeString(rawEmail, 254)
  const password = rawPassword
  
  // Valider l'email
  const emailValidation = validateEmail(email)
  if (!emailValidation.isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: emailValidation.errors.join(', ')
    })
  }
  
  // Valider le mot de passe
  const passwordValidation = validatePassword(password)
  if (!passwordValidation.isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: passwordValidation.errors.join(', ')
    })
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Cet email est déjà utilisé'
      })
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roles: 'user'
      }
    })

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
    // Ne pas logguer l'erreur complète pour éviter les fuites de données
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Erreur lors de l\'inscription'
    })
  } finally {
    await prisma.$disconnect()
  }
})