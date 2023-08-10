import { useEffect, useState } from 'react'

import { clsx } from 'clsx'

import s from './decks.module.scss'

import { Delete } from '@/assets/icons/components'
import { Button, Modal, Pagination, Slider, Typography } from '@/components/ui'
import { Tabs, TabType } from '@/components/ui/tabs'
import { AddNewPackForm } from '@/pages/decks/add-deck/add-deck.tsx'
import DecksTable from '@/pages/decks/decks-table/decks-table.tsx'
import { SearchInput } from '@/pages/decks/search-input/search-input.tsx'
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
  //const orderBy = useAppSelector(state => state.decksSlice.orderBy)
  const name = useAppSelector(state => state.decksSlice.name)
  const itemsPerPage = useAppSelector(state => state.decksSlice.itemsPerPage)
  const currentPage = useAppSelector(state => state.decksSlice.currentPage)
  const meId = useAppSelector(state => state.authSlice.id)

  const { isLoading, data } = useGetDecksQuery({
    minCardsCount,
    maxCardsCount,
    authorId,
    orderBy: 'created-desc',
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

  const onPacksCardsChange = (value: string) => {
    if (value === 'my-cards') {
      dispatch(decksSlice.actions.setAuthorId(meId))
    }
    if (value === 'all-cards') {
      dispatch(decksSlice.actions.setAuthorId(''))
    }
  }
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

  const [createDeck] = useCreateDecksMutation()
  const onAddPack = (packName: string, isPrivate?: boolean) => {
    createDeck({ name: packName, isPrivate: isPrivate })
    setShowModal(false)
  }

  return isLoading || !data ? (
    <div>Loading...</div>
  ) : (
    <>
      <Modal isOpen={showModal} title={'Add New Pack'} onClose={() => setShowModal(false)}>
        <AddNewPackForm onCreate={onAddPack} />
      </Modal>
      <div className={clsx('container', s.container)}>
        <div className={s.header}>
          <Typography variant={'Large'}>Packs list</Typography>
          <Button onClick={() => setShowModal(true)}>Add New Pack</Button>
        </div>
        <div className={s.containerFilter}>
          <SearchInput searchValue={name} />
          <Tabs
            tabs={tabs}
            value={authorId ? 'my-cards' : 'all-cards'}
            title={'Show packs cards'}
            onValueChange={onPacksCardsChange}
            defaultValue={'all-cards'}
          />
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
        <DecksTable data={data} />
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
