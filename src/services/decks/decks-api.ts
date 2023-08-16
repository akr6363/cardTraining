import { baseApi } from '@/services/base-api.ts'
import {
  CreateDeckArgs,
  Deck,
  DecksRes,
  GetDecksArgs,
  UpdateDeckArgs,
} from '@/services/decks/types.ts'

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
        providesTags: ['Decks', 'DecksUpdate', 'DecksDelete'],
      }),
      getDecksById: builder.query<Deck, { id: string }>({
        query: ({ id }) => {
          return {
            url: `v1/decks/${id}`,
            method: 'GET',
          }
        },
        providesTags: ['Deck'],
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
      updateDecks: builder.mutation<Deck, UpdateDeckArgs>({
        query: ({ name, isPrivate, id }) => {
          return {
            url: `v1/decks/${id}`,
            method: 'PATCH',
            body: { name, isPrivate },
          }
        },
        invalidatesTags: ['DecksUpdate', 'Deck'],
      }),
      deleteDecks: builder.mutation<Omit<Deck, 'author'>, { id: string }>({
        query: ({ id }) => {
          return {
            url: `v1/decks/${id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: ['DecksDelete'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useCreateDecksMutation,
  useGetDecksByIdQuery,
  useUpdateDecksMutation,
  useDeleteDecksMutation,
} = decksApi
