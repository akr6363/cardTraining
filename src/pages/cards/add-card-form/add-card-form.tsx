import { FC, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './add-card-form.module.scss'

import { imgValidation } from '@/common/zodSchems.ts'
import { Button, ControlledTextField } from '@/components/ui'
import { InputFileWithPreview } from '@/components/ui/inputFile/input-file-with-preview.tsx'

const logoutSchema = z.object({
  question: z.string().nonempty('The field is required').min(3),
  answer: z.string().nonempty('The field is required'),
  questionImg: imgValidation,
  answerImg: imgValidation,
})

export type AddCardFormValues = z.infer<typeof logoutSchema>

export type AddCardFormProps = {
  onAdd: (data: AddCardFormValues) => void
  defaultValue?: AddCardFormValues
  isEdit?: boolean
}

export const AddCardForm: FC<AddCardFormProps> = ({ onAdd, defaultValue, isEdit = false }) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddCardFormValues>({
    resolver: zodResolver(logoutSchema),
    mode: 'onSubmit',
    defaultValues: {
      question: '',
      answer: '',
      questionImg: defaultValue?.questionImg,
      answerImg: defaultValue?.answerImg,
    },
  })

  useEffect(() => {
    if (defaultValue) {
      setValue('question', defaultValue.question)
      setValue('answer', defaultValue.answer)
    }
  }, [])

  const onSubmit = (data: AddCardFormValues) => {
    onAdd(data)
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
      <InputFileWithPreview
        defaultValue={defaultValue?.questionImg}
        id={'question-img'}
        {...register('questionImg')}
        errorMessage={errors.questionImg?.message?.toString()}
      />
      <ControlledTextField
        control={control}
        name={'answer'}
        label={'Answer'}
        errorMessage={errors.question?.message}
        className={s.inputAnsw}
      />
      <InputFileWithPreview
        defaultValue={defaultValue?.answerImg}
        id={'answer-img'}
        {...register('answerImg')}
        errorMessage={errors.answerImg?.message?.toString()}
      />
      <Button type="submit" className={s.addBtn}>
        {isEdit ? 'Save Changes ' : 'Add New Card'}
      </Button>
    </form>
  )
}
