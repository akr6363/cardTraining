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
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({ isOpen, onClose, title, children }) => {
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
          <div className={s.body}>
            {children}
            <Dialog.Close asChild className={s.cancel}>
              <Button variant={'secondary'}>Cancel</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Dialog>
  )
}
