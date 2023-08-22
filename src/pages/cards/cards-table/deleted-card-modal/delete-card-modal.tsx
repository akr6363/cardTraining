import { FC } from 'react'

import s from './delete-card-modal.module.scss'

import { Button, Modal, Typography } from '@/components/ui'
import { useDeleteCardMutation } from '@/services/cards/cards-api.ts'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { Card } from '@/services/cards/types.ts'
import { useAppDispatch } from '@/services/store.ts'

type ModalProps = {
  cardData: Card
}
export const DeleteCardModal: FC<ModalProps> = ({ cardData }) => {
  const dispatch = useAppDispatch()
  const [deleteCard, { isLoading }] = useDeleteCardMutation()

  const onModalClose = () => {
    dispatch(cardsSlice.actions.setDeletedCardId(''))
  }
  const onDeleteDeck = () => {
    deleteCard({ cardId: cardData.id })
      .unwrap()
      .then(() => {
        onModalClose()
      })
  }

  return (
    <Modal isOpen={true} title={'Delete Pack'} onClose={onModalClose}>
      <div className={s.container}>
        <Typography variant={'Body_1'} className={s.text}>
          Do you really want to remove <b>{cardData.answer}?</b> <br />
          All cards will be deleted. Do you really want to remove All cards will be deleted.
        </Typography>
        <Button onClick={onDeleteDeck} style={{ alignSelf: 'end' }} isFetching={isLoading}>
          Delete Card
        </Button>
      </div>
    </Modal>
  )
}
