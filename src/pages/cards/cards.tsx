import { useState } from 'react'

import { clsx } from 'clsx'
import { NavLink, useParams } from 'react-router-dom'

import s from './cards.module.scss'

import { ArrowBackLong } from '@/assets/icons/components/ArrowBackLong.tsx'
import { Button, Modal, Pagination, Typography } from '@/components/ui'
import { AddCardForm } from '@/pages/cards/add-card-form/add-card-form.tsx'
import CardsDropDown from '@/pages/cards/cards-drop-down/cards-drop-down.tsx'
import { CardsTable } from '@/pages/cards/cards-table/cards-table.tsx'
import { SearchInput } from '@/pages/decks/search-input/search-input.tsx'
import { useAddCardMutation, useGetCardsQuery } from '@/services/cards/cards-api.ts'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { useGetDecksByIdQuery } from '@/services/decks/decks-api.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const id = params.id ? params.id : ''
  const itemsPerPage = useAppSelector(state => state.cardsSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.cardsSlice.currentPage)
  const question = useAppSelector(state => state.cardsSlice.question)
  const meId = useAppSelector(state => state.authSlice.id)
  const { isLoading, data } = useGetCardsQuery({
    id,
    itemsPerPage,
    currentPage,
    question,
    orderBy: 'created-desc',
  })
  const { isLoading: isLoadingDeck, data: deck } = useGetDecksByIdQuery({
    id,
  })
  const [showModal, setShowModal] = useState(false)
  const onPageChange = (page: number) => {
    dispatch(cardsSlice.actions.setCurrentPage(page))
  }
  const onItemsPerPageChange = (itemsPerPage: string) => {
    dispatch(cardsSlice.actions.setItemsPerPage(Number(itemsPerPage)))
  }
  const onChangeSearch = (value: string) => {
    dispatch(cardsSlice.actions.setQuestion(value))
  }
  const onClearSearch = () => {
    dispatch(cardsSlice.actions.setQuestion(''))
  }
  const [addCard] = useAddCardMutation()
  const onAddCard = (question: string, answer: string) => {
    addCard({ id, answer, question })

    // addCard({ name: packName, isPrivate: isPrivate })
    setShowModal(false)
  }

  return isLoading || !data || !deck || isLoadingDeck ? (
    <div>Loading...</div>
  ) : (
    <>
      <Modal isOpen={showModal} title={'Add New Pack'} onClose={() => setShowModal(false)}>
        <AddCardForm onAdd={onAddCard} />
      </Modal>
      <div className={clsx('container', s.container)}>
        <Button
          as={NavLink}
          to={'/'}
          variant={'link'}
          icon={<ArrowBackLong size={16} color={'var(--color-accent-500)'} />}
          className={s.btnBack}
        >
          Back to Packs List
        </Button>
        <div className={s.top}>
          <div className={s.title}>
            <Typography variant={'Large'}>{deck.name}</Typography>
            {meId === deck.userId && <CardsDropDown deckId={id} />}
          </div>
          {meId === deck.userId ? (
            <Button
              onClick={() => {
                setShowModal(true)
              }}
            >
              Add New Card
            </Button>
          ) : (
            <Button as={NavLink} to={'#'}>
              Learn to Pack
            </Button>
          )}
        </div>
        {deck.cover && (
          <div className={s.deckImg}>
            <img src={deck.cover} alt="" />
          </div>
        )}
        <div className={s.search}>
          <SearchInput
            searchValue={question}
            onChangeSearch={onChangeSearch}
            onClearSearch={onClearSearch}
          />
        </div>
        <CardsTable data={data} isMy={meId === deck.userId} />
        <Pagination
          page={data.pagination.currentPage}
          selectOptions={['10', '20', '30']}
          selectCurrent={itemsPerPage.toString()}
          onSelectChange={onItemsPerPageChange}
          count={data.pagination.totalPages}
          onChange={onPageChange}
        />
      </div>
    </>
  )
}
