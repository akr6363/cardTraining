import { FC, ReactNode } from 'react'

import s from '../tables.module.scss'

type EditBlockProps = {
  children: ReactNode
}
export const EditBlock: FC<EditBlockProps> = ({ children }) => {
  return <div className={s.editBlock}>{children}</div>
}
