import { useController, UseControllerProps, FieldValues } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/components/ui'

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'checked' | 'onValueChange' | 'id'>

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  rules,
  shouldUnregister,
  ...checkboxProps
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

  return <Checkbox {...checkboxProps} id={name} checked={value} onValueChange={onChange} />
}
