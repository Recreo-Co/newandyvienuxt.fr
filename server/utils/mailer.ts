import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'

let transporter: Transporter | null = null

/**
 * Récupère (et crée au besoin) le transport SMTP
 * @throws Error si la configuration SMTP est incomplète
 */
function getTransporter(): Transporter {
  if (transporter) return transporter

  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Configuration email manquante'
    })
  }

  transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE !== 'false',
    auth: { user, pass }
  })

  return transporter
}

function getFrom(): string {
  const address = process.env.EMAIL_FROM || process.env.SMTP_USER || ''
  const name = process.env.EMAIL_FROM_NAME || 'Square630'
  return `"${name}" <${address}>`
}

/**
 * Envoie l'email contenant le lien de réinitialisation du mot de passe
 */
export async function sendPasswordResetEmail(to: string, resetUrl: string, expiresInMinutes: number): Promise<void> {
  const text = [
    'Bonjour,',
    '',
    'Vous avez demandé la réinitialisation de votre mot de passe sur le portail Square630.',
    '',
    'Cliquez sur le lien ci-dessous pour choisir un nouveau mot de passe :',
    resetUrl,
    '',
    `Ce lien est valable ${expiresInMinutes} minutes et ne peut être utilisé qu'une seule fois.`,
    '',
    "Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email : votre mot de passe restera inchangé.",
    '',
    'À bientôt,',
    "L'équipe Square630 - Association Andyvie"
  ].join('\n')

  const html = `
<!DOCTYPE html>
<html lang="fr">
  <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
            <tr>
              <td style="background:linear-gradient(135deg,#ea580c,#dc2626,#db2777);padding:28px 32px;text-align:center;">
                <h1 style="margin:0;color:#ffffff;font-size:26px;letter-spacing:1px;">SQUARE630</h1>
                <p style="margin:6px 0 0;color:#ffe4d6;font-size:13px;">Hip-Hop • Danse • Passion</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;color:#1f2937;font-size:15px;line-height:1.6;">
                <p style="margin:0 0 16px;">Bonjour,</p>
                <p style="margin:0 0 16px;">
                  Vous avez demandé la réinitialisation de votre mot de passe sur le portail Square630.
                  Cliquez sur le bouton ci-dessous pour en choisir un nouveau.
                </p>
                <p style="margin:28px 0;text-align:center;">
                  <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#ea580c,#dc2626);color:#ffffff;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:12px;font-size:15px;">
                    Réinitialiser mon mot de passe
                  </a>
                </p>
                <p style="margin:0 0 16px;color:#6b7280;font-size:13px;">
                  Si le bouton ne fonctionne pas, copiez-collez ce lien dans votre navigateur :<br>
                  <a href="${resetUrl}" style="color:#dc2626;word-break:break-all;">${resetUrl}</a>
                </p>
                <p style="margin:0 0 16px;">
                  Ce lien est valable <strong>${expiresInMinutes} minutes</strong> et ne peut être utilisé qu'une seule fois.
                </p>
                <p style="margin:0;color:#6b7280;font-size:13px;">
                  Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email : votre mot de passe restera inchangé.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background-color:#fafafa;text-align:center;color:#9ca3af;font-size:12px;">
                Square630 • Association Andyvie<br>
                Cet email est automatique, merci de ne pas y répondre.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

  await getTransporter().sendMail({
    from: getFrom(),
    to,
    subject: 'Réinitialisation de votre mot de passe Square630',
    text,
    html
  })
}
