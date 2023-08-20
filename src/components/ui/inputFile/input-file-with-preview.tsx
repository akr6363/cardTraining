import { ChangeEvent, ComponentProps, forwardRef, useState } from 'react'

import s from './input-file.module.scss'

import { Image } from '@/assets/icons/components'
import { Button, Typography } from '@/components/ui'

export type InputFileProps = {
  errorMessage?: string
  id: string
  defaultValue: string
} & ComponentProps<'input'>

export const InputFileWithPreview = forwardRef<HTMLInputElement, InputFileProps>(
  ({ onChange, errorMessage, defaultValue, id, ...rest }, ref) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      let file: File | null = null

      if (e.target.files) {
        file = e.target.files[0]
      }
      setSelectedFile(file)
      if (onChange) {
        onChange(e)
      }
    }

    return (
      <div className={s.root}>
        {selectedFile && (
          <div className={s.coverPreview}>
            <img src={URL.createObjectURL(selectedFile)} alt="Preview" />
          </div>
        )}
        {!selectedFile && defaultValue && (
          <div className={s.coverPreview}>
            <img src={defaultValue} alt="Preview" />
          </div>
        )}
        <input type="file" hidden ref={ref} {...rest} id={id} onChange={handleFileChange} />
        <label htmlFor={id}>
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
