import { FC, useEffect, useState } from 'react'

import { Modal } from '@/components/ui'
import { AddDeckFormValues, AddNewPackForm } from '@/pages/decks/add-deck/add-deck.tsx'
import { authSlice } from '@/services/auth/auth.slice.ts'
import { useGetDecksByIdQuery, useUpdateDecksMutation } from '@/services/decks/decks-api.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { UpdateDeckArgs } from '@/services/decks/types.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

type ModalProps = {}
export const EditDeckModal: FC<ModalProps> = () => {
  const dispatch = useAppDispatch()
  const [updateDeck, { isLoading: isUpdateDeckLoading, error }] = useUpdateDecksMutation()
  const [addDeckErrors, setAddDeckErrors] = useState([])

  const editedDeckId = useAppSelector(state => state.decksSlice.editedDeckId)
  const { data: editedDeckData } = useGetDecksByIdQuery({
    id: editedDeckId,
  })

  const onModalClose = () => {
    dispatch(decksSlice.actions.setEditedDeckId(''))
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
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    if (error) {
      if ('data' in error) {
        if (error.data && 'errorMessages' in error.data) {
          setAddDeckErrors(error.data.errorMessages)
        }
        if (error.data && 'message' in error.data) {
          dispatch(authSlice.actions.setError(error.data.message))
        }
      }
      if ('error' in error) {
        dispatch(authSlice.actions.setError(error.error))
      }
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
