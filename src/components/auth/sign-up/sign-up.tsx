import { FC } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '../../ui/button'

import s from './sign-up.module.scss'

import { email, password } from '@/common/zodSchems.ts'
import { Card, Typography } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field/controlled-text-field.tsx'

const logoutSchema = z
  .object({
    confirm: z.string(),
  })
  .merge(password)
  .merge(email)
  .refine(data => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  })

type FormValues = z.infer<typeof logoutSchema>

export type SignUpProps = {
  onLogout: (data: FormValues) => void
}
export const SignUp: FC<SignUpProps> = ({ onLogout }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(logoutSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
    },
  })

  const onSubmit = (data: FormValues) => {
    onLogout(data)
  }

  return (
    <Card title={'Sign Up'}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
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
        <ControlledTextField
          control={control}
          name={'confirm'}
          label={'Confirm Password'}
          errorMessage={errors.confirm?.message}
          password={true}
          className={s.inputConfirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
      <Typography variant={'Body_2'} className={s.text}>
        Already have an account?
      </Typography>
      <Button as={Link} variant={'link'} className={s.link} to={'/sign-in'}>
        Sign In
      </Button>
    </Card>
  )
}
