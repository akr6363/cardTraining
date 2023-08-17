import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { SignUp, SignUpProps } from '@/components/auth/sign-up/sign-up.tsx'

const meta = {
  title: 'Auth/SignUp',
  component: SignUp,
  tags: ['autodocs'],
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args: SignUpProps) => {
    return <SignUp onLogout={args.onLogout} />
  },
  args: {
    onLogout: action('logout'),
  },
}
