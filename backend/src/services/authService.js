const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../db/index')

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET
  return secret && secret.trim() ? secret : null
}

function issueJwt(user) {
  const jwtSecret = getJwtSecret()
  if (!jwtSecret) {
    const err = new Error('JWT_SECRET не задан на сервере')
    err.status = 500
    throw err
  }

  return jwt.sign({ userId: user.id, email: user.email }, jwtSecret, { expiresIn: '7d' })
}

async function register({ email, name, password }) {
  if (!email || !password) {
    const err = new Error('Email и пароль обязательны')
    err.status = 400
    throw err
  }

  if (String(password).length < 6) {
    const err = new Error('Пароль должен быть минимум 6 символов')
    err.status = 400
    throw err
  }

  const normalizedEmail = normalizeEmail(email)

  const existingUser = await pool.query('SELECT id FROM users WHERE email = $1', [normalizedEmail])
  if (existingUser.rows.length > 0) {
    const err = new Error('Пользователь уже существует')
    err.status = 400
    throw err
  }

  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(password, salt)

  const result = await pool.query(
    `INSERT INTO users (email, name, password_hash, provider, is_verified)
     VALUES ($1, $2, $3, 'email', false)
     RETURNING id, email, name, avatar, provider, is_verified, created_at`,
    [normalizedEmail, name || normalizedEmail.split('@')[0], passwordHash]
  )

  const user = result.rows[0]

  return { user }
}

async function login({ email, password }) {
  if (!email || !password) {
    const err = new Error('Email и пароль обязательны')
    err.status = 400
    throw err
  }

  const normalizedEmail = normalizeEmail(email)

  const result = await pool.query('SELECT * FROM users WHERE email = $1', [normalizedEmail])
  const user = result.rows[0]

  if (!user) {
    const err = new Error('Неверный email или пароль')
    err.status = 401
    throw err
  }

  if (user.provider !== 'email') {
    const err = new Error(`Этот аккаунт зарегистрирован через ${user.provider}. Войдите через ${user.provider}.`)
    err.status = 401
    throw err
  }

  if (user.is_verified === false) {
    const err = new Error('Email не подтвержден')
    err.status = 403
    err.code = 'EMAIL_NOT_VERIFIED'
    err.email = user.email
    throw err
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash)
  if (!isPasswordValid) {
    const err = new Error('Неверный email или пароль')
    err.status = 401
    throw err
  }

  const token = issueJwt(user)

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      provider: user.provider,
      is_verified: user.is_verified
    }
  }
}

async function getUserById(userId) {
  const result = await pool.query(
    'SELECT id, email, name, avatar, provider, is_verified, created_at FROM users WHERE id = $1',
    [userId]
  )

  return result.rows[0] || null
}

module.exports = {
  register,
  login,
  getUserById,
  issueJwt,
  normalizeEmail
}
