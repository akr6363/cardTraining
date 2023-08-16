import { FC } from 'react'

import { Modal } from '@/components/ui'
import { AddCardForm } from '@/pages/cards/add-card-form/add-card-form.tsx'
import { useEditCardMutation, useGetCardByIdQuery } from '@/services/cards/cards-api.ts'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { useAppDispatch } from '@/services/store.ts'

type ModalProps = {
  cardId: string
}
export const EditCardModal: FC<ModalProps> = ({ cardId }) => {
  const dispatch = useAppDispatch()
  const [editCard] = useEditCardMutation()

  const onModalClose = () => {
    dispatch(cardsSlice.actions.setEditedCardId(''))
  }
  const onEditDeck = (question: string, answer: string) => {
    editCard({ question, answer, id: cardId })
    onModalClose()
  }

  const { isLoading, data } = useGetCardByIdQuery({
    id: cardId,
  })

  return isLoading || !data ? (
    <div>Loading...</div>
  ) : (
    <Modal isOpen={true} title={'Edit Card'} onClose={onModalClose}>
      <AddCardForm
        isEdit
        onAdd={onEditDeck}
        defaultValue={{ answer: data.answer, question: data.question }}
      />
    </Modal>
  )
}
