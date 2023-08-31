import { FC } from 'react'

import { ActionButton } from '@/components/common/action-button/action-button.tsx'
import { TableDataPreloader } from '@/components/common/table-data-preloader/table-data-preloader.tsx'
import { Cell, Rating, Table } from '@/components/ui'
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
  return (
    <>
      <EditCardModal />
      <DeleteCardModal />
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
                <ActionButton id={el.id} type={'edit'} tableType={'cards'} />
                <ActionButton id={el.id} type={'delete'} tableType={'cards'} />
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
