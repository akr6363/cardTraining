import { FC } from 'react'

import { NavLink } from 'react-router-dom'

import s from './cards-drop-down.module.scss'

import { Delete, Edit, Learn, More } from '@/assets/icons/components'
import { DropDown, DropDownItem } from '@/components/ui'
import { useChangeDecks } from '@/pages/decks/decks-table/decks-table.tsx'
import { DeleteDeckModal } from '@/pages/decks/decks-table/delete-modal/delete-modal.tsx'
import { EditDeckModal } from '@/pages/decks/decks-table/edit-modal/edit-modal.tsx'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch } from '@/services/store.ts'

type Props = {
  deckId: string
}
const CardsDropDown: FC<Props> = ({ deckId }) => {
  const dispatch = useAppDispatch()
  const onClickEdit = () => {
    dispatch(decksSlice.actions.setEditedDeckId(deckId))
  }

  const onClickDelete = () => {
    dispatch(decksSlice.actions.setDeletedDeckId(deckId))
  }

  const {
    editedDeckId,
    deletedDeckId,
    editedDeckData,
    editedStatus,
    deletedDeckData,
    deletedStatus,
  } = useChangeDecks()

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {editedDeckId && editedStatus === 'fulfilled' && (
        <EditDeckModal deckData={editedDeckData!}></EditDeckModal>
      )}
      {deletedDeckId && deletedStatus === 'fulfilled' && (
        <DeleteDeckModal deckData={deletedDeckData!}></DeleteDeckModal>
      )}
      <DropDown
        trigger={
          <button className={s.triggerBtn}>
            <More />
          </button>
        }
        alignOffset={-9}
        sideOffset={6}
      >
        <NavLink to={`/${deckId}/learn`} className={s.link}>
          <DropDownItem icon={<Learn size={16} />}>Learn</DropDownItem>
        </NavLink>
        <button className={s.btn} onClick={onClickEdit}>
          <DropDownItem icon={<Edit size={16} />} isFetching={editedStatus === 'pending'}>
            Edit
          </DropDownItem>
        </button>
        <button className={s.btn} onClick={onClickDelete}>
          <DropDownItem icon={<Delete size={16} />} isFetching={editedStatus === 'pending'}>
            Delete
          </DropDownItem>
        </button>
      </DropDown>
    </div>
  )
}

export default CardsDropDown
