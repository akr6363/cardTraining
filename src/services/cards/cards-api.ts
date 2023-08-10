import { baseApi } from '@/services/base-api.ts'
import { CardRes, GetCardsArgs } from '@/services/cards/types.ts'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getCards: builder.query<CardRes, GetCardsArgs>({
        query: ({ id, ...args }) => {
          return {
            url: `v1/decks/${id}/cards`,
            method: 'GET',
            params: args,
          }
        },
        // createDecks: builder.mutation<Deck, CreateDeckArgs>({
        //   query: ({ name }) => {
        //     return {
        //       url: `v1/decks`,
        //       method: 'POST',
        //       body: { name },
        //     }
        //   },
        //   invalidatesTags: ['Decks'],
        // }),
        providesTags: [],
      }),
    }
  },
})

export const { useGetCardsQuery } = cardsApi
