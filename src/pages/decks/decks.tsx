import { useEffect, useState } from 'react'

import { clsx } from 'clsx'

import s from './decks.module.scss'

import { Delete } from '@/assets/icons/components'
import { errorHandler, errorMessagesType } from '@/common/utilis/errorHandler.tsx'
import { EmptyPage } from '@/components/common/empty-page/empty-page.tsx'
import { Preloader } from '@/components/common/preloader/preloader.tsx'
import { Button, Modal, Pagination, Slider, Typography } from '@/components/ui'
import { Tabs, TabType } from '@/components/ui/tabs'
import { AddDeckFormValues, AddNewPackForm } from '@/pages/decks/add-deck/add-deck.tsx'
import { DecksTable } from '@/pages/decks/decks-table/decks-table.tsx'
import { SearchInput } from '@/pages/decks/search-input/search-input.tsx'
import { useAuthMeQuery } from '@/services/auth/auth-api.ts'
import { useCreateDecksMutation, useGetDecksQuery } from '@/services/decks/decks-api.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

const tabs: TabType[] = [
  { title: 'My Cards', value: 'my-cards' },
  { title: 'All Cards', value: 'all-cards' },
]

export const Decks = () => {
  const dispatch = useAppDispatch()
  const minCardsCount = useAppSelector(state => state.decksSlice.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.decksSlice.maxCardsCount)
  const authorId = useAppSelector(state => state.decksSlice.authorId)
  const name = useAppSelector(state => state.decksSlice.name)
  const itemsPerPage = useAppSelector(state => state.decksSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.decksSlice.currentPage)
  const orderBy = useAppSelector(state => state.decksSlice.orderBy)

  const { data, isLoading, status } = useGetDecksQuery({
    minCardsCount,
    maxCardsCount,
    authorId,
    orderBy,
    name,
    itemsPerPage,
    currentPage,
  })

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (data) {
      dispatch(decksSlice.actions.setMaxCardsCount(data.maxCardsCount))
    }
  }, [data?.maxCardsCount])

  const onNumberOfCardsChange = (values: [number, number]) => {
    dispatch(decksSlice.actions.setMinCardsCount(values[0]))
    dispatch(decksSlice.actions.setMaxCardsCount(values[1]))
  }
  const onClearFilers = () => {
    if (data) {
      dispatch(decksSlice.actions.clearFilters({ maxCardsCount: data.maxCardsCount }))
    }
  }

  const onPageChange = (page: number) => {
    dispatch(decksSlice.actions.setCurrentPage(page))
  }
  const onItemsPerPageChange = (itemsPerPage: string) => {
    dispatch(decksSlice.actions.setItemsPerPage(Number(itemsPerPage)))
  }

  const [createDeck, { isLoading: isCreateDeckLoading, error }] = useCreateDecksMutation()

  const [addDeckErrors, setAddDeckErrors] = useState<errorMessagesType[]>([])
  const onAddPack = (data: AddDeckFormValues) => {
    createDeck({ name: data.name, cover: data.cover[0], isPrivate: data.private })
      .unwrap()
      .then(() => {
        setShowModal(false)
        setAddDeckErrors([])
      })
  }

  useEffect(() => {
    if (error) {
      errorHandler(error, dispatch, setAddDeckErrors)
    }
  }, [error])

  const onChangeSearch = (value: string) => {
    dispatch(decksSlice.actions.setName(value))
  }
  const onClearSearch = () => {
    dispatch(decksSlice.actions.setName(''))
  }

  const onModalClose = () => {
    setShowModal(false)
    setAddDeckErrors([])
  }

  if (isLoading)
    return (
      <EmptyPage>
        <Preloader />
      </EmptyPage>
    )

  return data ? (
    <>
      <Modal isOpen={showModal} title={'Add New Pack'} onClose={onModalClose}>
        <AddNewPackForm
          onCreate={onAddPack}
          isFetching={isCreateDeckLoading}
          errorsMessages={addDeckErrors}
        />
      </Modal>
      <div className={clsx('container', s.container)}>
        <div className={s.header}>
          <Typography variant={'Large'}>Packs list</Typography>
          <Button onClick={() => setShowModal(true)}>Add New Pack</Button>
        </div>
        <div className={s.containerFilter}>
          <SearchInput
            searchValue={name}
            onClearSearch={onClearSearch}
            onChangeSearch={onChangeSearch}
          />
          <DecksTabs />
          <Slider
            defaultValue={[minCardsCount, data.maxCardsCount]}
            value={[minCardsCount, maxCardsCount]}
            onChange={onNumberOfCardsChange}
            max={data.maxCardsCount}
            title={'Number of cards'}
          />
          <Button variant={'secondary'} icon={<Delete size={16} />} onClick={onClearFilers}>
            Clear Filter
          </Button>
        </div>
        {data.items.length !== 0 ? (
          <DecksTable data={data} status={status} />
        ) : (
          <EmptyPage>
            <Typography variant={'Body_1'}>There are no decks here</Typography>
          </EmptyPage>
        )}
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
  ) : null
}

const DecksTabs = () => {
  const { data } = useAuthMeQuery()
  const dispatch = useAppDispatch()
  const authorId = useAppSelector(state => state.decksSlice.authorId)
  const onPacksCardsChange = (value: string) => {
    if (value === 'my-cards' && data) {
      dispatch(decksSlice.actions.setAuthorId(data.id))
    }
    if (value === 'all-cards') {
      dispatch(decksSlice.actions.setAuthorId(''))
    }
  }

  return (
    <Tabs
      tabs={tabs}
      value={authorId ? 'my-cards' : 'all-cards'}
      title={'Show packs cards'}
      onValueChange={onPacksCardsChange}
      defaultValue={'all-cards'}
    />
  )
}
