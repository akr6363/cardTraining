import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  minCardsCount: 0,
  maxCardsCount: 0,
  authorId: '',
  orderBy: '',
  name: '',
  itemsPerPage: 10,
  currentPage: 1,
}

export const decksSlice = createSlice({
  initialState,
  name: 'decksSlice',
  reducers: {
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
      state.currentPage = 1
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
      state.currentPage = 1
    },
    setMinCardsCount: (state, action: PayloadAction<number>) => {
      state.minCardsCount = action.payload
      state.currentPage = 1
    },
    setMaxCardsCount: (state, action: PayloadAction<number>) => {
      state.maxCardsCount = action.payload
      state.currentPage = 1
    },
    setAuthorId: (state, action: PayloadAction<string>) => {
      state.authorId = action.payload
      state.currentPage = 1
    },
    setOrderBy: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload
    },
    clearFilters: (state, action: PayloadAction<{ maxCardsCount: number }>) => {
      state.minCardsCount = 0
      state.maxCardsCount = action.payload.maxCardsCount
      state.authorId = ''
      state.orderBy = ''
      state.name = ''
      state.itemsPerPage = 10
      state.currentPage = 1
    },
  },
})
