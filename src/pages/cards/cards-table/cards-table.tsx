import { FC } from 'react'

import { Delete, Edit } from '@/assets/icons/components'
import { TableDataPreloader } from '@/components/common/table-data-preloader/table-data-preloader.tsx'
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
  status: string
}
export const CardsTable: FC<Props> = ({ data, isMy = false, status }) => {
  const dispatch = useAppDispatch()
  const editedCardId = useAppSelector(state => state.cardsSlice.editedCardId)
  const deletedCardId = useAppSelector(state => state.cardsSlice.deletedCardId)

  const orderBy = useAppSelector(state => state.cardsSlice.orderBy)
  const sortName = orderBy.split('-')[0]
  const sortDirection = orderBy.split('-')[1]
  const onSortHandler = (sortKey: string) => {
    if (sortName !== sortKey) {
      dispatch(cardsSlice.actions.setOrderBy(`${sortKey}-asc`))
    }
    if (sortName === sortKey) {
      if (sortDirection === 'asc') {
        dispatch(cardsSlice.actions.setOrderBy(`${sortKey}-desc`))
      }
      if (sortDirection === 'desc') {
        dispatch(cardsSlice.actions.setOrderBy(''))
      }
    }
  }

  return (
    <>
      {editedCardId && <EditCardModal cardId={editedCardId}></EditCardModal>}
      {deletedCardId && <DeleteCardModal cardId={deletedCardId}></DeleteCardModal>}
      <Table
        columns={isMy ? columnsMyDeck : columns}
        className={s.table}
        onSort={onSortHandler}
        sortDirection={sortDirection}
        sortName={sortName}
      >
        <MappedItems data={data} isMy={isMy}></MappedItems>
        {status === 'pending' && <TableDataPreloader />}
      </Table>
    </>
  )
}

type MappedItemsProps = {
  data: CardRes
  isMy: boolean
}
const MappedItems: FC<MappedItemsProps> = ({ data, isMy }) => {
  const dispatch = useAppDispatch()
  const onClickEdit = (id: string) => {
    dispatch(cardsSlice.actions.setEditedCardId(id))
  }
  const onClickDelete = (id: string) => {
    dispatch(cardsSlice.actions.setDeletedCardId(id))
  }

  return (
    <>
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
    </>
  )
}

const columnsMyDeck = [
  { title: 'Question', width: '28%' },
  { title: 'Answer', width: '28%' },
  { title: 'Last Update', sortKey: 'updated', width: '17%' },
  { title: 'Grade', sortKey: 'grade', width: '17%' },
  { title: '', width: '10%' },
]
const columns = [
  { title: 'Question', width: '30%' },
  { title: 'Answer', width: '30%' },
  { title: 'Last Update', sortKey: 'updated', width: '20%' },
  { title: 'Grade', sortKey: 'grade', width: '20%' },
]
