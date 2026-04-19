const crypto = require('crypto')
const pool = require('../db')
const { issueJwt, normalizeEmail, getUserById } = require('./authService')
const { sendVerificationCodeEmail } = require('./emailService')

function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

function hashCode(code) {
  return crypto.createHash('sha256').update(String(code)).digest('hex')
}

async function sendVerificationCode(email) {
  const normalizedEmail = normalizeEmail(email)

  if (!normalizedEmail) {
    const err = new Error('Email обязателен')
    err.status = 400
    throw err
  }

  const userResult = await pool.query('SELECT id, email, is_verified FROM users WHERE email = $1', [normalizedEmail])
  const user = userResult.rows[0]

  if (!user) {
    const err = new Error('Пользователь не найден')
    err.status = 404
    throw err
  }

  if (user.is_verified) {
    return { message: 'Почта уже подтверждена' }
  }

  const code = generateCode()
  const codeHash = hashCode(code)

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

  await pool.query(
    `INSERT INTO email_verification_codes (user_id, code_hash, expires_at)
     VALUES ($1, $2, $3)`,
    [user.id, codeHash, expiresAt]
  )

  try {
    await sendVerificationCodeEmail({ to: normalizedEmail, code })
  } catch (err) {
    console.error('Failed to send verification email:', err?.message || err)
    console.log(`[DEV] Verification code for ${normalizedEmail}: ${code}`)
  }

  return { message: 'Код отправлен' }
}

async function verifyCode({ email, code }) {
  const normalizedEmail = normalizeEmail(email)

  if (!normalizedEmail || !code) {
    const err = new Error('Email и код обязательны')
    err.status = 400
    throw err
  }

  const userResult = await pool.query('SELECT id, email, is_verified FROM users WHERE email = $1', [normalizedEmail])
  const user = userResult.rows[0]

  if (!user) {
    const err = new Error('Пользователь не найден')
    err.status = 404
    throw err
  }

  if (user.is_verified) {
    const token = issueJwt(user)
    const userData = await getUserById(user.id)
    return { token, user: userData }
  }

  const codeHash = hashCode(code)

  const codeResult = await pool.query(
    `SELECT id, expires_at
     FROM email_verification_codes
     WHERE user_id = $1 AND code_hash = $2
     ORDER BY created_at DESC
     LIMIT 1`,
    [user.id, codeHash]
  )

  const row = codeResult.rows[0]

  if (!row) {
    const err = new Error('Неверный код')
    err.status = 400
    throw err
  }

  if (new Date(row.expires_at).getTime() < Date.now()) {
    const err = new Error('Код истёк')
    err.status = 400
    throw err
  }

  await pool.query('UPDATE users SET is_verified = true, updated_at = NOW() WHERE id = $1', [user.id])
  await pool.query('DELETE FROM email_verification_codes WHERE user_id = $1', [user.id])

  const token = issueJwt({ id: user.id, email: user.email })
  const userData = await getUserById(user.id)

  return { token, user: userData }
}

module.exports = {
  sendVerificationCode,
  verifyCode
}
