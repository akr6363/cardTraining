import { FC, PropsWithChildren } from 'react'

import { clsx } from 'clsx'

import { Typography } from '../typography'

import s from './modal.module.scss'

export type ModalProps = {
  onClose: () => void
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({ children }) => {
  return (
    <div className={clsx(s.root)}>
      <div className={s.title}>
        <Typography variant={'Large'}>{}</Typography>
      </div>
      <div className={s.content}>{children}</div>
    </div>
  )
}

const ModalHeader = () => {}
