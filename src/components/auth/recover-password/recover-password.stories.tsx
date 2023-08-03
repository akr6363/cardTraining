import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { RecoverPassword, RecoverPasswordProps } from '@/components/auth'

const meta = {
  title: 'Auth/RecoverPassword',
  component: RecoverPassword,
  tags: ['autodocs'],
} satisfies Meta<typeof RecoverPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args: RecoverPasswordProps) => {
    return <RecoverPassword onSend={args.onSend} />
  },
  args: {
    onSend: action('send'),
  },
}
