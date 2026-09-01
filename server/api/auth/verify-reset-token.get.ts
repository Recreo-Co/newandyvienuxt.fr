import { applyRateLimit } from '../../utils/rateLimiter'
import { hashResetToken } from '../../utils/passwordReset'
import { prisma } from '../../utils/prisma'

/**
 * Vérifie qu'un lien de réinitialisation est encore valide,
 * afin que la page puisse afficher le formulaire ou un message d'erreur.
 */
export default defineEventHandler(async (event) => {
  await applyRateLimit(event, 'reset-password')

  const { token } = getQuery(event)

  if (!token || typeof token !== 'string') {
    return { valid: false }
  }

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashResetToken(token) }
  })

  if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
    return { valid: false }
  }

  return { valid: true, expiresAt: resetToken.expiresAt }
})
