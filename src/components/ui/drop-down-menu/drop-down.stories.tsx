import type { Meta } from '@storybook/react'

import s from './drop-down.module.scss'
import { DropDown, DropDownItem } from './drop-down.tsx'

import { Delete, Edit, Learn, LogOut, More, User } from '@/assets/icons/components'
import { DropDownUserInfo, UserPhotoContainer } from '@/components/ui'
const meta = {
  title: 'Components/DropDownMenu',
  component: DropDown,
  tags: ['autodocs'],
} satisfies Meta<typeof DropDown>

export default meta
//type Story = StoryObj<typeof meta>

export const Header = {
  render: () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <DropDown
          trigger={
            <button className={s.triggerBtn}>
              <UserPhotoContainer />
            </button>
          }
          sideOffset={12}
          alignOffset={-6}
        >
          <DropDownUserInfo email={'j&johnson@gmail.com'} name={'Ivan'}></DropDownUserInfo>

          <DropDownItem icon={<User size={16} />}>My Profile</DropDownItem>
          <DropDownItem icon={<LogOut size={16} />}>Sign Out</DropDownItem>
        </DropDown>
      </div>
    )
  },
}
export const Pack = {
  render: () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <DropDown
          trigger={
            <button className={s.triggerBtn}>
              <More />
            </button>
          }
          alignOffset={-9}
          sideOffset={6}
        >
          <DropDownItem icon={<Learn size={16} />}>Learn</DropDownItem>
          <DropDownItem icon={<Edit size={16} />}>Edit</DropDownItem>
          <DropDownItem icon={<Delete size={16} />}>Delete</DropDownItem>
        </DropDown>
      </div>
    )
  },
}
