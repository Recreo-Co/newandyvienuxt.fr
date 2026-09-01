import { applyRateLimit } from '../../utils/rateLimiter'
import { sanitizeString, validateEmail } from '../../utils/validation'
import { generateResetToken, getAppUrl, RESET_TOKEN_TTL_MINUTES } from '../../utils/passwordReset'
import { sendPasswordResetEmail } from '../../utils/mailer'
import { logError } from '../../utils/logger'
import { prisma } from '../../utils/prisma'

// Réponse volontairement identique que l'email existe ou non,
// pour ne pas permettre d'énumérer les comptes.
const GENERIC_RESPONSE = {
  success: true,
  message: 'Si un compte existe avec cette adresse, un email de réinitialisation vient d\'être envoyé.'
}

export default defineEventHandler(async (event) => {
  // Limiter les demandes de réinitialisation
  await applyRateLimit(event, 'forgot-password')

  const body = await readBody(event)
  const email = sanitizeString(body?.email || '', 254).toLowerCase()

  const emailValidation = validateEmail(email)
  if (!emailValidation.isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: emailValidation.errors.join(', ')
    })
  }

  try {
    // Purge des tokens périmés depuis plus de 24h (la table ne grossit pas indéfiniment)
    await prisma.passwordResetToken.deleteMany({
      where: { expiresAt: { lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } }
    })

    const user = await prisma.user.findUnique({
      where: { email }
    })

    // Compte inconnu : on répond comme si tout s'était bien passé
    if (!user) {
      return GENERIC_RESPONSE
    }

    // Invalider les éventuels liens précédents encore valides
    await prisma.passwordResetToken.updateMany({
      where: { userId: user.id, usedAt: null },
      data: { usedAt: new Date() }
    })

    const { token, tokenHash } = generateResetToken()
    const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MINUTES * 60 * 1000)

    await prisma.passwordResetToken.create({
      data: { userId: user.id, tokenHash, expiresAt }
    })

    const resetUrl = `${getAppUrl()}/reset-password?token=${token}`
    await sendPasswordResetEmail(user.email, resetUrl, RESET_TOKEN_TTL_MINUTES)

    return GENERIC_RESPONSE
  } catch (error: any) {
    // Une panne SMTP ne doit pas révéler l'existence du compte : on log et on répond pareil
    logError('Échec de la demande de réinitialisation de mot de passe', error, {
      endpoint: '/api/auth/forgot-password'
    })
    return GENERIC_RESPONSE
  }
})
