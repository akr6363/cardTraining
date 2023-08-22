import { FC, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './add-deck.module.scss'

import { imgValidation } from '@/common/zodSchems.ts'
import { Button, ControlledCheckbox, ControlledTextField } from '@/components/ui'
import { InputFileWithPreview } from '@/components/ui/inputFile/input-file-with-preview.tsx'

const logoutSchema = z.object({
  name: z.string().nonempty('The field is required').min(3),
  private: z.boolean(),
  cover: imgValidation,
})

export type AddDeckFormValues = z.infer<typeof logoutSchema>
type FieldNames = keyof AddDeckFormValues

export type AddNewPackFormProps = {
  onCreate: (data: AddDeckFormValues) => void
  defaultValue?: AddDeckFormValues
  isEdit?: boolean
  isFetching?: boolean
  errorsMessages: { field: FieldNames; message: string }[]
}

export const AddNewPackForm: FC<AddNewPackFormProps> = ({
  onCreate,
  defaultValue,
  isEdit = false,
  isFetching,
  errorsMessages,
}) => {
  const {
    setError,
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddDeckFormValues>({
    resolver: zodResolver(logoutSchema),
    mode: 'onSubmit',
    defaultValues: { name: '', private: false, cover: defaultValue?.cover },
  })

  useEffect(() => {
    if (defaultValue) {
      setValue('name', defaultValue.name)
      setValue('private', defaultValue.private)
    }
  }, [])
  useEffect(() => {
    if (errorsMessages) {
      errorsMessages.forEach(e => {
        setError(e.field, { type: 'custom', message: e.message })
      })
    }
  }, [errorsMessages])
  const onSubmit = (data: AddDeckFormValues) => {
    onCreate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <InputFileWithPreview
        defaultValue={defaultValue?.cover}
        id={'cover'}
        {...register('cover')}
        errorMessage={errors.cover?.message?.toString()}
      />
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
      <Button type="submit" className={s.addBtn} isFetching={isFetching}>
        {isEdit ? 'Save Changes ' : 'Add New Pack'}
      </Button>
    </form>
  )
}
