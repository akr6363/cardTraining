import { ChangeEvent, FC, useRef, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../../ui/button'

import s from './personal-info.module.scss'

import { Edit, LogOut, Photo } from '@/assets/icons/components'
import { Card, Typography } from '@/components/ui'
import { ControlledTextField } from '@/components/ui/controlled/controlled-text-field/controlled-text-field.tsx'

export type PersonalInfoProps = {
  email: string
  name: string
  photo: string
  onLogout: () => void
  onPhotoChange: (photo: File) => void
  onNameChange: (name: string) => void
}
export const PersonalInfo: FC<PersonalInfoProps> = ({
  email,
  photo,
  name,
  onNameChange,
  onPhotoChange,
  onLogout,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const onEditName = () => {
    setIsEdit(true)
  }

  const onNameChangeHandler = (name: string) => {
    setIsEdit(false)
    onNameChange(name)
  }

  const onPhotoChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.length) {
      onPhotoChange(e.currentTarget.files[0])
    }
  }

  return (
    <Card title={'Personal Information'} className={s.card}>
      <div className={s.photoBlock}>
        <div className={s.photo}>
          <img src={photo} alt="" />
        </div>
        {!isEdit && <UploadingImagesBtn onChange={onPhotoChangeHandler} />}
      </div>
      {!isEdit ? (
        <div className={s.infoBlock}>
          <div className={s.nameBlock}>
            <Typography variant={'h1'}>{name}</Typography>
            <Button
              variant={'link'}
              onClick={onEditName}
              icon={<Edit size={16} />}
              className={s.editNameBtn}
            />
          </div>
          <Typography variant={'Body_2'} className={s.email}>
            {email}
          </Typography>
          <Button variant={'secondary'} onClick={onLogout} icon={<LogOut size={16} />}>
            Logout
          </Button>
        </div>
      ) : (
        <EditForm onSave={onNameChangeHandler} defaultValue={name} />
      )}
    </Card>
  )
}

// ---------------------------------------------

type UploadingImagesBtnPropsType = {
  onChange(e: ChangeEvent<HTMLInputElement>): void
}

export const UploadingImagesBtn: React.FC<UploadingImagesBtnPropsType> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <>
      <input type="file" onChange={onChange} style={{ display: 'none' }} ref={inputRef} />
      <Button
        variant={'secondary'}
        onClick={handleClick}
        icon={<Photo size={16} />}
        className={s.editPhotoBtn}
      />
    </>
  )
}

// ---------------------------------------------

const logoutSchema = z.object({
  name: z.string().nonempty('The field is required').min(3),
})

type FormValues = z.infer<typeof logoutSchema>
export type EditFormProps = {
  onSave: (name: string) => void
  defaultValue: string
}
const EditForm: FC<EditFormProps> = ({ onSave, defaultValue }) => {
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
