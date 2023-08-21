import { FC } from 'react'

import s from './delete-card-modal.module.scss'

import { Overlay } from '@/components/common/overlay/overlay.tsx'
import { Preloader } from '@/components/common/preloader/preloader.tsx'
import { Button, Modal, Typography } from '@/components/ui'
import { useDeleteCardMutation, useGetCardByIdQuery } from '@/services/cards/cards-api.ts'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { useAppDispatch } from '@/services/store.ts'

type ModalProps = {
  cardId: string
}
export const DeleteCardModal: FC<ModalProps> = ({ cardId }) => {
  const dispatch = useAppDispatch()
  const [deleteCard] = useDeleteCardMutation()
  const { isLoading, data } = useGetCardByIdQuery({
    id: cardId,
  })
  const onModalClose = () => {
    dispatch(cardsSlice.actions.setDeletedCardId(''))
  }
  const onDeleteDeck = () => {
    deleteCard({ cardId })
    onModalClose()
  }

  return (
    <Modal isOpen={true} title={'Delete Pack'} onClose={onModalClose}>
      {isLoading ? (
        <Overlay>
          <Preloader />
        </Overlay>
      ) : (
        <div className={s.container}>
          <Typography variant={'Body_1'} className={s.text}>
            Do you really want to remove <b>{data?.answer}?</b> <br />
            All cards will be deleted. Do you really want to remove All cards will be deleted.
          </Typography>
          <Button onClick={onDeleteDeck} style={{ alignSelf: 'end' }}>
            Delete Card
          </Button>
        </div>
      )}
    </Modal>
  )
}
