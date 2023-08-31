import { authSlice } from '@/services/auth/auth.slice.ts'
import { AppDispatch } from '@/services/store.ts'

export const errorHandler = (
  error: any,
  dispatch: AppDispatch,
  setErrors?: (errors: errorMessagesType[]) => void
) => {
  if ('data' in error) {
    const errorData = error.data as errorData2 | errorData

    if (errorData && 'errorMessages' in errorData) {
      const errorMessages = errorData.errorMessages as errorMessagesType[]

      if (setErrors) {
        setErrors(errorMessages)
      }
    }
    if (errorData && 'message' in errorData) {
      const errorMessage = errorData.message

      dispatch(authSlice.actions.setError(errorMessage))
    }
  }
  if ('error' in error) {
    dispatch(authSlice.actions.setError(error.error))
  }
}

// type errorType = {
//   status: number
//   data: errorData
// }

// ошибка с формы
export type errorMessagesType = {
  field: string
  message: string
}

type errorData = {
  errorMessages: errorMessagesType[]
}
//ошибка запроса сервера
type errorData2 = {
  message: string
  path: string
  statusCode: number
  timestamp: string
}
