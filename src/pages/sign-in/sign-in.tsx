import { Navigate, useNavigate } from 'react-router-dom'

import { LoginForm } from '@/components/auth'
import { useAuthMeQuery, useLoginMutation } from '@/services/auth/auth-api.ts'

const SignInPage = () => {
  const [signIn, { isLoading: isSignInLoading }] = useLoginMutation()
  const { data, isLoading } = useAuthMeQuery({})
  const navigate = useNavigate()

  if (isLoading) return <div>Loading...</div>
  if (data) return <Navigate to={'/'} />

  const handleSignIn = (data: any) => {
    signIn(data)
      .unwrap()
      .then(() => navigate('/'))
  }

  return <LoginForm onLogin={handleSignIn} isSubmit={isSignInLoading}></LoginForm>
}

export default SignInPage
