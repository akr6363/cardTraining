import { FC } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'

import s from './login-form.module.scss'

import { Card, Typography } from '@/components/ui'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field/controlled-text-field.tsx'

const loginSchema = z.object({
  email: z.string().nonempty().email(),
  password: z.string().nonempty().min(3, 'Password must be more than 3 characters'),
  rememberMe: z.boolean(),
})

export type FormValues = z.infer<typeof loginSchema>

export type LoginFormProps = {
  onLogin: (data: FormValues) => void
}
export const LoginForm: FC<LoginFormProps> = ({ onLogin }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  return (
    <Card title={'Sign In'}>
      <form onSubmit={handleSubmit(onLogin)}>
        <DevTool control={control} />
        <ControlledTextField
          control={control}
          name={'email'}
          label={'Email'}
          errorMessage={errors.email?.message}
          className={s.inputEmail}
        />
        <ControlledTextField
          control={control}
          name={'password'}
          label={'Password'}
          errorMessage={errors.password?.message}
          password={true}
          className={s.inputPassword}
        />
        <ControlledCheckbox control={control} name={'rememberMe'} label={'Remember me'} />
        <div className={s.forgotPasswordLink}>
          <a href={'#'}>
            <Typography variant={'Body_2'}>Forgot Password?</Typography>
          </a>
        </div>
        <Button type="submit">Sign In</Button>
      </form>
      <Typography variant={'Body_2'} color={'var(--color-light-900)'}>
        Don&lsquo;t have an account?
      </Typography>
      <Button as={'a'} variant={'link'} className={s.signUpLink} href={'#'}>
        Sign Up
      </Button>
    </Card>
  )
}
