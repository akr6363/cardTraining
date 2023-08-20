import { FC, ReactNode } from 'react'

import s from './empty-page.module.scss'

type Props = {
  children: ReactNode
}

export const EmptyPage: FC<Props> = ({ children }) => {
  return <div className={s.empty}>{children}</div>
}
