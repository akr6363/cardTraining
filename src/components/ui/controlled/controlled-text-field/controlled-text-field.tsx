import { useController, UseControllerProps, FieldValues } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/components/ui'

type Props<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextFieldProps, 'value' | 'onChange' | 'id'>

export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  defaultValue,
  rules,
  shouldUnregister,
  ...textFieldProps
}: Props<T>) => {
  const {
    field: { value, onChange, onBlur },
  } = useController({
    control,
    name,
    defaultValue,
    rules,
    shouldUnregister,
  })

  return (
    <TextField {...textFieldProps} id={name} value={value} onChange={onChange} onBlur={onBlur} />
  )
}
