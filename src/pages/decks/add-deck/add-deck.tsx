import { ChangeEvent, FC, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './add-deck.module.scss'

import { Button, ControlledCheckbox, ControlledTextField } from '@/components/ui'
import { InputFile } from '@/components/ui/inputFile/input-file.tsx'

const logoutSchema = z.object({
  name: z.string().nonempty('The field is required').min(3),
  private: z.boolean(),
  cover: z
    .any()
    .refine(
      files => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    )
    .refine(files => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
})

type FormValues = z.infer<typeof logoutSchema>

export type AddNewPackFormProps = {
  onCreate: (name: string, isPrivate?: boolean, cover?: File) => void
  defaultValue?: FormValues
  isEdit?: boolean
}

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const AddNewPackForm: FC<AddNewPackFormProps> = ({
  onCreate,
  defaultValue,
  isEdit = false,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(logoutSchema),
    mode: 'onSubmit',
    defaultValues: { name: '', private: false, cover: null },
  })

  useEffect(() => {
    if (defaultValue) {
      setValue('name', defaultValue.name)
      setValue('private', defaultValue.private)
      setValue('cover', defaultValue.cover)
    }
  }, [])

  const onSubmit = (data: FormValues) => {
    onCreate(data.name, data.private, data.cover[0])
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    let file: File | null = null

    if (e.target.files) {
      file = e.target.files[0]
    }
    setSelectedFile(file)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      {selectedFile && (
        <div className={s.coverPreview}>
          <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
        </div>
      )}
      {!selectedFile && defaultValue?.cover && (
        <div className={s.coverPreview}>
          <img src={defaultValue?.cover} alt="Preview" />
        </div>
      )}
      <InputFile
        {...register('cover')}
        onSelect={handleFileChange}
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
      <Button type="submit" className={s.addBtn}>
        {isEdit ? 'Save Changes ' : 'Add New Pack'}
      </Button>
    </form>
  )
}
