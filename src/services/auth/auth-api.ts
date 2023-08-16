import { meResponse } from '@/services/auth/types.ts'
import { baseApi } from '@/services/base-api.ts'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      authMe: builder.query<meResponse, any>({
        query: () => {
          return {
            url: `v1/auth/me`,
            method: 'GET',
          }
        },
      }),
    }
  },
})

export const { useAuthMeQuery } = decksApi
