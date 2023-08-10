import { FC } from 'react'

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

const DecksTable: FC<Props> = ({ data }) => {
  // const [showModal, setShowModal] = useState(true)
  const editedUserId = useAppSelector(state => state.decksSlice.editedUserId)
  const deletedUserId = useAppSelector(state => state.decksSlice.deletedUserId)
  const dispatch = useAppDispatch()
  const onClickEdit = (id: string) => {
    dispatch(decksSlice.actions.setEditedUserId(id))
  }
  const onClickDelete = (id: string) => {
    dispatch(decksSlice.actions.setDeletedUserId(id))
  }

  return (
    <>
      {editedUserId && <EditModal deckId={editedUserId}></EditModal>}
      {deletedUserId && <DeleteModal deckId={deletedUserId}></DeleteModal>}
      <Table columns={columns} className={s.table}>
        {data.items.map(el => {
          return (
            <tr key={el.id}>
              <Cell>{el.name}</Cell>
              <Cell>{el.cardsCount}</Cell>
              <Cell>{new Date(el.updated).toLocaleString('en-GB')}</Cell>
              <Cell>{el.author.name}</Cell>
              <Cell>
                <EditBlock>
                  <Learn size={16} />
                  <Button variant={'icon'} onClick={() => onClickEdit(el.id)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant={'icon'} onClick={() => onClickDelete(el.id)}>
                    <Delete size={16} />
                  </Button>
                </EditBlock>
              </Cell>
            </tr>
          )
        })}
      </Table>
    </>
  )
}

export default DecksTable
