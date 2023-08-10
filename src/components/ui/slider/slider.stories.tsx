import { useState } from 'react'

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
    const [value, setValue] = useState(args.defaultValue)
    const onChangeHandler = (values: [number, number]) => {
      setValue(values)
    }

    return (
      <Slider
        defaultValue={args.defaultValue}
        onChange={onChangeHandler}
        max={args.max}
        value={value}
      />
    )
  },
  args: {
    defaultValue: [2, 10],
    onChange: action('values changed'),
    max: 15,
    value: [0, 0],
  },
}
