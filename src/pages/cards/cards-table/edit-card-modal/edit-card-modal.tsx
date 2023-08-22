import { FC } from 'react'

import { Modal } from '@/components/ui'
import { AddCardForm, AddCardFormValues } from '@/pages/cards/add-card-form/add-card-form.tsx'
import { useEditCardMutation } from '@/services/cards/cards-api.ts'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { Card, CreateCardArgs } from '@/services/cards/types.ts'
import { useAppDispatch } from '@/services/store.ts'

type ModalProps = {
  cardData: Card
}
export const EditCardModal: FC<ModalProps> = ({ cardData }) => {
  const dispatch = useAppDispatch()
  const [editCard, { isLoading }] = useEditCardMutation()

  const onModalClose = () => {
    dispatch(cardsSlice.actions.setEditedCardId(''))
  }

  const onEditCard = (data: AddCardFormValues) => {
    const editCardArgs: CreateCardArgs = {
      id: cardData.id,
      answer: data.answer,
      question: data.question,
    }

    if (data.answerImg && typeof data.answerImg === 'object') {
      editCardArgs.answerImg = data.answerImg[0]
    }
    if (data.questionImg && typeof data.questionImg === 'object') {
      editCardArgs.questionImg = data.questionImg[0]
    }
    editCard(editCardArgs)
      .unwrap()
      .then(() => {
        onModalClose()
      })
  }

  return (
    <Modal isOpen={true} title={'Edit Card'} onClose={onModalClose}>
      <AddCardForm
        isFetching={isLoading}
        isEdit
        onAdd={onEditCard}
        defaultValue={{
          answer: cardData.answer,
          question: cardData.question,
          questionImg: cardData.questionImg,
          answerImg: cardData.answerImg,
        }}
      />
    </Modal>
  )
}
