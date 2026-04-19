export function setPendingVerificationEmail(email) {
  try {
    localStorage.setItem('pendingVerificationEmail', email)
  } catch {
  }
}

export function getPendingVerificationEmail() {
  try {
    return localStorage.getItem('pendingVerificationEmail') || ''
  } catch {
    return ''
  }
}

export function clearPendingVerificationEmail() {
  try {
    localStorage.removeItem('pendingVerificationEmail')
  } catch {
  }
}
