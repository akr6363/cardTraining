import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { LoginForm, LoginFormProps } from './login-form'

const meta = {
  title: 'Auth/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args: LoginFormProps) => {
    return <LoginForm onLogin={args.onLogin} />
  },
  args: {
    onLogin: action('login'),
  },
}
