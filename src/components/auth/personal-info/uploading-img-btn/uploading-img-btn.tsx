import { ChangeEvent, useRef } from 'react'

import { Photo } from '@/assets/icons/components'
import s from '@/components/auth/personal-info/personal-info.module.scss'
import { Button } from '@/components/ui'

type Props = {
  onChange(e: ChangeEvent<HTMLInputElement>): void
}

export const UploadingImagesBtn: React.FC<Props> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  return (
    <>
      <input type="file" onChange={onChange} style={{ display: 'none' }} ref={inputRef} />
      <Button
        variant={'secondary'}
        onClick={handleClick}
        icon={<Photo size={16} />}
        className={s.editPhotoBtn}
      />
    </>
  )
}
