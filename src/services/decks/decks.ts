import { baseApi } from '@/services/base-api.ts'
import { CreateDeckArgs, Deck, DecksRes, GetDecksArgs } from '@/services/decks/types.ts'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksRes, GetDecksArgs>({
        query: args => {
          return {
            url: `v1/decks`,
            method: 'GET',
            params: args,
          }
        },
        providesTags: ['Decks'],
      }),
      createDecks: builder.mutation<Deck, CreateDeckArgs>({
        query: ({ name }) => {
          return {
            url: `v1/decks`,
            method: 'POST',
            body: { name },
          }
        },
        invalidatesTags: ['Decks'],
      }),
    }
  },
})

export const { useGetDecksQuery, useLazyGetDecksQuery, useCreateDecksMutation } = decksApi
