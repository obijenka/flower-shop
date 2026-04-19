const jwt = require('jsonwebtoken')

function getJwtSecret() {
  const secret = process.env.JWT_SECRET
  return secret && secret.trim() ? secret : null
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || ''

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Требуется авторизация' })
  }

  const token = authHeader.slice('Bearer '.length).trim()

  if (!token) {
    return res.status(401).json({ message: 'Требуется авторизация' })
  }

  const jwtSecret = getJwtSecret()

  if (!jwtSecret) {
    return res.status(500).json({ message: 'JWT_SECRET не задан на сервере' })
  }

  try {
    const payload = jwt.verify(token, jwtSecret)
    req.user = {
      userId: payload.userId,
      email: payload.email
    }
    next()
  } catch (err) {
    if (err?.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Сессия истекла, войдите снова' })
    }

    return res.status(401).json({ message: 'Неверный токен' })
  }
}

module.exports = requireAuth
