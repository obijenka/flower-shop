export const saveAuthData = (token, user) => {
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

export const clearAuthData = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

export const getAuthData = () => {
  try {
    return {
      token: localStorage.getItem('token'),
      user: JSON.parse(localStorage.getItem('user') || 'null')
    }
  } catch {
    return { token: null, user: null }
  }
}
