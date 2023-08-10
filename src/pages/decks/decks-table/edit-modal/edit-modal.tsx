import { FC } from 'react'

import { Modal } from '@/components/ui'
import { AddNewPackForm } from '@/pages/decks/add-deck/add-deck.tsx'
import { useGetDecksByIdQuery, useUpdateDecksMutation } from '@/services/decks/decks-api.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch } from '@/services/store.ts'

type ModalProps = {
  deckId: string
}
export const EditModal: FC<ModalProps> = ({ deckId }) => {
  const dispatch = useAppDispatch()
  const [updateDeck] = useUpdateDecksMutation()

  const onModalClose = () => {
    dispatch(decksSlice.actions.setEditedDeckId(''))
  }
  const onEditDeck = (name: string, isPrivate?: boolean) => {
    updateDeck({ name, isPrivate, id: deckId })
    onModalClose()
  }

  const { isLoading, data } = useGetDecksByIdQuery({
    id: deckId,
  })

  return isLoading || !data ? (
    <div>Loading...</div>
  ) : (
    <Modal isOpen={true} title={'Edit Pack'} onClose={onModalClose}>
      <AddNewPackForm
        isEdit
        onCreate={onEditDeck}
        defaultValue={{ name: data.name, private: data.isPrivate }}
      />
    </Modal>
  )
}
