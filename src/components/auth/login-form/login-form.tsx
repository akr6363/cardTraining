import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '../../ui/button'

import s from './login-form.module.scss'

import { email, password } from '@/common/zodSchems.ts'
import { Card, Typography } from '@/components/ui'
import { ControlledCheckbox } from '@/components/ui/controlled/controlled-checkbox'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field/controlled-text-field.tsx'

const loginSchema = z
  .object({
    rememberMe: z.boolean(),
  })
  .merge(password)
  .merge(email)

type FormValues = z.infer<typeof loginSchema>

export type LoginFormProps = {
  onLogin: (data: FormValues) => void
  isSubmit?: boolean
}

export const LoginForm: FC<LoginFormProps> = ({ onLogin, isSubmit }) => {
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
      <form onSubmit={handleSubmit(onLogin)} className={s.form}>
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
        <Link to={'/new-password'} className={s.forgotPasswordLink}>
          <Typography variant={'Body_2'}>Forgot Password?</Typography>
        </Link>
        <Button type="submit" disabled={isSubmit}>
          Sign In
        </Button>
      </form>
      <Typography variant={'Body_2'} className={s.text}>
        Don&lsquo;t have an account?
      </Typography>
      <Button as={Link} variant={'link'} className={s.link} to={'/sign-up'}>
        Sign Up
      </Button>
    </Card>
  )
}
