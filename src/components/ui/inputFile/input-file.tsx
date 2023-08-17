import { ChangeEvent, ComponentProps, forwardRef } from 'react'

import s from './input-file.module.scss'

import { Image } from '@/assets/icons/components'
import { Button, Typography } from '@/components/ui'

export type InputFileProps = {
  onSelect: (e: ChangeEvent<HTMLInputElement>) => void
  errorMessage?: string
} & ComponentProps<'input'>

export const InputFile = forwardRef<HTMLInputElement, InputFileProps>(
  ({ onChange, onSelect, errorMessage, ...rest }, ref) => {
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e)
      }
      onSelect(e)
    }

    return (
      <div className={s.root}>
        <input type="file" hidden ref={ref} {...rest} id={'cover'} onChange={handleFileChange} />
        <label htmlFor={'cover'}>
          <Button variant={'secondary'} fullWidth={true} icon={<Image />} as={'span'}>
            Change Cover
          </Button>
        </label>
        <div className={s.errorContainer}>
          {errorMessage && (
            <Typography variant={'Caption'} className={s.error}>
              {errorMessage}
            </Typography>
          )}
        </div>
      </div>
    )
  }
)
