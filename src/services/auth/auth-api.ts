import { createFormData } from '@/common/utilis/createFormData.ts'
import {
  meResponse,
  RecoverPasswordArgs,
  ResetPasswordArgs,
  signUpArgs,
  signUpResponse,
  updateUserDataArgs,
} from '@/services/auth/types.ts'
import { baseApi } from '@/services/base-api.ts'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      authMe: builder.query<meResponse | null, void>({
        query: () => {
          return {
            url: `v1/auth/me`,
            method: 'GET',
          }
        },
        extraOptions: {
          maxRetries: 0,
        },
        providesTags: ['Me'],
      }),
      login: builder.mutation<any, any>({
        query: args => {
          return {
            url: `v1/auth/login`,
            method: 'POST',
            body: args,
          }
        },
        invalidatesTags: ['Me'],
      }),

      logout: builder.mutation<unknown, void>({
        query: () => {
          return {
            url: `v1/auth/logout`,
            method: 'POST',
          }
        },
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            authApi.util.updateQueryData('authMe', undefined, () => {
              return null
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
      }),

      signup: builder.mutation<signUpResponse, signUpArgs>({
        query: args => {
          return {
            url: `v1/auth/sign-up`,
            method: 'POST',
            body: args,
          }
        },
      }),
      recoverPassword: builder.mutation<any, RecoverPasswordArgs>({
        query: args => {
          return {
            url: `/v1/auth/recover-password`,
            method: 'POST',
            body: args,
          }
        },
      }),
      resetPassword: builder.mutation<any, ResetPasswordArgs>({
        query: ({ token, password }) => {
          return {
            url: `/v1/auth/reset-password/${token}`,
            method: 'POST',
            body: { password },
          }
        },
      }),
      updateUserData: builder.mutation<signUpResponse, updateUserDataArgs>({
        query: data => {
          const formData = createFormData(data)

          return {
            url: `v1/auth/me`,
            method: 'PATCH',
            body: formData,
          }
        },
        async onQueryStarted(data, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            authApi.util.updateQueryData('authMe', undefined, draft => {
              if (data.name) {
                draft!.name = data.name
              }
              if (data.avatar) {
                draft!.avatar = URL.createObjectURL(data.avatar)
              }
            })
          )

          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
        invalidatesTags: ['Me'],
      }),
    }
  },
})

export const {
  useAuthMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useUpdateUserDataMutation,
  useRecoverPasswordMutation,
  useResetPasswordMutation,
} = authApi
