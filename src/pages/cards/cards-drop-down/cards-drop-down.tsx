import s from './cards-drop-down.module.scss'

import { Delete, Edit, Learn, More } from '@/assets/icons/components'
import { DropDown, DropDownItem } from '@/components/ui'

const CardsDropDown = () => {
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
}

export default CardsDropDown
