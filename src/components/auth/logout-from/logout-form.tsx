import { FC } from 'react'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'

import s from './logout-form.module.scss'

import { Card, Typography } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field/controlled-text-field.tsx'

const logoutSchema = z
  .object({
    email: z.string().nonempty('The field is required').email(),
    password: z.string().nonempty('The field is required').min(3),
    confirm: z.string(),
  })
  .refine(data => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  })

export type FormValues = z.infer<typeof logoutSchema>

export type LogoutFormProps = {
  onLogout: (data: FormValues) => void
}
export const LogoutForm: FC<LogoutFormProps> = ({ onLogout }) => {
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
      <form onSubmit={handleSubmit(onSubmit)}>
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
      <Typography variant={'Body_2'} color={'var(--color-light-900)'}>
        Already have an account?
      </Typography>
      <Button as={'a'} variant={'link'} className={s.signInLink} href={'#'}>
        Sign In
      </Button>
    </Card>
  )
}
