import { FC, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './add-card-form.module.scss'

import { errorMessagesType } from '@/common/utilis/errorHandler.tsx'
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
type FieldNames = keyof AddCardFormValues

export type AddCardFormProps = {
  onAdd: (data: AddCardFormValues) => void
  defaultValue?: AddCardFormValues
  isEdit?: boolean
  isFetching?: boolean
  errorsMessages?: errorMessagesType[]
}

export const AddCardForm: FC<AddCardFormProps> = ({
  onAdd,
  defaultValue,
  isEdit = false,
  isFetching,
  errorsMessages,
}) => {
  const {
    setError,
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

  console.log(errorsMessages)

  useEffect(() => {
    console.log(errorsMessages)
    if (errorsMessages) {
      errorsMessages.forEach(e => {
        console.log(e)
        setError(e.field as FieldNames, { type: 'custom', message: e.message })
      })
    }
  }, [errorsMessages])

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
        errorMessage={errors.answer?.message}
        className={s.inputAnsw}
      />
      <InputFileWithPreview
        defaultValue={defaultValue?.answerImg}
        id={'answer-img'}
        {...register('answerImg')}
        errorMessage={errors.answerImg?.message?.toString()}
      />
      <Button type="submit" className={s.addBtn} isFetching={isFetching}>
        {isEdit ? 'Save Changes ' : 'Add New Card'}
      </Button>
    </form>
  )
}
