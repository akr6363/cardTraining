import { FC, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Typography } from '../typography'

import s from './drop-down.module.scss'

import userPhotoDefault from '@/assets/img/userPhoto.png'

export const DropDown: FC<DropDownProps> = ({
  children,
  trigger,
  sideOffset = 0,
  alignOffset = 0,
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={s.DropdownMenuContent}
          sideOffset={sideOffset}
          data-side="top"
          align={'end'}
          alignOffset={alignOffset}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export const DropDownItem: FC<DropDownItemProps> = ({ icon, children }) => {
  return (
    <>
      <DropdownMenu.Item className={s.DropdownMenuItem}>
        <div className={s.icon}>{icon}</div>
        <Typography variant={'Caption'} className={s.itemText}>
          {children}
        </Typography>
      </DropdownMenu.Item>
      <DropdownMenu.Separator className={s.DropdownMenuSeparator} />
    </>
  )
}

export const DropDownUserInfo: FC<DropDownUserInfoProps> = ({ email, name }) => {
  return (
    <>
      <DropdownMenu.Item className={s.DropdownMenuItem}>
        <UserPhoto></UserPhoto>
        <div className={s.infoContainer}>
          <Typography variant={'Subtitle_2'}>{name}</Typography>
          <Typography variant={'Caption'} color="var(--color-dark-100)">
            {email}
          </Typography>
        </div>
      </DropdownMenu.Item>
      <DropdownMenu.Separator className={s.DropdownMenuSeparator} />
    </>
  )
}

export const UserPhoto: FC<UserPhotoProps> = () => {
  return (
    <div className={s.userPhoto}>
      <img src={userPhotoDefault} alt="" className={s.userPhoto} />
    </div>
  )
}

type UserPhotoProps = {
  photo?: string
}
type DropDownProps = {
  children: ReactNode
  trigger: ReactNode
  sideOffset?: number
  alignOffset?: number
}
type DropDownUserInfoProps = {
  photo?: string
  email: string
  name: string
}
type DropDownItemProps = {
  children: ReactNode
  icon: ReactNode
}
