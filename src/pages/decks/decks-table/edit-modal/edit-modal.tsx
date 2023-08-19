import { FC } from 'react'

import { Modal } from '@/components/ui'
import { AddDeckFormValues, AddNewPackForm } from '@/pages/decks/add-deck/add-deck.tsx'
import { useGetDecksByIdQuery, useUpdateDecksMutation } from '@/services/decks/decks-api.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { UpdateDeckArgs } from '@/services/decks/types.ts'
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
  const onEditDeck = (data: AddDeckFormValues) => {
    const deckData: UpdateDeckArgs = { name: data.name, id: deckId, isPrivate: data.private }

    if (data.cover[0]) deckData.cover = data.cover[0]
    updateDeck(deckData)
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
        defaultValue={{ name: data.name, private: data.isPrivate, cover: data.cover }}
      />
    </Modal>
  )
}
