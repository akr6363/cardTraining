import { FC } from 'react'

import * as RG from '@radix-ui/react-radio-group'

import s from './radio-group.module.scss'

import { Typography } from '@/components/ui'

export type RadioItemType = {
  label: string
  value: string
}
export type RadioGroupProps = {
  items: RadioItemType[]
  defaultValue?: string
  onChange?: (value: string) => void
}

export const RadioGroup: FC<RadioGroupProps> = ({ items, defaultValue, onChange }) => {
  return (
    <RG.Root className={s.root} defaultValue={defaultValue} onValueChange={onChange}>
      {items.map(i => (
        <div key={i.value}>
          <label className={s.label}>
            <RG.Item className={s.item} value={i.value}>
              <RG.Indicator className={s.indicator} />
            </RG.Item>
            <Typography variant={'Body_2'}>{i.label}</Typography>
          </label>
        </div>
      ))}
    </RG.Root>
  )
}
