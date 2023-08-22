import { getIsPending } from '@/common/utilis/getIsStatus.tsx'
import { LoginForm } from '@/components/auth'
import { useAuthMeQuery, useLoginMutation } from '@/services/auth/auth-api.ts'

export const SignInPage = () => {
  const [signIn, { isLoading: isSignInLoading }] = useLoginMutation()
  const { status: status } = useAuthMeQuery()

  const handleSignIn = (data: any) => {
    signIn(data)
      .unwrap()
      .then(() => {})
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <LoginForm
      onLogin={handleSignIn}
      isFetching={isSignInLoading || getIsPending(status)}
    ></LoginForm>
  )
}
