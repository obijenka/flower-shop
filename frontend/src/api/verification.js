import { api } from './client'

export const sendVerificationCode = (email) => api.post('/verification/send', { email })

export const verifyEmailCode = ({ email, code }) => api.post('/verification/verify', { email, code })
