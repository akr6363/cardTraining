import { FC, useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import s from './delete-modal.module.scss'

import { errorHandler } from '@/common/utilis/errorHandler.tsx'
import { Button, Modal, Typography } from '@/components/ui'
import { useDeleteDecksMutation, useGetDecksByIdQuery } from '@/services/decks/decks-api.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

type ModalProps = {}

export const DeleteDeckModal: FC<ModalProps> = () => {
  const dispatch = useAppDispatch()
  const [deleteDeck, { error, isLoading: isDeleteDeckLoading }] = useDeleteDecksMutation()

  const params = useParams()
  const navigate = useNavigate()

  const deletedDeckId = useAppSelector(state => state.decksSlice.deletedDeckId)
  const { data: deletedDeckData } = useGetDecksByIdQuery({
    id: deletedDeckId,
  })

  useEffect(() => {
    if (error) {
      errorHandler(error, dispatch)
    }
  }, [error])
  const onModalClose = () => {
    dispatch(decksSlice.actions.setDeletedDeckId(''))
  }
  const onDeleteDeck = () => {
    deleteDeck({ id: deletedDeckData!.id })
      .unwrap()
      .then(() => {
        onModalClose()
        if (params.id) navigate('/')
      })
      .catch(() => {
        return
      })
  }

  return deletedDeckId && deletedDeckData ? (
    <Modal isOpen={true} title={'Delete Pack'} onClose={onModalClose}>
      <div className={s.container}>
        <Typography variant={'Body_1'} className={s.text}>
          Do you really want to remove <b>{deletedDeckData.name}?</b> <br />
          All cards will be deleted.
        </Typography>
        <Button
          onClick={onDeleteDeck}
          style={{ alignSelf: 'end' }}
          isFetching={isDeleteDeckLoading}
        >
          Delete Pack
        </Button>
      </div>
    </Modal>
  ) : null
}
