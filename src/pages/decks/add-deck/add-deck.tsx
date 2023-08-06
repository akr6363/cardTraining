import { FC } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './add-deck.module.scss'

import { Button, ControlledCheckbox, ControlledTextField } from '@/components/ui'

const logoutSchema = z.object({
  name: z.string().nonempty('The field is required').min(3),
  private: z.boolean(),
})

type FormValues = z.infer<typeof logoutSchema>

export type AddNewPackFormProps = {
  onCreate: (name: string, isPrivate?: boolean) => void
}

export const AddNewPackForm: FC<AddNewPackFormProps> = ({ onCreate }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(logoutSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      private: false,
    },
  })

  const onSubmit = (data: FormValues) => {
    onCreate(data.name, data.private)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <ControlledTextField
        control={control}
        name={'name'}
        label={'Name Pack'}
        errorMessage={errors.name?.message}
        className={s.inputName}
      />
      <ControlledCheckbox
        control={control}
        name={'private'}
        label={'Private pack'}
        className={s.private}
      />
      <Button type="submit" className={s.addBtn}>
        Add New Pack
      </Button>
    </form>
  )
}
