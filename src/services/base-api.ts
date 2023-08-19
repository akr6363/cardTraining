import { createApi } from '@reduxjs/toolkit/query/react'

import { customFetchBase } from '@/services/base-api-with-refetch.ts'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Decks', 'Cards', 'Deck', 'Me', 'Card'],
  baseQuery: customFetchBase,
  endpoints: () => ({}),
})

// export const baseApi = createApi({
//   reducerPath: 'baseApi',
//   tagTypes: ['Decks', 'DecksUpdate', 'DecksDelete', 'CreateCard', 'EditCard', 'DeleteCard', 'Deck'],
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://api.flashcards.andrii.es',
//     credentials: 'include',
//     prepareHeaders: headers => {
//       // headers.append('x-auth-skip', 'true')
//     },
//   }),
//   endpoints: () => ({}),
// })
