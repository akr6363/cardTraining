import { FC, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Typography } from '../typography'

import s from './drop-down.module.scss'

import { PreloaderCircle } from '@/components/common/preloader/preloader.tsx'

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

export const DropDownItem: FC<DropDownItemProps> = ({ icon, children, isFetching }) => {
  return (
    <>
      <DropdownMenu.Item className={s.DropdownMenuItem}>
        <div className={s.icon}>{isFetching ? <PreloaderCircle /> : icon}</div>
        <Typography variant={'Caption'} className={s.itemText}>
          {children}
        </Typography>
      </DropdownMenu.Item>
      <span className={s.sep}></span>
    </>
  )
}

type DropDownProps = {
  children: ReactNode
  trigger: ReactNode
  sideOffset?: number
  alignOffset?: number
}
type DropDownItemProps = {
  children: ReactNode
  icon: ReactNode
  isFetching?: boolean
}
