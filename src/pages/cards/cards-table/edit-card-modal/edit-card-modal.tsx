import { FC } from 'react'

import { Overlay } from '@/components/common/overlay/overlay.tsx'
import { Preloader } from '@/components/common/preloader/preloader.tsx'
import { Modal } from '@/components/ui'
import { AddCardForm, AddCardFormValues } from '@/pages/cards/add-card-form/add-card-form.tsx'
import { useEditCardMutation, useGetCardByIdQuery } from '@/services/cards/cards-api.ts'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { CreateCardArgs } from '@/services/cards/types.ts'
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

  const onEditCard = (data: AddCardFormValues) => {
    const cardData: CreateCardArgs = { id: cardId, answer: data.answer, question: data.question }

    if (data.answerImg && typeof data.answerImg === 'object') {
      cardData.answerImg = data.answerImg[0]
    }
    if (data.questionImg && typeof data.questionImg === 'object') {
      cardData.questionImg = data.questionImg[0]
    }
    editCard(cardData)
    onModalClose()
  }

  const { isLoading, data } = useGetCardByIdQuery({
    id: cardId,
  })

  return (
    <Modal isOpen={true} title={'Edit Card'} onClose={onModalClose}>
      {isLoading ? (
        <Overlay>
          <Preloader />
        </Overlay>
      ) : (
        <AddCardForm
          isEdit
          onAdd={onEditCard}
          defaultValue={{
            answer: data!.answer,
            question: data!.question,
            questionImg: data?.questionImg,
            answerImg: data?.answerImg,
          }}
        />
      )}
    </Modal>
  )
}
