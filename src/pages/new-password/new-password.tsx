import { useNavigate, useParams } from 'react-router-dom'

import { NewPassword } from '@/components/auth'
import { useResetPasswordMutation } from '@/services/auth/auth-api.ts'
import { ResetPasswordArgs } from '@/services/auth/types.ts'

export const NewPasswordPage = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation()
  const navigate = useNavigate()
  const params = useParams()
  const token = params.token ? params.token : ''
  const onChangePassword = (password: string) => {
    const data: ResetPasswordArgs = {
      password,
      token,
    }

    resetPassword(data)
      .unwrap()
      .then(() => {
        navigate('/login')
      })
  }

  return <NewPassword onCreate={onChangePassword} isFetching={isLoading} />
}
