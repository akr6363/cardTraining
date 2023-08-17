import { SignUp, SignUpValues } from '@/components/auth'
import { useSignupMutation } from '@/services/auth/auth-api.ts'
import { signUpArgs } from '@/services/auth/types.ts'

export const SignUpPage = () => {
  const [signUp, { isLoading: isSignUpLoading }] = useSignupMutation()
  // const { data, isLoading } = useAuthMeQuery()
  //
  // if (isLoading) return <div>Loading...</div>
  // if (data) return <Navigate to={'/'} />
  //
  const onSignUp = (data: SignUpValues) => {
    const body: signUpArgs = {
      name: data.name,
      password: data.password,
      email: data.email,
      sendConfirmationEmail: true,
    }

    signUp(body)
  }

  return <SignUp onSignUp={onSignUp} isSubmit={isSignUpLoading}></SignUp>
}
