import { FC, useEffect, useState } from 'react'

import { TextField } from '@/components/ui'
import { decksSlice } from '@/services/decks/decks.slice.ts'
import { useAppDispatch } from '@/services/store.ts'

type Props = {
  searchValue: string
}
export const SearchInput: FC<Props> = ({ searchValue }) => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState('')
  const [timerId, setTimerId] = useState<number | null>(null)
  const onChangeSearch = (value: string) => {
    dispatch(decksSlice.actions.setName(value))
  }
  const onClearSearch = () => {
    setValue('')
    dispatch(decksSlice.actions.setName(''))
  }

  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId)
    }
    setTimerId(
      +setTimeout(() => {
        onChangeSearch(value)
      }, 1000)
    )
  }, [value])

  useEffect(() => {
    setValue(searchValue)
  }, [searchValue])

  return (
    <TextField
      search={true}
      value={value}
      placeholder={'Input search'}
      onChange={e => setValue(e.currentTarget.value)}
      onClearClick={onClearSearch}
    />
  )
}
