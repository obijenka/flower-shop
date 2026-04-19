import { createSlice } from '@reduxjs/toolkit'
import { clearAuthData, getAuthData } from '../../utils/authStorage'

const { token: tokenFromStorage, user: userFromStorage } = getAuthData()

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: userFromStorage,
    token: tokenFromStorage,
    isAuthenticated: Boolean(tokenFromStorage)
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      clearAuthData()
    }
  }
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
