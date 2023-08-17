import { FC, memo } from 'react'

import { NavLink } from 'react-router-dom'

import { Delete, Edit, Learn } from '@/assets/icons/components'
import { Button, Cell, EditBlock, Table } from '@/components/ui'
import { DeleteModal } from '@/pages/decks/decks-table/delete-modal/delete-modal.tsx'
import { EditModal } from '@/pages/decks/decks-table/edit-modal/edit-modal.tsx'
import s from '@/pages/decks/decks.module.scss'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { DecksRes } from '@/services/decks/types.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

const columns = [
  { title: 'Name', sortKey: 'name', width: '26%' },
  { title: 'Cards', sortKey: 'cards', width: '14%' },
  { title: 'Last Update', sortKey: 'update', width: '20%' },
  { title: 'Created by', sortKey: 'author', width: '29%' },
  { title: '', sortKey: 'edit', width: '11%' },
]

type Props = {
  data: DecksRes
}

const DecksTable: FC<Props> = memo(({ data }) => {
  const meId = useAppSelector(state => state.authSlice.id)
  const dispatch = useAppDispatch()
  const onClickEdit = (id: string) => {
    dispatch(decksSlice.actions.setEditedDeckId(id))
  }
  const onClickDelete = (id: string) => {
    dispatch(decksSlice.actions.setDeletedDeckId(id))
  }

  return (
    <>
      <Modals />
      <Table columns={columns} className={s.table}>
        {data.items.map(el => {
          return (
            <tr key={el.id}>
              <Cell className={s.nameCell} img={el.cover}>
                <Button as={NavLink} to={`/${el.id}`} variant={'link'}>
                  {el.name}
                </Button>
              </Cell>
              <Cell>{el.cardsCount}</Cell>
              <Cell>{new Date(el.updated).toLocaleDateString('en-GB')}</Cell>
              <Cell>{el.author.name}</Cell>
              <Cell>
                <EditBlock>
                  <Learn size={16} />
                  {meId === el.author.id && (
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
