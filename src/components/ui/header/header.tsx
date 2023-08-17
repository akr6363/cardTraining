import { FC } from 'react'

import { clsx } from 'clsx'
import { NavLink } from 'react-router-dom'

import { Button } from '../button'
import { Typography } from '../typography'

import s from './header.module.scss'

import { LogOut, User } from '@/assets/icons/components'
import Logo from '@/assets/img/Logo.png'
import userPhotoDefault from '@/assets/img/userPhoto.png'
import { DropDown, DropDownItem } from '@/components/ui'
import { useAuthMeQuery, useLogoutMutation } from '@/services/auth/auth-api.ts'

type HeaderProps = {
  // isLogin?: boolean
  // userName?: string
  // userPhoto?: string
}

export const Header: FC<HeaderProps> = () => {
  const { data } = useAuthMeQuery()

  return (
    <div className={s.root}>
      <div className={clsx(s.container, 'container')}>
        <div className={s.logo}>
          <a href="#" target={'_blank'}>
            <img src={Logo} alt="" />
          </a>
        </div>

        {data ? (
          <div className={s.rightBlock}>
            <Typography
              variant={'Subtitle_1'}
              style={{ borderBottom: '1px dashed var(--color-light-100)' }}
            >
              {data.name}
            </Typography>
            <HeaderDropDown />
          </div>
        ) : (
          <>
            <Button>Sign In</Button>
          </>
        )}
      </div>
    </div>
  )
}

export const UserPhotoContainer: FC<UserPhotoProps> = ({ photo }) => {
  return (
    <div className={s.userPhoto}>
      <img src={photo ? photo : userPhotoDefault} alt="" />
    </div>
  )
}

const HeaderDropDown = () => {
  const { data } = useAuthMeQuery()
  const [logout] = useLogoutMutation()

  const onLogoutHandler = () => {
    logout()
  }

  return data ? (
    <DropDown
      trigger={
        <button className={s.triggerBtn}>
          <UserPhotoContainer photo={data.avatar} />
        </button>
      }
      sideOffset={12}
      alignOffset={-6}
    >
      <DropDownUserInfo email={data.email} name={data.name} photo={data.avatar}></DropDownUserInfo>
      <NavLink to={'#'} className={s.link}>
        <DropDownItem icon={<User size={16} />}>My Profile</DropDownItem>
      </NavLink>
      <button className={s.btn} onClick={onLogoutHandler}>
        <DropDownItem icon={<LogOut size={16} />}>Sign Out</DropDownItem>
      </button>
    </DropDown>
  ) : null
}

type UserPhotoProps = {
  photo?: string
}

export const DropDownUserInfo: FC<DropDownUserInfoProps> = ({ email, name, photo }) => {
  return (
    <>
      <div className={s.userInfo}>
        <UserPhotoContainer photo={photo} />
        <div className={s.infoContainer}>
          <Typography variant={'Subtitle_2'}>{name}</Typography>
          <Typography variant={'Caption'} className={s.email}>
            {email}
          </Typography>
        </div>
      </div>
    </>
  )
}

type DropDownUserInfoProps = {
  photo?: string
  email: string
  name: string
}
