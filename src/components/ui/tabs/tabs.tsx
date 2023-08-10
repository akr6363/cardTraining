import { FC, ReactNode } from 'react'

import * as T from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

import { Typography } from '@/components/ui'
export type TabType = {
  value: string
  title: string
  disabled?: boolean
}

export type TabsProps = {
  tabs: TabType[]
  defaultValue?: string
  children?: ReactNode
  onValueChange?: (value: string) => void
  title?: string
  value?: string
}

export const Tabs: FC<TabsProps> = ({
  tabs,
  defaultValue,
  children,
  onValueChange,
  title,
  value,
}) => {
  return (
    <div>
      <Typography variant={'Body_2'} className={s.title}>
        {title}
      </Typography>
      <T.Root
        className={s.root}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        value={value}
      >
        <T.List className={s.list}>
          {tabs.map(t => (
            <T.Trigger className={s.trigger} value={t.value} key={t.value} disabled={t.disabled}>
              <Typography variant={'Body_1'} className={s.triggerTitle}>
                {t.title}
              </Typography>
            </T.Trigger>
          ))}
        </T.List>
        {children}
      </T.Root>
    </div>
  )
}

export type TabContentProps = {
  value: string
  children: ReactNode
}

export const TabContent: FC<TabContentProps> = ({ value, children }) => {
  return (
    <T.Content className={s.content} value={value}>
      {children}
    </T.Content>
  )
}
