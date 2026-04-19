import { api } from './client'

export const register = ({ email, name, password }) => api.post('/auth/register', { email, name, password })

export const login = ({ email, password }) => api.post('/auth/login', { email, password })