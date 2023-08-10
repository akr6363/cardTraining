import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  question: '',
  answer: '',
  orderBy: '',
  itemsPerPage: 10,
  currentPage: 1,
}

export const cardsSlice = createSlice({
  initialState,
  name: 'cardsSlice',
  reducers: {
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
      state.currentPage = 1
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setQuestion: (state, action: PayloadAction<string>) => {
      state.question = action.payload
      state.currentPage = 1
    },
  },
})
