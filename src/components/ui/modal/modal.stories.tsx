import { useState } from 'react'

import { action } from '@storybook/addon-actions'
import type { Meta, StoryObj } from '@storybook/react'

import { Modal, ModalProps } from '@/components/ui'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args: ModalProps) => {
    const [isOpen, setIsOpen] = useState(args.isOpen)
    const onCloseHandler = () => {
      setIsOpen(false)
      args.onClose
    }

    return (
      <>
        <button onClick={() => setIsOpen(true)}>open</button>
        <Modal isOpen={isOpen} onClose={onCloseHandler} title={args.title}>
          <div>dsf</div>
        </Modal>
      </>
    )
  },
  args: {
    title: 'Add New Pack',
    onClose: action('close'),
    isOpen: false,
  },
}
