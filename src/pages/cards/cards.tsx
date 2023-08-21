import { FC, useState } from 'react'

import { clsx } from 'clsx'
import { NavLink, useParams } from 'react-router-dom'

import s from './cards.module.scss'

import { ArrowBackLong } from '@/assets/icons/components/ArrowBackLong.tsx'
import { EmptyPage } from '@/components/common/empty-page/empty-page.tsx'
import { Overlay } from '@/components/common/overlay/overlay.tsx'
import { Preloader } from '@/components/common/preloader/preloader.tsx'
import { Button, Modal, Pagination, Typography } from '@/components/ui'
import { AddCardForm, AddCardFormValues } from '@/pages/cards/add-card-form/add-card-form.tsx'
import CardsDropDown from '@/pages/cards/cards-drop-down/cards-drop-down.tsx'
import { CardsTable } from '@/pages/cards/cards-table/cards-table.tsx'
import { SearchInput } from '@/pages/decks/search-input/search-input.tsx'
import { useAuthMeQuery } from '@/services/auth/auth-api.ts'
import { useAddCardMutation, useGetCardsQuery } from '@/services/cards/cards-api.ts'
import { cardsSlice } from '@/services/cards/cards.slice.ts'
import { CreateCardArgs } from '@/services/cards/types.ts'
import { useGetDecksByIdQuery } from '@/services/decks/decks-api.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const { data: meData } = useAuthMeQuery()
  const params = useParams()
  const id = params.id ? params.id : ''
  const itemsPerPage = useAppSelector(state => state.cardsSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.cardsSlice.currentPage)
  const question = useAppSelector(state => state.cardsSlice.question)
  const orderBy = useAppSelector(state => state.cardsSlice.orderBy)
  const { isLoading, data, status } = useGetCardsQuery({
    id,
    itemsPerPage,
    currentPage,
    question,
    orderBy,
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
  const [addCard, { isLoading: isAddCardLoading }] = useAddCardMutation()
  const onAddCard = (data: AddCardFormValues) => {
    const cardData: CreateCardArgs = { id, answer: data.answer, question: data.question }

    if (data.answerImg[0]) cardData.answerImg = data.answerImg[0]
    if (data.questionImg[0]) cardData.questionImg = data.questionImg[0]
    addCard(cardData)
      .unwrap()
      .then(() => {
        setShowModal(false)
      })
  }

  const onClickAdd = () => {
    setShowModal(true)
  }

  const isMy = meData && meData.id === deck?.userId
  const isItems = data?.items && data.items.length > 0

  if (isLoading || isLoadingDeck) return <div>Loading...</div>

  return (
    <>
      <Modal isOpen={showModal} title={'Add New Card'} onClose={() => setShowModal(false)}>
        <AddCardForm onAdd={onAddCard} />
        {isAddCardLoading && (
          <Overlay>
            <Preloader />
          </Overlay>
        )}
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
            <Typography variant={'Large'}>{deck?.name}</Typography>
            {isMy && <CardsDropDown deckId={id} />}
          </div>
          {isItems &&
            (isMy ? (
              <AddCardButton onClick={onClickAdd} />
            ) : (
              <Button as={NavLink} to={'#'}>
                Learn to Pack
              </Button>
            ))}
        </div>
        {deck?.cover && (
          <div className={s.deckImg}>
            <img src={deck?.cover} alt="" />
          </div>
        )}
        {(isItems || question) && (
          <>
            <div className={s.search}>
              <SearchInput
                searchValue={question}
                onChangeSearch={onChangeSearch}
                onClearSearch={onClearSearch}
              />
            </div>
            {isItems ? (
              <CardsTable data={data} isMy={!!isMy} status={status} />
            ) : (
              <EmptyPage>
                <Typography variant={'Body_1'}>There are no cards here</Typography>
              </EmptyPage>
            )}
            <Pagination
              page={data!.pagination.currentPage}
              selectOptions={['10', '20', '30']}
              selectCurrent={itemsPerPage.toString()}
              onSelectChange={onItemsPerPageChange}
              count={data!.pagination.totalPages}
              onChange={onPageChange}
            />
          </>
        )}
        {!isItems && !question && (
          <EmptyPage>
            <Typography variant={'Body_1'}>
              This pack is empty.
              {isMy && 'Click add new card to fill this pack'}
            </Typography>
            {isMy && <AddCardButton onClick={onClickAdd} />}
          </EmptyPage>
        )}
      </div>
    </>
  )
}
type Props = {
  onClick: () => void
}
const AddCardButton: FC<Props> = ({ onClick }) => {
  return <Button onClick={onClick}>Add New Card</Button>
}
