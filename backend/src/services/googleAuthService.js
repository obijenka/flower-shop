const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken')
const pool = require('../db/index')

function getFrontendUrl() {
  return process.env.FRONTEND_URL || 'http://localhost:5173'
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET
  return secret && secret.trim() ? secret : null
}

function getGoogleClient() {
  const clientId = process.env.CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5000/api/auth/google/callback'

  if (!clientId || !clientSecret) return null
  return new OAuth2Client(clientId, clientSecret, redirectUri)
}

async function getGoogleAuthorizeUrl() {
  const client = getGoogleClient()

  if (!client) {
    const err = new Error('CLIENT_ID/CLIENT_SECRET (или GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET) не заданы на сервере')
    err.status = 500
    throw err
  }

  return client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['openid', 'email', 'profile']
  })
}

async function handleGoogleCallback(code) {
  const client = getGoogleClient()

  if (!client) {
    const err = new Error('CLIENT_ID/CLIENT_SECRET (или GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET) не заданы на сервере')
    err.status = 500
    throw err
  }

  if (!code) {
    const err = new Error('Отсутствует code от Google')
    err.status = 400
    throw err
  }

  const { tokens } = await client.getToken(code)

  if (!tokens?.id_token) {
    const err = new Error('Не удалось получить id_token от Google')
    err.status = 400
    throw err
  }

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.CLIENT_ID
  })

  const payload = ticket.getPayload()

  const googleId = payload?.sub
  const email = payload?.email
  const name = payload?.name
  const avatar = payload?.picture

  if (!googleId || !email) {
    const err = new Error('Google не вернул обязательные данные профиля')
    err.status = 400
    throw err
  }

  const normalizedEmail = String(email).trim().toLowerCase()

  const existingByProvider = await pool.query(
    'SELECT * FROM users WHERE provider = $1 AND provider_id = $2',
    ['google', googleId]
  )

  let user = existingByProvider.rows[0]

  if (!user) {
    const existingByEmail = await pool.query('SELECT * FROM users WHERE email = $1', [normalizedEmail])

    if (existingByEmail.rows[0]) {
      const err = new Error('Пользователь с таким email уже существует. Войдите через email/пароль.')
      err.status = 400
      throw err
    }

    const created = await pool.query(
      `INSERT INTO users (email, name, avatar, provider, provider_id, is_verified)
       VALUES ($1, $2, $3, 'google', $4, true)
       RETURNING id, email, name, avatar, provider, is_verified, created_at`,
      [normalizedEmail, name || normalizedEmail.split('@')[0], avatar || null, googleId]
    )

    user = created.rows[0]
  }

  const jwtSecret = getJwtSecret()

  if (!jwtSecret) {
    const err = new Error('JWT_SECRET не задан на сервере')
    err.status = 500
    throw err
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, { expiresIn: '7d' })

  const frontendUrl = getFrontendUrl()
  const redirectUrl = new URL(frontendUrl)
  redirectUrl.pathname = '/auth/callback'

  const userData = JSON.stringify({
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar
  })

  redirectUrl.searchParams.set('token', token)
  redirectUrl.searchParams.set('user', userData)

  return redirectUrl.toString()
}

module.exports = {
  getGoogleAuthorizeUrl,
  handleGoogleCallback
}
