import { FC, ReactNode } from 'react'

import { clsx } from 'clsx'

import { Typography } from '../typography'

import s from './tables.module.scss'

import { ArrowDown } from '@/assets/icons/components'

type Column = {
  title: string
  sortKey?: string
  width?: string
}

export type TableProps = {
  columns: Column[]
  children?: ReactNode
  className?: string
  onSort: (sortKey: string) => void
  sortName: string
  sortDirection: string
}

export const Table: FC<TableProps> = ({
  columns,
  children,
  className,
  onSort,
  sortName,
  sortDirection,
}) => {
  return (
    <table className={clsx(s.table, className)}>
      <thead>
        <tr>
          {columns.map(({ title, width, sortKey }, index) => {
            return (
              <th
                key={`column-${index}`}
                style={{ width }}
                className={clsx(
                  sortKey === sortName && sortDirection === 'asc' && s.asc,
                  sortKey === sortName && sortDirection === 'desc' && s.desc
                )}
              >
                {sortKey ? (
                  <button className={clsx(s.sortBtn)} onClick={() => onSort(sortKey)}>
                    <Typography variant={'Subtitle_2'}>{title}</Typography>
                    {sortKey === sortName && <ArrowDown size={12} />}
                  </button>
                ) : (
                  title && <Typography variant={'Subtitle_2'}>{title}</Typography>
                )}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  )
}

type CellProps = {
  children?: ReactNode
  className?: string
  img?: string
}

export const Cell: FC<CellProps> = ({ children, className, img }) => {
  return (
    <td className={clsx(s.cell, className)}>
      <div className={s.cellContainer}>
        {img && (
          <div className={s.imgContainer}>
            <img src={img} alt="packImg" />
          </div>
        )}
        {typeof children === 'string' ? (
          <Typography variant={'Body_2'}>{children}</Typography>
        ) : (
          <> {children}</>
        )}
      </div>
    </td>
  )
}
