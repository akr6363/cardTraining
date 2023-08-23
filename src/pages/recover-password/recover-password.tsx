import { useState } from 'react'

import { CheckEmail, RecoverPassword } from '@/components/auth'
import { useRecoverPasswordMutation } from '@/services/auth/auth-api.ts'
import { RecoverPasswordArgs } from '@/services/auth/types.ts'

export const RecoverPasswordPage = () => {
  const [recoverPassword, { isLoading }] = useRecoverPasswordMutation()
  const [sendEmail, setSendEmail] = useState('')
  const onRecoverPassword = (email: string) => {
    const data: RecoverPasswordArgs = {
      email,
      html: '<h1>Hi,</h1><p>Click <a href="https://card-training-nine.vercel.app/new-password/##token##">here</a> to recover your password</p>',
    }

    recoverPassword(data)
      .unwrap()
      .then(() => {
        setSendEmail(email)
      })
  }

  return (
    <>
      {sendEmail ? (
        <CheckEmail email={sendEmail} />
      ) : (
        <RecoverPassword onSend={onRecoverPassword} isFetching={isLoading} />
      )}
    </>
  )
}
