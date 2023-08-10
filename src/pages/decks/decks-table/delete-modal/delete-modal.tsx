import { FC } from 'react'

import s from './delete-modal.module.scss'

import { Button, Modal, Typography } from '@/components/ui'
import { useDeleteDecksMutation, useGetDecksByIdQuery } from '@/services/decks/decks-api.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch } from '@/services/store.ts'
type ModalProps = {
  deckId: string
}
export const DeleteModal: FC<ModalProps> = ({ deckId }) => {
  const dispatch = useAppDispatch()
  const [deleteDeck] = useDeleteDecksMutation()
  const { isLoading, data } = useGetDecksByIdQuery({
    id: deckId,
  })
  const onModalClose = () => {
    dispatch(decksSlice.actions.setDeletedUserId(''))
  }
  const onDeleteDeck = () => {
    deleteDeck({ id: deckId })
    onModalClose()
  }

  return isLoading || !data ? (
    <div>Loading...</div>
  ) : (
    <Modal isOpen={true} title={'Delete Pack'} onClose={onModalClose}>
      <div className={s.container}>
        <Typography variant={'Body_1'} className={s.text}>
          Do you really want to remove <b>{data.name}?</b> <br />
          All cards will be deleted.
        </Typography>
        <Button onClick={onDeleteDeck} style={{ alignSelf: 'end' }}>
          Delete Pack
        </Button>
      </div>
    </Modal>
  )
}
