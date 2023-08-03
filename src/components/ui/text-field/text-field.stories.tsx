import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from './'

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'input',
    placeholder: 'input',
    disabled: false,
    errorMessage: '',
  },
}
export const Error: Story = {
  args: {
    label: 'input',
    errorMessage: 'Error',
    placeholder: 'input',
    disabled: false,
  },
}
export const Disabled: Story = {
  args: {
    label: 'input',
    disabled: true,
    placeholder: 'input',
    errorMessage: '',
  },
}

export const Password: Story = {
  args: {
    label: 'input',
    placeholder: 'input',
    password: true,
    disabled: false,
    errorMessage: '',
  },
}
export const Search = {
  render: (args: any) => {
    const [text, setText] = useState('')

    return (
      <>
        <TextField
          search={args.search}
          value={text}
          onChange={e => setText(e.currentTarget.value)}
          onClearClick={() => setText('')}
          placeholder={args.placeholder}
          disabled={args.disabled}
          errorMessage={args.errorMessage}
        />
      </>
    )
  },
  args: {
    placeholder: 'Search...',
    search: true,
    disabled: false,
    errorMessage: '',
  },
}
