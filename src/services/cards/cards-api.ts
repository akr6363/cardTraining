import { createFormData } from '@/common/utilis/createFormData.ts'
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
        providesTags: ['Cards'],
      }),
      getCardById: builder.query<Card, { id: string }>({
        query: ({ id }) => {
          return {
            url: `v1/cards/${id}`,
            method: 'GET',
          }
        },
        providesTags: ['Card'],
      }),
      addCard: builder.mutation<Card, CreateCardArgs>({
        query: ({ id, ...data }) => {
          const formData = createFormData({ ...data })

          return {
            url: `v1/decks/${id}/cards`,
            method: 'POST',
            body: formData,
          }
        },
        invalidatesTags: ['Cards'],
      }),
      editCard: builder.mutation<Card, CreateCardArgs>({
        query: ({ id, ...data }) => {
          const formData = createFormData(data)

          return {
            url: `v1/cards/${id}`,
            method: 'PATCH',
            body: formData,
          }
        },
        invalidatesTags: ['Cards', 'Card'],
      }),
      deleteCard: builder.mutation<any, { cardId: string }>({
        query: ({ cardId }) => {
          return {
            url: `v1/cards/${cardId}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: ['Cards'],
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
