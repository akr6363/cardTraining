import { FC, useEffect, useState } from 'react'

import { TextField } from '@/components/ui'

type Props = {
  searchValue: string
  onChangeSearch: (value: string) => void
  onClearSearch: () => void
}
export const SearchInput: FC<Props> = ({ searchValue, onClearSearch, onChangeSearch }) => {
  const [value, setValue] = useState('')
  const [timerId, setTimerId] = useState<number | null>(null)

  const onClearSearchHandler = () => {
    onClearSearch()
    setValue('')
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
      onClearClick={onClearSearchHandler}
    />
  )
}
