import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { authSlice } from '@/services/auth/auth.slice.ts'
import { baseApi } from '@/services/base-api.ts'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [decksSlice.name]: decksSlice.reducer,
    [cardsSlice.name]: cardsSlice.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
