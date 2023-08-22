import { FC } from 'react'

import { Delete, Edit } from '@/assets/icons/components'
import { PreloaderCircle } from '@/components/common/preloader/preloader.tsx'
import { TableDataPreloader } from '@/components/common/table-data-preloader/table-data-preloader.tsx'
import { Button, Cell, Rating, Table } from '@/components/ui'
import { DeleteCardModal } from '@/pages/cards/cards-table/deleted-card-modal/delete-card-modal.tsx'
import { EditCardModal } from '@/pages/cards/cards-table/edit-card-modal/edit-card-modal.tsx'
import s from '@/pages/cards/cards.module.scss'
import { useGetCardByIdQuery } from '@/services/cards/cards-api.ts'
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
  const editedCardId = useAppSelector(state => state.cardsSlice.editedCardId)
  const deletedCardId = useAppSelector(state => state.cardsSlice.deletedCardId)
  const { data: EditedCardData, status: EditedStatus } = useGetCardByIdQuery(
    {
      id: editedCardId,
    },
    {
      skip: !editedCardId,
    }
  )
  const { data: DeletedCardData, status: DeletedStatus } = useGetCardByIdQuery(
    {
      id: deletedCardId,
    },
    {
      skip: !deletedCardId,
    }
  )

  return (
    <>
      {editedCardId && EditedStatus === 'fulfilled' && (
        <EditCardModal cardData={EditedCardData!}></EditCardModal>
      )}
      {deletedCardId && DeletedStatus === 'fulfilled' && (
        <DeleteCardModal cardData={DeletedCardData!}></DeleteCardModal>
      )}
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
                {editedCardId === el.id && EditedStatus === 'pending' ? (
                  <PreloaderCircle />
                ) : (
                  <Button variant={'icon'} onClick={() => onClickEdit(el.id)}>
                    <Edit size={16} />
                  </Button>
                )}
                {deletedCardId === el.id && DeletedStatus === 'pending' ? (
                  <PreloaderCircle />
                ) : (
                  <Button variant={'icon'} onClick={() => onClickDelete(el.id)}>
                    <Delete size={16} />
                  </Button>
                )}
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
