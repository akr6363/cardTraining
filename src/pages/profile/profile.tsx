import { useNavigate } from 'react-router-dom'

import { ArrowBackLong } from '@/assets/icons/components/ArrowBackLong.tsx'
import { PersonalInfo } from '@/components/auth'
import { Button } from '@/components/ui'
import {
  useAuthMeQuery,
  useLogoutMutation,
  useUpdateUserDataMutation,
} from '@/services/auth/auth-api.ts'

export const ProfilePage = () => {
  const navigate = useNavigate()

  const { data, isLoading } = useAuthMeQuery()

  if (isLoading) return <div>Loading...</div>
  const [logout] = useLogoutMutation()
  const [updateUserData] = useUpdateUserDataMutation()

  const onLogoutHandler = () => {
    logout()
  }

  const onPhotoChange = (photo: File) => {
    updateUserData({ avatar: photo })
  }

  const onNameChange = (name: string) => {
    updateUserData({ name })
  }

  return data ? (
    <>
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
      <PersonalInfo
        name={data.name}
        photo={data.avatar}
        email={data.email}
        onPhotoChange={onPhotoChange}
        onNameChange={onNameChange}
        onLogout={onLogoutHandler}
      />
    </>
  ) : null
}
