import { FC } from 'react'

import { Modal } from '@/components/ui'
import { AddDeckFormValues, AddNewPackForm } from '@/pages/decks/add-deck/add-deck.tsx'
import { useUpdateDecksMutation } from '@/services/decks/decks-api.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { Deck, UpdateDeckArgs } from '@/services/decks/types.ts'
import { useAppDispatch } from '@/services/store.ts'

type ModalProps = {
  deckData: Deck
}
export const EditDeckModal: FC<ModalProps> = ({ deckData }) => {
  const dispatch = useAppDispatch()
  const [updateDeck, { isLoading: isUpdateDeckLoading }] = useUpdateDecksMutation()

  const onModalClose = () => {
    dispatch(decksSlice.actions.setEditedDeckId(''))
  }
  const onEditDeck = (data: AddDeckFormValues) => {
    const editDeckArgs: UpdateDeckArgs = {
      name: data.name,
      id: deckData.id,
      isPrivate: data.private,
    }

    if (data.cover && typeof data.cover === 'object') {
      editDeckArgs.cover = data.cover[0]
    }
    updateDeck(editDeckArgs)
      .unwrap()
      .then(() => {
        onModalClose()
      })
  }

  return (
    <Modal isOpen={true} title={'Edit Pack'} onClose={onModalClose}>
      <AddNewPackForm
        isFetching={isUpdateDeckLoading}
        isEdit
        onCreate={onEditDeck}
        defaultValue={{ name: deckData.name, private: deckData.isPrivate, cover: deckData.cover }}
      />
    </Modal>
  )
}
