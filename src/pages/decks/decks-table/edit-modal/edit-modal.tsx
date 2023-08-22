import { FC, useState } from 'react'

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
  const [updateDeck, { isLoading: isUpdateDeckLoading, error }] = useUpdateDecksMutation()
  const [addDeckErrors, setAddDeckErrors] = useState([])
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
      .catch(e => {
        console.log(e)
        console.log(error)
        setAddDeckErrors(e)
      })
  }

  // useEffect(() => {
  //   console.log(error)
  //   // if (error) {
  //   //   if ('data' in error) {
  //   //     if (error.data && 'errorMessages' in error.data) {
  //   //       setAddDeckErrors(error.data.errorMessages)
  //   //     }
  //   //     if (error.data && 'message' in error.data) {
  //   //       dispatch(authSlice.actions.setError(error.data.message))
  //   //     }
  //   //   }
  //   //   if ('error' in error) {
  //   //     dispatch(authSlice.actions.setError(error.error))
  //   //   }
  //   // }
  // }, [error])

  return (
    <Modal isOpen={true} title={'Edit Pack'} onClose={onModalClose}>
      <AddNewPackForm
        errorsMessages={addDeckErrors}
        isFetching={isUpdateDeckLoading}
        isEdit
        onCreate={onEditDeck}
        defaultValue={{ name: deckData.name, private: deckData.isPrivate, cover: deckData.cover }}
      />
    </Modal>
  )
}
