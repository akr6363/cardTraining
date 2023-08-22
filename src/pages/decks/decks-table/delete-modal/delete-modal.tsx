import { FC, useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import s from './delete-modal.module.scss'

import { Button, Modal, Typography } from '@/components/ui'
import { useDeleteDecksMutation } from '@/services/decks/decks-api.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { Deck } from '@/services/decks/types.ts'
import { useAppDispatch } from '@/services/store.ts'

type ModalProps = {
  deckData: Deck
}

export const DeleteDeckModal: FC<ModalProps> = ({ deckData }) => {
  const dispatch = useAppDispatch()
  const [deleteDeck, { error, isLoading: isDeleteDeckLoading }] = useDeleteDecksMutation()

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      //@ts-ignore
      alert(error?.data?.message)
    }
  }, [error])

  const onModalClose = () => {
    dispatch(decksSlice.actions.setDeletedDeckId(''))
  }
  const onDeleteDeck = () => {
    deleteDeck({ id: deckData.id })
      .unwrap()
      .then(() => {
        onModalClose()
        if (params.id) navigate('/')
      })
      .catch(() => {
        return
      })
  }

  return (
    <Modal isOpen={true} title={'Delete Pack'} onClose={onModalClose}>
      <div className={s.container}>
        <Typography variant={'Body_1'} className={s.text}>
          Do you really want to remove <b>{deckData.name}?</b> <br />
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
  )
}
