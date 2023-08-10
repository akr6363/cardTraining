import { baseApi } from '@/services/base-api.ts'
import { Card, CardRes, CreateCardArgs, GetCardsArgs } from '@/services/cards/types.ts'

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
        providesTags: ['CreateCard', 'EditCard', 'DeleteCard'],
      }),
      getCardById: builder.query<Card, { id: string }>({
        query: ({ id }) => {
          return {
            url: `v1/cards/${id}`,
            method: 'GET',
          }
        },
      }),
      addCard: builder.mutation<Card, CreateCardArgs>({
        query: ({ id, answer, question }) => {
          return {
            url: `v1/decks/${id}/cards`,
            method: 'POST',
            body: { answer, question },
          }
        },
        invalidatesTags: ['CreateCard'],
      }),
      editCard: builder.mutation<Card, CreateCardArgs>({
        query: ({ id, answer, question }) => {
          return {
            url: `v1/cards/${id}`,
            method: 'PATCH',
            body: { answer, question },
          }
        },
        invalidatesTags: ['EditCard'],
      }),
      deleteCard: builder.mutation<any, { cardId: string }>({
        query: ({ cardId }) => {
          return {
            url: `v1/cards/${cardId}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: ['DeleteCard'],
      }),
    }
  },
})

export const {
  useGetCardsQuery,
  useAddCardMutation,
  useEditCardMutation,
  useGetCardByIdQuery,
  useDeleteCardMutation,
} = cardsApi
