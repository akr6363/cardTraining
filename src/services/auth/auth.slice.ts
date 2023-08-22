import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  error: '',
}

export const authSlice = createSlice({
  initialState,
  name: 'authSlice',
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})
