import { LoginForm } from '@/components/auth'
import { useLoginMutation } from '@/services/auth/auth-api.ts'

export const SignInPage = () => {
  const [signIn, { isLoading: isSignInLoading }] = useLoginMutation()
  const handleSignIn = (data: any) => {
    signIn(data)
      .unwrap()
      .then(() => {})
      .catch(e => {
        console.log(e)
      })
  }

  return <LoginForm onLogin={handleSignIn} isFetching={isSignInLoading}></LoginForm>
}
