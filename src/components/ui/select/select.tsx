import { FC, ForwardedRef, forwardRef, ReactNode } from 'react'

import * as S from '@radix-ui/react-select'
import { clsx } from 'clsx'

import { Typography } from '../typography'

import s from './select.module.scss'

import { ArrowDown } from '@/assets/icons/components'

export type ShowOnPageSelectProps = {
  selectCurrent: string
  selectOptions: string[]
  onSelectChange?: (item: string) => void
  label?: string
  disabled?: boolean
  className?: string
}
export const Select: FC<ShowOnPageSelectProps> = ({
  selectCurrent,
  selectOptions,
  onSelectChange,
  label,
  disabled = false,
  className,
}) => {
  return (
    <S.Root value={selectCurrent} onValueChange={onSelectChange} disabled={disabled}>
      {label && (
        <Typography
          variant={'Body_2'}
          color={disabled ? 'var(--color-dark-300)' : 'var(--color-dark-100)'}
        >
          {label}
        </Typography>
      )}
      <S.Trigger className={clsx(s.trigger, className && s[className])}>
        <S.Value aria-label={selectCurrent}>
          <Typography variant={'Body_1'} color={disabled ? 'var(--color-dark-300)' : ''}>
            {selectCurrent}
          </Typography>
        </S.Value>
        <ArrowDown size={16} />
      </S.Trigger>
      <S.Portal>
        <S.Content className={clsx(s.content, className && s[className])} position={'popper'}>
          <S.Viewport>
            <S.Group>
              {selectOptions.map(option => (
                <SelectItem key={option} value={option} className={s.item}>
                  {option}
                </SelectItem>
              ))}
            </S.Group>
          </S.Viewport>
        </S.Content>
      </S.Portal>
    </S.Root>
  )
}

export const SelectItem = forwardRef(
  (
    { children, className, value, ...props }: SelectItemProps,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <S.Item className={clsx('SelectItem', className)} value={value} {...props} ref={forwardedRef}>
        <S.ItemText>
          <Typography variant={'Body_1'}>{children}</Typography>
        </S.ItemText>
      </S.Item>
    )
  }
)

type SelectItemProps = {
  children: ReactNode
  className?: string
  value: string
}
