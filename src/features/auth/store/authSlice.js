import { createSlice } from '@reduxjs/toolkit'
import { authStorage } from '../../../shared/api/authStorage'

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      authStorage.clear()
    },
  },
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
