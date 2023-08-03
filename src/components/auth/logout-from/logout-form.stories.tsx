import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { LogoutForm, LogoutFormProps } from '@/components/auth/logout-from/logout-form.tsx'

const meta = {
  title: 'Auth/LogoutForm',
  component: LogoutForm,
  tags: ['autodocs'],
} satisfies Meta<typeof LogoutForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args: LogoutFormProps) => {
    return <LogoutForm onLogout={args.onLogout} />
  },
  args: {
    onLogout: action('logout'),
  },
}
