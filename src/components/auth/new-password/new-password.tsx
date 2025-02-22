import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'

import s from './new-password.module.scss'

import { password } from '@/common/zodSchems.ts'
import { Card, Typography } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field/controlled-text-field.tsx'

const logoutSchema = password

type FormValues = z.infer<typeof logoutSchema>

export type NewPasswordProps = {
  onCreate: (password: string) => void
  isFetching?: boolean
}
export const NewPassword: FC<NewPasswordProps> = ({ onCreate, isFetching }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(logoutSchema),
    mode: 'onSubmit',
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = (data: FormValues) => {
    onCreate(data.password)
  }

  return (
    <Card title={'Create new password'}>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <ControlledTextField
          control={control}
          name={'password'}
          label={'Password'}
          password={true}
          errorMessage={errors.password?.message}
          className={s.inputPassword}
        />
        <Typography variant={'Body_2'} className={s.desc}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button type="submit" isFetching={isFetching}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
