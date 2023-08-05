import { ChangeEvent, FC, useState } from 'react'

import * as S from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './slider.module.scss'

import { TextField } from '@/components/ui'

export type SliderProps = {
  defaultValue: [number, number]
  onChange: (values: [number, number]) => void
  max: number
  step?: number
}
export const Slider: FC<SliderProps> = ({ defaultValue, onChange, max, step = 1 }) => {
  const [values, setValues] = useState<[number, number]>(defaultValue)

  const handleChange = (newValues: [number, number]) => {
    setValues(newValues)
    onChange(newValues)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = event.target
    const newValues: [number, number] = [...values]
    let parsedValue = Number(value)

    if (index === 0) {
      parsedValue = Math.min(parsedValue, Number(values[1]))
    }
    if (index === 1) {
      parsedValue = Math.min(parsedValue, 15)
    }
    newValues[index] = parsedValue
    setValues(newValues)
  }

  return (
    <div className={s.container}>
      <TextField
        type="number"
        value={values[0].toString()}
        onChange={e => {
          handleInputChange(e, 0)
        }}
        min={0}
        max={values[1]}
        className={clsx(s.valueInput, values[0] < 10 && s.lessPadding)}
      />
      <S.Root
        className={s.root}
        defaultValue={defaultValue}
        max={max}
        step={step}
        onValueChange={handleChange}
        value={values}
      >
        <S.Track className={s.track}>
          <S.Range className={s.range} />
        </S.Track>
        <S.Thumb className={s.thumb} aria-label="Volume" />
        <S.Thumb className={s.thumb} aria-label="Volume" />
      </S.Root>
      <TextField
        type="number"
        value={values[1].toString()}
        onChange={e => {
          handleInputChange(e, 1)
        }}
        min={values[0]}
        max={max}
        className={clsx(s.valueInput, values[1] < 10 && s.lessPadding)}
      />
    </div>
  )
}
