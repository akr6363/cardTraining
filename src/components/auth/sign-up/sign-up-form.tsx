import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '../../ui/button'

import s from './sign-up-form.module.scss'

import { email, name, password } from '@/common/zodSchems.ts'
import { Card, Typography } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field/controlled-text-field.tsx'

const logoutSchema = z
  .object({
    confirm: z.string(),
  })
  .merge(password)
  .merge(name)
  .merge(email)
  .refine(data => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  })

export type SignUpValues = z.infer<typeof logoutSchema>

export type SignUpProps = {
  onSignUp: (data: SignUpValues) => void
  isSubmit?: boolean
}
export const SignUp: FC<SignUpProps> = ({ onSignUp, isSubmit }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(logoutSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
      name: '',
    },
  })

  const onSubmit = (data: SignUpValues) => {
    onSignUp(data)
  }

  return (
    <Card title={'Sign Up'}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <ControlledTextField
          control={control}
          name={'name'}
          label={'Nickname'}
          errorMessage={errors.name?.message}
        />
        <ControlledTextField
          control={control}
          name={'email'}
          label={'Email'}
          errorMessage={errors.email?.message}
        />
        <ControlledTextField
          control={control}
          name={'password'}
          label={'Password'}
          errorMessage={errors.password?.message}
          password={true}
        />
        <ControlledTextField
          control={control}
          name={'confirm'}
          label={'Confirm Password'}
          errorMessage={errors.confirm?.message}
          password={true}
          className={s.inputConfirmPassword}
        />
        <Button type="submit" disabled={isSubmit}>
          Sign Up
        </Button>
      </form>
      <Typography variant={'Body_2'} className={s.text}>
        Already have an account?
      </Typography>
      <Button as={Link} variant={'link'} className={s.link} to={'/login'}>
        Sign In
      </Button>
    </Card>
  )
}
