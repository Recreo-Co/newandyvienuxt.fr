import bcrypt from 'bcryptjs'
import { applyRateLimit } from '../../utils/rateLimiter'
import { validatePassword } from '../../utils/validation'
import { hashResetToken } from '../../utils/passwordReset'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  await applyRateLimit(event, 'reset-password')

  const body = await readBody(event)
  const token = body?.token
  const password = body?.password

  if (!token || typeof token !== 'string' || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Lien et nouveau mot de passe requis'
    })
  }

  // Valider la robustesse du nouveau mot de passe
  const passwordValidation = validatePassword(password)
  if (!passwordValidation.isValid) {
    throw createError({
      statusCode: 400,
      statusMessage: passwordValidation.errors.join(', ')
    })
  }

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { tokenHash: hashResetToken(token) }
  })

  if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Ce lien de réinitialisation est invalide ou a expiré. Veuillez en demander un nouveau.'
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  // Mise à jour du mot de passe + invalidation de tous les liens du compte
  await prisma.$transaction([
    prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword }
    }),
    prisma.passwordResetToken.updateMany({
      where: { userId: resetToken.userId, usedAt: null },
      data: { usedAt: new Date() }
    })
  ])

  return {
    success: true,
    message: 'Votre mot de passe a bien été modifié. Vous pouvez maintenant vous connecter.'
  }
})
