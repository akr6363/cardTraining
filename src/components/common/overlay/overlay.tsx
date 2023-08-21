import { FC, PropsWithChildren } from 'react'

import s from './overlay.module.scss'

export const Overlay: FC<PropsWithChildren> = ({ children }) => {
  return <div className={s.overlay}>{children}</div>
}
