import type { Meta, StoryObj } from '@storybook/react'

import { CheckEmail, CheckEmailProps } from '@/components/auth'

const meta = {
  title: 'Auth/CheckEmail',
  component: CheckEmail,
  tags: ['autodocs'],
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args: CheckEmailProps) => {
    return <CheckEmail email={args.email} />
  },
  args: {
    email: 'example@mail.com',
  },
}
