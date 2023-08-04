import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import userPhotoDefault from '@/assets/img/userPhoto.png'
import { PersonalInfo, PersonalInfoProps } from '@/components/auth'

const meta = {
  title: 'Auth/PersonalInfo',
  component: PersonalInfo,
  tags: ['autodocs'],
} satisfies Meta<typeof PersonalInfo>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args: PersonalInfoProps) => {
    const [name, setName] = useState<string>(args.name)
    const onNameChange = (name: string) => {
      args.onNameChange(name)
      setName(name)
    }

    return (
      <PersonalInfo
        name={name}
        email={args.email}
        onLogout={args.onLogout}
        photo={args.photo}
        onNameChange={onNameChange}
        onPhotoChange={args.onPhotoChange}
      />
    )
  },
  args: {
    name: 'Ivan',
    email: 'j&johnson@gmail.com',
    photo: userPhotoDefault,
    onPhotoChange: action('Photo change'),
    onLogout: action('logout'),
    onNameChange: action('name'),
  },
}
