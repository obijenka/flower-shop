import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { setUser } from '../../store/slices/userSlice'
import { saveAuthData } from '../../utils/authStorage'

export default function AuthCallbackHandler() {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get('token')
    const userRaw = params.get('user')

    if (!token || !userRaw) return

    try {
      const user = JSON.parse(userRaw)

      saveAuthData(token, user)
      dispatch(setUser({ user, token }))

      params.delete('token')
      params.delete('user')

      navigate(
        {
          pathname: location.pathname,
          search: params.toString() ? `?${params.toString()}` : ''
        },
        { replace: true }
      )
    } catch {
      return
    }
  }, [dispatch, location.pathname, location.search, navigate])

  return null
}
