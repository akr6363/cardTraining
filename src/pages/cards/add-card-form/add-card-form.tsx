import { FC, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './add-card-form.module.scss'

import { cover } from '@/common/zodSchems.ts'
import { Button, ControlledTextField } from '@/components/ui'

const logoutSchema = z
  .object({
    question: z.string().nonempty('The field is required').min(3),
    answer: z.string().nonempty('The field is required'),
  })
  .merge(cover)

type FormValues = z.infer<typeof logoutSchema>

export type AddCardFormProps = {
  onAdd: (question: string, answer: string) => void
  defaultValue?: FormValues
  isEdit?: boolean
}

export const AddCardForm: FC<AddCardFormProps> = ({ onAdd, defaultValue, isEdit = false }) => {
  const {
    // register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(logoutSchema),
    mode: 'onSubmit',
    defaultValues: { question: '', answer: '' },
  })

  useEffect(() => {
    if (defaultValue) {
      setValue('question', defaultValue.question)
      setValue('answer', defaultValue.answer)
    }
  }, [])

  const onSubmit = (data: FormValues) => {
    onAdd(data.question, data.answer)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      <ControlledTextField
        control={control}
        name={'question'}
        label={'Question'}
        errorMessage={errors.question?.message}
        className={s.inputName}
      />

      {/*<input type="file" {...register('questionImg')} />*/}
      {/*{errors.questionImg?.message}*/}

      <ControlledTextField
        control={control}
        name={'answer'}
        label={'Answer'}
        errorMessage={errors.question?.message}
        className={s.inputAnsw}
      />
      <Button type="submit" className={s.addBtn}>
        {isEdit ? 'Save Changes ' : 'Add New Card'}
      </Button>
    </form>
  )
}
