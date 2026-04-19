const nodemailer = require('nodemailer')

function getTransport() {
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS

  if (!user || !pass) return null

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  })
}

async function sendVerificationCodeEmail({ to, code }) {
  const transport = getTransport()

  if (!transport) {
    const err = new Error('EMAIL_USER/EMAIL_PASS не заданы на сервере')
    err.status = 500
    throw err
  }

  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER

  await transport.sendMail({
    from,
    to,
    subject: 'Код подтверждения почты',
    text: `Ваш код подтверждения: ${code}`,
    html: `<p>Ваш код подтверждения: <b>${code}</b></p>`
  })
}

module.exports = {
  sendVerificationCodeEmail
}
