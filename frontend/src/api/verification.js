import { api } from './client'

export const sendVerificationCode = (email) => api.post('/auth/verification/send', { email })

export const verifyEmailCode = ({ email, code }) => api.post('/auth/verification/verify', { email, code })
