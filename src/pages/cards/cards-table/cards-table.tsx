import { FC } from 'react'

import { Delete, Edit } from '@/assets/icons/components'
import { Button, Cell, Rating, Table } from '@/components/ui'
import { DeleteCardModal } from '@/pages/cards/cards-table/deleted-card-modal/delete-card-modal.tsx'
import { EditCardModal } from '@/pages/cards/cards-table/edit-card-modal/edit-card-modal.tsx'
import s from '@/pages/cards/cards.module.scss'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { CardRes } from '@/services/cards/types.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

type Props = {
  data: CardRes
  isMy?: boolean
}
export const CardsTable: FC<Props> = ({ data, isMy }) => {
  const dispatch = useAppDispatch()
  const editedCardId = useAppSelector(state => state.cardsSlice.editedCardId)
  const deletedCardId = useAppSelector(state => state.cardsSlice.deletedCardId)
  const onClickEdit = (id: string) => {
    dispatch(cardsSlice.actions.setEditedCardId(id))
  }
  const onClickDelete = (id: string) => {
    dispatch(cardsSlice.actions.setDeletedCardId(id))
  }

  return (
    <>
      {editedCardId && <EditCardModal cardId={editedCardId}></EditCardModal>}
      {deletedCardId && <DeleteCardModal cardId={deletedCardId}></DeleteCardModal>}
      <Table columns={isMy ? columnsMyDeck : columns} className={s.table}>
        {data.items.map(el => {
          return (
            <tr key={el.id}>
              <Cell img={el.questionImg}>{el.question}</Cell>
              <Cell img={el.answerImg}>{el.answer}</Cell>
              <Cell>{new Date(el.updated).toLocaleDateString('en-GB')}</Cell>
              <Cell>
                <Rating value={el.grade} />
              </Cell>
              {isMy && (
                <Cell>
                  <Button variant={'icon'} onClick={() => onClickEdit(el.id)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant={'icon'} onClick={() => onClickDelete(el.id)}>
                    <Delete size={16} />
                  </Button>
                </Cell>
              )}
            </tr>
          )
        })}
      </Table>
    </>
  )
}

const columnsMyDeck = [
  { title: 'Question', sortKey: 'question', width: '30%' },
  { title: 'Answer', sortKey: 'answer', width: '30%' },
  { title: 'Last Update', sortKey: 'update', width: '13%' },
  { title: 'Grade', sortKey: 'grade', width: '17%' },
  { title: '', sortKey: 'edit', width: '10%' },
]
const columns = [
  { title: 'Question', sortKey: 'question', width: '30%' },
  { title: 'Answer', sortKey: 'answer', width: '30%' },
  { title: 'Last Update', sortKey: 'update', width: '20%' },
  { title: 'Grade', sortKey: 'grade', width: '20%' },
]
