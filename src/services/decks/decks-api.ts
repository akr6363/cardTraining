import { createFormData } from '@/common/utilis/createFormData.ts'
import { baseApi } from '@/services/base-api.ts'
import {
  CreateDeckArgs,
  Deck,
  DecksRes,
  GetDecksArgs,
  UpdateDeckArgs,
} from '@/services/decks/types.ts'
import { RootState } from '@/services/store.ts'

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
        query: data => {
          const formData = createFormData(data)

          return {
            url: `v1/decks`,
            method: 'POST',
            body: formData,
          }
        },
        invalidatesTags: ['Decks'],
      }),
      updateDecks: builder.mutation<Deck, UpdateDeckArgs>({
        query: ({ id, ...data }) => {
          const formData = createFormData({ ...data })

          return {
            url: `v1/decks/${id}`,
            method: 'PATCH',
            body: formData,
          }
        },
        async onQueryStarted({ id, ...data }, { dispatch, getState, queryFulfilled }) {
          const state = getState() as RootState
          const {
            name,
            minCardsCount,
            maxCardsCount,
            authorId,
            orderBy,
            itemsPerPage,
            currentPage,
          } = state.decksSlice
          const patchResult = dispatch(
            decksApi.util.updateQueryData(
              'getDecks',
              { name, minCardsCount, maxCardsCount, authorId, orderBy, itemsPerPage, currentPage },
              draft => {
                const index = draft.items.findIndex(deck => deck.id === id)

                if (index !== -1) {
                  draft.items[index].name = data.name
                  if (data.cover) draft.items[index].cover = URL.createObjectURL(data.cover)
                }
              }
            )
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        // invalidatesTags: ['Decks', 'Deck'],
        invalidatesTags: ['Decks'],
      }),
      deleteDecks: builder.mutation<Omit<Deck, 'author'>, { id: string }>({
        query: ({ id }) => {
          return {
            url: `v1/decks/${id}`,
            method: 'DELETE',
          }
        },
        async onQueryStarted({ id }, { dispatch, getState, queryFulfilled }) {
          const state = getState() as RootState
          const {
            name,
            minCardsCount,
            maxCardsCount,
            authorId,
            orderBy,
            itemsPerPage,
            currentPage,
          } = state.decksSlice
          const patchResult = dispatch(
            decksApi.util.updateQueryData(
              'getDecks',
              { name, minCardsCount, maxCardsCount, authorId, orderBy, itemsPerPage, currentPage },
              draft => {
                draft.items = draft.items.filter(deck => deck.id !== id)
              }
            )
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        invalidatesTags: ['Decks'],
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
