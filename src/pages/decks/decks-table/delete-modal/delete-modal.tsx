import { FC } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

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
  const params = useParams()
  const navigate = useNavigate()

  const onModalClose = () => {
    if (params.id) navigate('/')
    dispatch(decksSlice.actions.setDeletedDeckId(''))
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
