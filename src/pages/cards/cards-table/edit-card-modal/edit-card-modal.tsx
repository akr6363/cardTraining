import { FC, useEffect, useState } from 'react'

import { errorHandler, errorMessagesType } from '@/common/utilis/errorHandler.tsx'
import { Modal } from '@/components/ui'
import { AddCardForm, AddCardFormValues } from '@/pages/cards/add-card-form/add-card-form.tsx'
import { useEditCardMutation, useGetCardByIdQuery } from '@/services/cards/cards-api.ts'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { CreateCardArgs } from '@/services/cards/types.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

type ModalProps = {}
export const EditCardModal: FC<ModalProps> = ({}) => {
  const dispatch = useAppDispatch()
  const [editCard, { isLoading, error }] = useEditCardMutation()

  const [cardsErrors, setCardsErrors] = useState<errorMessagesType[]>([])

  const editedCardId = useAppSelector(state => state.cardsSlice.editedCardId)
  const { data: editedCardData } = useGetCardByIdQuery(
    {
      id: editedCardId,
    },
    { skip: !editedCardId }
  )

  const onModalClose = () => {
    dispatch(cardsSlice.actions.setEditedCardId(''))
    setCardsErrors([])
  }

  const onEditCard = (data: AddCardFormValues) => {
    const editCardArgs: CreateCardArgs = {
      id: editedCardData!.id,
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

  useEffect(() => {
    if (error) {
      errorHandler(error, dispatch, setCardsErrors)
    }
  }, [error])

  return editedCardId && editedCardData ? (
    <Modal isOpen={true} title={'Edit Card'} onClose={onModalClose}>
      <AddCardForm
        errorsMessages={cardsErrors}
        isFetching={isLoading}
        isEdit
        onAdd={onEditCard}
        defaultValue={{
          answer: editedCardData.answer,
          question: editedCardData.question,
          questionImg: editedCardData.questionImg,
          answerImg: editedCardData.answerImg,
        }}
      />
    </Modal>
  ) : null
}
