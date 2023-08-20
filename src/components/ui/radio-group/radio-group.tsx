import { ComponentProps, FC } from 'react'

import * as RG from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from './radio-group.module.scss'

import { Typography } from '@/components/ui'

export type RadioItemType = {
  label: string
  value: string
  disabled?: boolean
}
export type RadioGroupProps = {
  items: RadioItemType[]
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
} & ComponentProps<'input'>

export const RadioGroup: FC<RadioGroupProps> = ({ items, defaultValue, onChange, className }) => {
  console.log(defaultValue)

  return (
    <RG.Root
      className={clsx(s.root, className)}
      defaultValue={defaultValue}
      onValueChange={onChange}
    >
      {items.map(i => (
        <div key={i.value}>
          <label className={s.label}>
            <RG.Item className={s.item} value={i.value} disabled={i.disabled}>
              <RG.Indicator className={s.indicator} />
            </RG.Item>
            <Typography variant={'Body_2'} color={i.disabled ? 'var(--color-light-900)' : ''}>
              {i.label}
            </Typography>
          </label>
        </div>
      ))}
    </RG.Root>
  )
}
