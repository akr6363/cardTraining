import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '../../ui/button'

import s from './recover-password.module.scss'

import { email } from '@/common/zodSchems.ts'
import { Card, Typography } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field/controlled-text-field.tsx'

const logoutSchema = email

type FormValues = z.infer<typeof logoutSchema>

export type RecoverPasswordProps = {
  onSend: (data: FormValues) => void
}
export const RecoverPassword: FC<RecoverPasswordProps> = ({ onSend }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(logoutSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (data: FormValues) => {
    onSend(data)
  }

  return (
    <Card title={'Forgot your password?'}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <ControlledTextField
          control={control}
          name={'email'}
          label={'Email'}
          errorMessage={errors.email?.message}
          className={s.inputEmail}
        />
        <Typography variant={'Body_2'} className={s.desc}>
          Enter your email address and we will send you further instructions
        </Typography>
        <Button type="submit">Send Instructions</Button>
      </form>
      <Typography variant={'Body_2'} className={s.text}>
        Did you remember your password?
      </Typography>
      <Button as={Link} variant={'link'} className={s.link} to={'/login-in'}>
        Try logging in
      </Button>
    </Card>
  )
}
