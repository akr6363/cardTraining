import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import s from './button.module.scss'

import { Typography } from '@/components/ui'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  variant?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'icon'
  fullWidth?: boolean
  className?: string
  children?: ReactNode
  icon?: ReactNode
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
) => {
  const {
    variant = 'primary',
    fullWidth,
    className,
    as: Component = 'button',
    children,
    icon,
    ...rest
  } = props

  const typography = variant === 'link' ? 'Subtitle_1' : 'Subtitle_2'

  return (
    <Component className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`} {...rest}>
      {icon}
      <Typography variant={typography} className={s.text}>
        {children}
      </Typography>
    </Component>
  )
}
