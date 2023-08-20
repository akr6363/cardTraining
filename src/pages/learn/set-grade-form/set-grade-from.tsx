import { FC } from 'react'

import { useForm } from 'react-hook-form'

import s from './set-grade-from.module.scss'

import { Button } from '@/components/ui'
import { ControlledRadioGroup } from '@/components/ui/controlled/conrolled-radio-group/controlled-radio-group.tsx'
import { RadioItemType } from '@/components/ui/radio-group'

export type GradeFormValues = {
  rate: string
}

export type SetGradeFormProps = {
  onSetGrade: (data: GradeFormValues) => void
  defaultValue?: string
}

export const SetGradeForm: FC<SetGradeFormProps> = ({ onSetGrade, defaultValue }) => {
  const { handleSubmit, control } = useForm<GradeFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      rate: defaultValue,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSetGrade)} className={s.form}>
      <ControlledRadioGroup
        items={gradeItems}
        control={control}
        name={'rate'}
        className={s.radio}
      />
      <Button variant={'primary'} fullWidth={true}>
        Next Question
      </Button>
    </form>
  )
}
const gradeItems: RadioItemType[] = [
  { label: 'Did not know', value: '1' },
  { label: 'Forgot', value: '2' },
  { label: 'A lot of thought', value: '3' },
  { label: 'Confused', value: '4' },
  { label: 'Knew the answer', value: '5' },
]
