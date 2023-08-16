import { FC } from 'react'

import { NavLink } from 'react-router-dom'

import s from './cards-drop-down.module.scss'

import { Delete, Edit, Learn, More } from '@/assets/icons/components'
import { DropDown, DropDownItem } from '@/components/ui'
import { DeleteModal } from '@/pages/decks/decks-table/delete-modal/delete-modal.tsx'
import { EditModal } from '@/pages/decks/decks-table/edit-modal/edit-modal.tsx'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

type Props = {
  deckId: string
}
const CardsDropDown: FC<Props> = ({ deckId }) => {
  const dispatch = useAppDispatch()
  const onClickEdit = () => {
    dispatch(decksSlice.actions.setEditedDeckId(deckId))
  }
  const editedUserId = useAppSelector(state => state.decksSlice.editedDeckId)
  const deletedUserId = useAppSelector(state => state.decksSlice.deletedDeckId)
  const onClickDelete = () => {
    dispatch(decksSlice.actions.setDeletedDeckId(deckId))
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {editedUserId && <EditModal deckId={editedUserId}></EditModal>}
      {deletedUserId && <DeleteModal deckId={deletedUserId}></DeleteModal>}
      <DropDown
        trigger={
          <button className={s.triggerBtn}>
            <More />
          </button>
        }
        alignOffset={-9}
        sideOffset={6}
      >
        <NavLink to={'#'} className={s.link}>
          <DropDownItem icon={<Learn size={16} />}>Learn</DropDownItem>
        </NavLink>
        <button className={s.btn} onClick={onClickEdit}>
          <DropDownItem icon={<Edit size={16} />}>Edit</DropDownItem>
        </button>
        <button className={s.btn} onClick={onClickDelete}>
          <DropDownItem icon={<Delete size={16} />}>Delete</DropDownItem>
        </button>
      </DropDown>
    </div>
  )
}

export default CardsDropDown
