import { FC, useState } from 'react'

import { Delete, Edit } from '@/assets/icons/components'
import { WithIconPreloader } from '@/components/common/preloader/with-icon-preloader/with-icon-preloader.tsx'
import { Button } from '@/components/ui'
import { useLazyGetCardByIdQuery } from '@/services/cards/cards-api.ts'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { useLazyGetDecksByIdQuery } from '@/services/decks/decks-api.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch } from '@/services/store.ts'

type ActionButtonProps = {
  id: string
  type: 'edit' | 'delete'
  tableType: 'cards' | 'decks'
}

export const ActionButton: FC<ActionButtonProps> = ({ id, type, tableType }) => {
  const isEditButton = type === 'edit'
  const isDeleteButton = type === 'delete'
  const isCards = tableType === 'cards'
  const isDecks = tableType === 'decks'

  const [getData] = isCards ? useLazyGetCardByIdQuery() : useLazyGetDecksByIdQuery()
  const [isFetching, setIsFetching] = useState(false)
  const dispatch = useAppDispatch()
  const onClick = () => {
    setIsFetching(true)
    getData({ id })
      .unwrap()
      .then(() => {
        if (isCards) {
          if (isEditButton) dispatch(cardsSlice.actions.setEditedCardId(id))
          if (isDeleteButton) dispatch(cardsSlice.actions.setDeletedCardId(id))
        }
        if (isDecks) {
          if (isEditButton) dispatch(decksSlice.actions.setEditedDeckId(id))
          if (isDeleteButton) dispatch(decksSlice.actions.setDeletedDeckId(id))
        }
      })
      .finally(() => {
        setIsFetching(false) // снимаем флаг после завершения запроса
      })
  }

  return (
    <>
      <WithIconPreloader isFetching={isFetching}>
        <Button variant={'icon'} onClick={onClick}>
          {isEditButton && <Edit size={16} />}
          {isDeleteButton && <Delete size={16} />}
        </Button>
      </WithIconPreloader>
    </>
  )
}
