import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { name } from '@/common/zodSchems.ts'
import s from '@/components/auth/personal-info/personal-info.module.scss'
import { Button, ControlledTextField } from '@/components/ui'

const logoutSchema = name

type FormValues = z.infer<typeof logoutSchema>
export type EditFormProps = {
  onSave: (name: string) => void
  defaultValue: string
}
export const EditForm: FC<EditFormProps> = ({ onSave, defaultValue }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(logoutSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: defaultValue,
    },
  })
  const onSubmit = (data: FormValues) => {
    onSave(data.name)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <ControlledTextField
        control={control}
        name={'name'}
        label={'Nickname'}
        errorMessage={errors.name?.message}
        className={s.inputName}
      />
      <Button type="submit">Save Changes</Button>
    </form>
  )
}
