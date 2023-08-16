import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  question: '',
  answer: '',
  orderBy: '',
  itemsPerPage: 10,
  currentPage: 1,
  editedCardId: '',
  deletedCardId: '',
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
    setEditedCardId: (state, action: PayloadAction<string>) => {
      state.editedCardId = action.payload
    },
    setDeletedCardId: (state, action: PayloadAction<string>) => {
      state.deletedCardId = action.payload
    },
  },
})
