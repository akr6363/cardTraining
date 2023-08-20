import { useNavigate } from 'react-router-dom'

import { ArrowBackLong } from '@/assets/icons/components/ArrowBackLong.tsx'
import { Button } from '@/components/ui'

export const BackBtn = () => {
  const navigate = useNavigate()

  return (
    <Button
      onClick={() => {
        navigate(-1)
      }}
      variant={'link'}
      style={{ alignSelf: 'start' }}
      icon={<ArrowBackLong size={16} color={'var(--color-accent-500)'} />}
    >
      Back
    </Button>
  )
}
