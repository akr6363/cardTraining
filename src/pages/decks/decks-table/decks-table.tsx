import { FC, memo } from 'react'

import { NavLink } from 'react-router-dom'

import { Learn } from '@/assets/icons/components'
import { ActionButton } from '@/components/common/action-button/action-button.tsx'
import { TableDataPreloader } from '@/components/common/table-data-preloader/table-data-preloader.tsx'
import { Button, Cell, EditBlock, Table } from '@/components/ui'
import { DeleteDeckModal } from '@/pages/decks/decks-table/delete-modal/delete-modal.tsx'
import { EditDeckModal } from '@/pages/decks/decks-table/edit-modal/edit-modal.tsx'
import s from '@/pages/decks/decks.module.scss'
import { useAuthMeQuery } from '@/services/auth/auth-api.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { DecksRes } from '@/services/decks/types.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

const columns = [
  { title: 'Name', sortKey: 'name', width: '26%' },
  { title: 'Cards', sortKey: 'cardsCount', width: '14%' },
  { title: 'Last Update', sortKey: 'updated', width: '20%' },
  { title: 'Created by', width: '29%' },
  { title: '', width: '11%' },
]

type Props = {
  data: DecksRes
  status: string
}

export const DecksTable: FC<Props> = memo(({ data, status }) => {
  const dispatch = useAppDispatch()

  const orderBy = useAppSelector(state => state.decksSlice.orderBy)
  const sortName = orderBy.split('-')[0]
  const sortDirection = orderBy.split('-')[1]
  const onSortHandler = (sortKey: string) => {
    if (sortName !== sortKey) {
      dispatch(decksSlice.actions.setOrderBy(`${sortKey}-asc`))
    }
    if (sortName === sortKey) {
      if (sortDirection === 'asc') {
        dispatch(decksSlice.actions.setOrderBy(`${sortKey}-desc`))
      }
      if (sortDirection === 'desc') {
        dispatch(decksSlice.actions.setOrderBy(''))
      }
    }
  }

  return (
    <>
      <Table
        columns={columns}
        className={s.table}
        onSort={onSortHandler}
        sortName={sortName}
        sortDirection={sortDirection}
      >
        <MappedItems data={data} />
        {status === 'pending' && <TableDataPreloader />}
      </Table>
    </>
  )
})

type MappedItemsProps = {
  data: DecksRes
}
const MappedItems: FC<MappedItemsProps> = ({ data }) => {
  const { data: meData } = useAuthMeQuery()

  return (
    <>
      <EditDeckModal />
      <DeleteDeckModal />
      {data.items.map(el => {
        return (
          <tr key={el.id} className={s.deckTr}>
            <Cell className={s.nameCell} img={el.cover}>
              {el.name}
            </Cell>
            <Cell>{el.cardsCount}</Cell>
            <Cell>{new Date(el.updated).toLocaleDateString('en-GB')}</Cell>
            <Cell>{el.author.name}</Cell>
            <Cell>
              <EditBlock>
                <Button variant={'icon'} as={NavLink} to={`/${el.id}/learn`}>
                  <Learn size={16} />
                </Button>
                {meData?.id === el.author.id && (
                  <>
                    <ActionButton id={el.id} type={'edit'} tableType={'decks'} />
                    <ActionButton id={el.id} type={'delete'} tableType={'decks'} />
                  </>
                )}
              </EditBlock>
            </Cell>
            <td className={s.cellLink}>
              <NavLink to={`/${el.id}`}></NavLink>
            </td>
          </tr>
        )
      })}
    </>
  )
}
