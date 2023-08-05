import { action } from '@storybook/addon-actions'
import type { Meta } from '@storybook/react'
import { StoryObj } from '@storybook/react'

import { Slider, SliderProps } from '@/components/ui'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (args: SliderProps) => {
    return <Slider defaultValue={args.defaultValue} onChange={args.onChange} max={args.max} />
  },
  args: {
    defaultValue: [2, 10],
    onChange: action('values changed'),
    max: 15,
  },
}
