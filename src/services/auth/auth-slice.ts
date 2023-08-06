import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { meResponse } from '@/services/auth/types.ts'

const initialState = {
  email: '',
  name: '',
  id: '',
  isEmailVerified: false,
  avatar: '',
}

export const authSlice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {
    setAuthData: (state, action: PayloadAction<meResponse>) => {
      state.email = action.payload.email
      state.name = action.payload.name
      state.id = action.payload.id
      state.isEmailVerified = action.payload.isEmailVerified
      state.avatar = action.payload.avatar
    },
  },
})
