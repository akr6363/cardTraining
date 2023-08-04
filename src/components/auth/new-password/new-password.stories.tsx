import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { NewPassword, NewPasswordProps } from '@/components/auth'

const meta = {
  title: 'Auth/NewPassword',
  component: NewPassword,
  tags: ['autodocs'],
} satisfies Meta<typeof NewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args: NewPasswordProps) => {
    return <NewPassword onCreate={args.onCreate} />
  },
  args: {
    onCreate: action('create'),
  },
}
