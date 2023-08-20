import { useController, UseControllerProps, FieldValues } from 'react-hook-form'

import { CheckboxProps } from '@/components/ui'
import { RadioGroup, RadioItemType } from '@/components/ui/radio-group'

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'value' | 'onChange' | 'id'> & { items: RadioItemType[] }

export const ControlledRadioGroup = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  rules,
  shouldUnregister,
  ...radioGroupProps
}: Props<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
    defaultValue,
    rules,
    shouldUnregister,
  })

  return (
    <RadioGroup
      {...radioGroupProps}
      id={name}
      defaultValue={value}
      value={value}
      onChange={onChange}
    />
  )
}
