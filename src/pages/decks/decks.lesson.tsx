import { useState } from 'react'

import { Delete, Edit, Learn } from '@/assets/icons/components'
import { Button, Cell, EditBlock, Table, TextField } from '@/components/ui'
import { useCreateDecksMutation, useGetDecksQuery } from '@/services/decks/decks-api.ts'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch, useAppSelector } from '@/services/store.ts'

const columnsPacks = [
  { title: 'Name', sortKey: 'name', width: '26%' },
  { title: 'Cards', sortKey: 'cards', width: '14%' },
  { title: 'Last Update', sortKey: 'update', width: '20%' },
  { title: 'Created by', sortKey: 'author', width: '29%' },
  { title: '', sortKey: 'edit', width: '11%' },
]

export const Decks = () => {
  const [cardName, setCardName] = useState('')
  //const [skip, setSkip] = useState(true)
  // const { isLoading, data } = useGetDecksQuery(undefined, {
  //   skip: skip,
  // })
  // const [initializeQuery, { isLoading, data }] = useLazyGetDecksQuery()

  // console.log(data)
  // const initializeQuery = () => {
  //   setSkip(false)
  // }
  const dispatch = useAppDispatch()
  const itemsPerPage = useAppSelector(state => state.decksSlice.itemsPerPage)

  // const [itemsPerPage, setItemsPerPage] = useState(20)
  const { isLoading, data } = useGetDecksQuery({
    itemsPerPage,
    orderBy: 'created-desc',
    // authorId: 'af9721b3-1995-4f2a-b48a-f0bc4d39395f',
  })

  const [createDeck] = useCreateDecksMutation()
  //const [createDeck, { isLoading: isCreateDeckLoading }] = useCreateDecksMutation()

  const handleCreateClicked = () => createDeck({ name: cardName })

  if (isLoading) return <div>Loading...</div>

  const setItemsPerPage = (itemsPerPage: number) =>
    dispatch(decksSlice.actions.setItemsPerPage(itemsPerPage))

  return (
    <div className={'container'}>
      <TextField value={cardName} onChange={e => setCardName(e.currentTarget.value)} />
      <Button onClick={() => handleCreateClicked()}>itemsPerPage:10</Button>
      <Button onClick={() => setItemsPerPage(10)}>itemsPerPage:10</Button>
      <Button onClick={() => setItemsPerPage(20)}>itemsPerPage:20</Button>
      <Button onClick={() => setItemsPerPage(30)}>itemsPerPage:30</Button>
      {/*isLoading: {isLoading.toString()}*/}
      {/*<Button onClick={() => initializeQuery()}> decks</Button>*/}


      <Table columns={columnsPacks}>
        {data?.items.map(el => {
          return (
            <tr key={el.id}>
              <Cell>{el.name}</Cell>
              <Cell>{el.cardsCount}</Cell>
              <Cell>{new Date(el.updated).toLocaleString('en-GB')}</Cell>
              <Cell>{el.author.name}</Cell>
              <Cell>
                <EditBlock>
                  <Learn size={16} />
                  <Edit size={16} />
                  <Delete size={16} />
                </EditBlock>
              </Cell>
            </tr>
          )
        })}
      </Table>
    </div>
  )
}

