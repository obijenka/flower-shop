const authService = require('../services/authService')
const googleAuthService = require('../services/googleAuthService')
const verificationService = require('../services/verificationService')

function sendError(res, err) {
  const status = err.status || 500
  const payload = {
    message: err.message || 'Ошибка сервера'
  }

  if (err.code) payload.code = err.code
  if (err.email) payload.email = err.email

  return res.status(status).json(payload)
}

async function register(req, res) {
  try {
    const { email, name, password } = req.body
    const { user } = await authService.register({ email, name, password })

    await verificationService.sendVerificationCode(user.email)

    return res.status(201).json({
      message: 'Регистрация успешна. Подтвердите почту',
      code: 'EMAIL_NOT_VERIFIED',
      email: user.email
    })
  } catch (err) {
    return sendError(res, err)
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body
    const result = await authService.login({ email, password })
    return res.json({ message: 'Вход выполнен', ...result })
  } catch (err) {
    return sendError(res, err)
  }
}

async function me(req, res) {
  try {
    const user = await authService.getUserById(req.user.userId)

    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' })
    }

    return res.json({ user })
  } catch (err) {
    return sendError(res, err)
  }
}

async function googleRedirect(req, res) {
  try {
    const url = await googleAuthService.getGoogleAuthorizeUrl()
    return res.redirect(url)
  } catch (err) {
    return sendError(res, err)
  }
}

async function googleCallback(req, res) {
  try {
    const redirectUrl = await googleAuthService.handleGoogleCallback(req.query.code)
    return res.redirect(redirectUrl)
  } catch (err) {
    return sendError(res, err)
  }
}

module.exports = {
  register,
  login,
  me,
  googleRedirect,
  googleCallback
}
