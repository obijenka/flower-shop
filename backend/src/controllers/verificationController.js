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

async function send(req, res) {
  try {
    const { email } = req.body
    const result = await verificationService.sendVerificationCode(email)
    return res.json(result)
  } catch (err) {
    return sendError(res, err)
  }
}

async function verify(req, res) {
  try {
    const { email, code } = req.body
    const result = await verificationService.verifyCode({ email, code })
    return res.json(result)
  } catch (err) {
    return sendError(res, err)
  }
}

module.exports = {
  send,
  verify
}
