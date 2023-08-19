import { ChangeEvent, FC, useState } from 'react'

import { Button } from '../../ui/button'

import s from './personal-info.module.scss'

import { Edit, LogOut } from '@/assets/icons/components'
import userPhotoDefault from '@/assets/img/userPhoto.png'
import { EditForm } from '@/components/auth/personal-info/edit-form/edit-form.tsx'
import { UploadingImagesBtn } from '@/components/auth/personal-info/uploading-img-btn/uploading-img-btn.tsx'
import { Card, Typography } from '@/components/ui'

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

  if (!photo) photo = userPhotoDefault
  const onEditName = () => {
    setIsEdit(true)
  }

  const onNameChangeHandler = (name: string) => {
    onNameChange(name)
    setIsEdit(false)
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
