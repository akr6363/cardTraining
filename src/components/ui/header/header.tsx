import { FC } from 'react'

import { clsx } from 'clsx'

import { Button } from '../button'
import { Typography } from '../typography'

import s from './header.module.scss'

import Logo from '@/assets/img/Logo.png'
import userPhotoDefault from '@/assets/img/userPhoto.png'
import { useLogoutMutation } from '@/services/auth/auth-api.ts'

type HeaderProps = {
  isLogin?: boolean
  userName?: string
  userPhoto?: string
}

export const Header: FC<HeaderProps> = ({ isLogin = false, userName, userPhoto }) => {
  const [logout] = useLogoutMutation()

  return (
    <div className={s.root}>
      <div className={clsx(s.container, 'container')}>
        <div className={s.logo}>
          <a href="#" target={'_blank'}>
            <img src={Logo} alt="" />
          </a>
        </div>

        {isLogin ? (
          <div className={s.rightBlock}>
            <Typography
              variant={'Subtitle_1'}
              style={{ borderBottom: '1px dashed var(--color-light-100)' }}
            >
              {userName}
            </Typography>

            <button className={s.userPhoto}>
              <img src={userPhoto ? userPhoto : userPhotoDefault} alt="" />
            </button>
          </div>
        ) : (
          <>
            <Button>Sign In</Button>
            <Button onClick={logout}>Logout</Button>
          </>
        )}
      </div>
    </div>
  )
}
