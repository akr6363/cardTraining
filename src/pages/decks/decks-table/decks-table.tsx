import { FC, memo } from 'react'

import { NavLink } from 'react-router-dom'

import { Delete, Edit, Learn } from '@/assets/icons/components'
import { Button, Cell, EditBlock, Table } from '@/components/ui'
import { DeleteModal } from '@/pages/decks/decks-table/delete-modal/delete-modal.tsx'
import { EditModal } from '@/pages/decks/decks-table/edit-modal/edit-modal.tsx'
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
}

const DecksTable: FC<Props> = memo(({ data }) => {
  const { data: meData } = useAuthMeQuery()
  const dispatch = useAppDispatch()
  const onClickEdit = (id: string) => {
    dispatch(decksSlice.actions.setEditedDeckId(id))
  }
  const onClickDelete = (id: string) => {
    dispatch(decksSlice.actions.setDeletedDeckId(id))
  }
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
      <Modals />
      <Table
        columns={columns}
        className={s.table}
        onSort={onSortHandler}
        sortName={sortName}
        sortDirection={sortDirection}
      >
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
                      <Button variant={'icon'} onClick={() => onClickEdit(el.id)}>
                        <Edit size={16} />
                      </Button>
                      <Button variant={'icon'} onClick={() => onClickDelete(el.id)}>
                        <Delete size={16} />
                      </Button>
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
      </Table>
    </>
  )
})

export default DecksTable

const Modals = () => {
  const editedUserId = useAppSelector(state => state.decksSlice.editedDeckId)
  const deletedUserId = useAppSelector(state => state.decksSlice.deletedDeckId)

  return (
    <>
      {editedUserId && <EditModal deckId={editedUserId}></EditModal>}
      {deletedUserId && <DeleteModal deckId={deletedUserId}></DeleteModal>}
    </>
  )
}
