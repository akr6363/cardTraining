import { FC } from 'react'

import { Link } from 'react-router-dom'

import { Button } from '../../ui/button'

import s from './check-email.module.scss'

import checkEmailImg from '@/assets/img/check-email.svg'
import { Card, Typography } from '@/components/ui'

export type CheckEmailProps = {
  email: string
}
export const CheckEmail: FC<CheckEmailProps> = ({ email }) => {
  return (
    <Card title={'Check Email'}>
      <div className={s.img}>
        <img src={checkEmailImg} alt="" />
      </div>
      <Typography variant={'Body_2'} className={s.desc}>
        We’ve sent an Email with instructions to {email}
      </Typography>
      <Button as={Link} variant={'primary'} className={s.link} to={'/sing-in'} fullWidth={true}>
        Back to Sign In
      </Button>
    </Card>
  )
}
