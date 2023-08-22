import { PersonalInfo } from '@/components/auth'
import { BackBtn } from '@/components/common/back-btn/back-btn.tsx'
import {
  useAuthMeQuery,
  useLogoutMutation,
  useUpdateUserDataMutation,
} from '@/services/auth/auth-api.ts'

export const ProfilePage = () => {
  const { data } = useAuthMeQuery()

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
      <BackBtn />
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
