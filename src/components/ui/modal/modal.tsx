import { FC, PropsWithChildren } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { clsx } from 'clsx'

import { Typography } from '../typography'

import s from './modal.module.scss'

import { Close } from '@/assets/icons/components'
import { Button } from '@/components/ui'

export type ModalProps = {
  onClose?: () => void
  isOpen: boolean
  title: string
  actionTitle: string
  onAction: () => void
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  isOpen,
  onClose,
  title,
  children,
  actionTitle,
  onAction,
}) => {
  function handleModalClosed() {
    onClose?.()
  }

  return (
    <Dialog.Dialog open={isOpen} onOpenChange={handleModalClosed}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={s.content}>
          <div className={s.header}>
            <Typography variant={'h2'}>{title}</Typography>
            <Dialog.Close asChild>
              <button className={clsx(s.closeBtn)}>
                <Close />
              </button>
            </Dialog.Close>
          </div>
          <div className={s.body}>{children}</div>
          <div className={s.footer}>
            <Dialog.Close asChild>
              <Button variant={'secondary'}>Cancel</Button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button onClick={onAction}>{actionTitle}</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Dialog>
  )
}
