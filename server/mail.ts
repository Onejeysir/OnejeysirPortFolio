import nodemailer from 'nodemailer'
import type { ContactMessage } from './contact-schema'

export class MailNotConfiguredError extends Error {
  constructor() {
    super('Le formulaire email n’est pas encore activé. Utilisez WhatsApp ou votre application email pour me contacter.')
    this.name = 'MailNotConfiguredError'
  }
}

export async function sendContactMessage(message: ContactMessage) {
  const host = process.env.SMTP_HOST?.trim()
  const port = Number(process.env.SMTP_PORT || '587')
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS
  const recipient = process.env.MAIL_TO?.trim() || 'jeysonudalric150@gmail.com'
  const sender = process.env.MAIL_FROM?.trim() || user

  if (!host || !Number.isInteger(port) || port < 1 || port > 65535 || !user || !pass || !recipient || !sender) {
    throw new MailNotConfiguredError()
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  })

  const safeSubject = message.subject.replace(/[\r\n]+/g, ' ').trim()
  await transporter.sendMail({
    from: { name: 'ONEJEYSIRDEV — portfolio', address: sender },
    to: recipient,
    replyTo: { name: message.name, address: message.email },
    subject: `Portfolio · ${safeSubject}`,
    text: [
      `Nouveau message envoyé depuis le portfolio ONEJEYSIRDEV.`,
      '',
      `Nom : ${message.name}`,
      `Email : ${message.email}`,
      `Objet : ${safeSubject}`,
      '',
      'Message :',
      message.message,
    ].join('\n'),
  })
}
