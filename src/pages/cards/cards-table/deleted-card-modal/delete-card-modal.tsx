import { FC, useEffect } from 'react'

import s from './delete-card-modal.module.scss'

import { errorHandler } from '@/common/utilis/errorHandler.tsx'
import { Button, Modal, Typography } from '@/components/ui'
import { useDeleteCardMutation, useGetCardByIdQuery } from '@/services/cards/cards-api.ts'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

type ModalProps = {}
export const DeleteCardModal: FC<ModalProps> = ({}) => {
  const dispatch = useAppDispatch()
  const [deleteCard, { isLoading, error }] = useDeleteCardMutation()

  const deletedCardId = useAppSelector(state => state.cardsSlice.deletedCardId)
  const { data: deletedCardData } = useGetCardByIdQuery(
    {
      id: deletedCardId,
    },
    { skip: !deletedCardId }
  )

  const onModalClose = () => {
    dispatch(cardsSlice.actions.setDeletedCardId(''))
  }
  const onDeleteDeck = () => {
    deleteCard({ cardId: deletedCardData!.id })
      .unwrap()
      .then(() => {
        onModalClose()
      })
  }

  useEffect(() => {
    if (error) {
      errorHandler(error, dispatch)
    }
  }, [error])

  return deletedCardId && deletedCardData ? (
    <Modal isOpen={true} title={'Delete Pack'} onClose={onModalClose}>
      <div className={s.container}>
        <Typography variant={'Body_1'} className={s.text}>
          Do you really want to remove <b>{deletedCardData.answer}?</b> <br />
          All cards will be deleted. Do you really want to remove All cards will be deleted.
        </Typography>
        <Button onClick={onDeleteDeck} style={{ alignSelf: 'end' }} isFetching={isLoading}>
          Delete Card
        </Button>
      </div>
    </Modal>
  ) : null
}
