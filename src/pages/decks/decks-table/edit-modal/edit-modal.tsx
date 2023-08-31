import { FC, useEffect, useState } from 'react'

import { errorHandler, errorMessagesType } from '@/common/utilis/errorHandler.tsx'
import { Modal } from '@/components/ui'
import { AddDeckFormValues, AddNewPackForm } from '@/pages/decks/add-deck/add-deck.tsx'
import { useGetDecksByIdQuery, useUpdateDecksMutation } from '@/services/decks/decks-api.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { UpdateDeckArgs } from '@/services/decks/types.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

type ModalProps = {}
export const EditDeckModal: FC<ModalProps> = () => {
  const dispatch = useAppDispatch()
  const [updateDeck, { isLoading: isUpdateDeckLoading, error }] = useUpdateDecksMutation()
  const [addDeckErrors, setAddDeckErrors] = useState<errorMessagesType[]>([])

  const editedDeckId = useAppSelector(state => state.decksSlice.editedDeckId)
  const { data: editedDeckData } = useGetDecksByIdQuery({
    id: editedDeckId,
  })

  const onModalClose = () => {
    dispatch(decksSlice.actions.setEditedDeckId(''))
    setAddDeckErrors([])
  }
  const onEditDeck = (data: AddDeckFormValues) => {
    const editDeckArgs: UpdateDeckArgs = {
      name: data.name,
      id: editedDeckData!.id,
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

  useEffect(() => {
    if (error) {
      errorHandler(error, dispatch, setAddDeckErrors)
    }
  }, [error])

  return editedDeckId && editedDeckData ? (
    <Modal isOpen={true} title={'Edit Pack'} onClose={onModalClose}>
      <AddNewPackForm
        errorsMessages={addDeckErrors}
        isFetching={isUpdateDeckLoading}
        isEdit
        onCreate={onEditDeck}
        defaultValue={{
          name: editedDeckData.name,
          private: editedDeckData.isPrivate,
          cover: editedDeckData.cover,
        }}
      />
    </Modal>
  ) : null
}
