import { Navigate } from 'react-router-dom'

import { LoginForm } from '@/components/auth'
import { useAuthMeQuery, useLoginMutation } from '@/services/auth/auth-api.ts'

export const SignInPage = () => {
  const [signIn, { isLoading: isSignInLoading }] = useLoginMutation()
  const { data, isLoading } = useAuthMeQuery()

  if (isLoading) return <div>Loading...</div>
  if (data) return <Navigate to={'/'} />

  const handleSignIn = (data: any) => {
    signIn(data)
  }

  return <LoginForm onLogin={handleSignIn} isSubmit={isSignInLoading || isLoading}></LoginForm>
}
