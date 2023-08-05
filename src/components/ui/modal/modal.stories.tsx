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
  render: (args: ModalProps) => (
    <Modal>
      <div>dsf</div>
    </Modal>
  ),
  args: {},
}
