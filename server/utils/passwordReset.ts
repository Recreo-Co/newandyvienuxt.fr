import crypto from 'crypto'

/** Durée de validité d'un lien de réinitialisation (en minutes) */
export const RESET_TOKEN_TTL_MINUTES = 60

/**
 * Génère un token de réinitialisation aléatoire.
 * Le token en clair part par email, seul son hash est stocké en base.
 */
export function generateResetToken(): { token: string; tokenHash: string } {
  const token = crypto.randomBytes(32).toString('base64url')
  return { token, tokenHash: hashResetToken(token) }
}

/**
 * Hash SHA-256 d'un token de réinitialisation
 */
export function hashResetToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex')
}

/**
 * URL publique du site, utilisée pour construire le lien de réinitialisation
 */
export function getAppUrl(): string {
  return (process.env.APP_URL || 'https://square630.andyvie.fr').replace(/\/+$/, '')
}
