import { ChangeEvent, FC, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import s from './add-card-form.module.scss'

import { imgValidation } from '@/common/zodSchems.ts'
import { Button, ControlledTextField } from '@/components/ui'
import { InputFile } from '@/components/ui/inputFile/input-file.tsx'

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
  const [selectedAnswerImg, setSelectedAnswerImg] = useState<File | null>(null)
  const [selectedQuestionImg, setSelectedQuestionImg] = useState<File | null>(null)

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
      setValue('questionImg', defaultValue.questionImg)
      setValue('answerImg', defaultValue.answerImg)
    }
  }, [])

  const onSubmit = (data: AddCardFormValues) => {
    onAdd(data)
  }

  const onAnswerImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    let file: File | null = null

    if (e.target.files) {
      file = e.target.files[0]
    }
    setSelectedAnswerImg(file)
  }
  const onQuestionImgChange = (e: ChangeEvent<HTMLInputElement>) => {
    let file: File | null = null

    if (e.target.files) {
      file = e.target.files[0]
    }
    setSelectedQuestionImg(file)
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
      {selectedQuestionImg && (
        <div className={s.coverPreview}>
          <img src={URL.createObjectURL(selectedQuestionImg)} alt="Preview" />
        </div>
      )}
      {!selectedQuestionImg && defaultValue?.questionImg && (
        <div className={s.coverPreview}>
          <img src={defaultValue?.questionImg} alt="Preview" />
        </div>
      )}
      <InputFile
        id={'question-img'}
        {...register('questionImg')}
        onSelect={onQuestionImgChange}
        errorMessage={errors.questionImg?.message?.toString()}
      />
      <ControlledTextField
        control={control}
        name={'answer'}
        label={'Answer'}
        errorMessage={errors.question?.message}
        className={s.inputAnsw}
      />
      {selectedAnswerImg && (
        <div className={s.coverPreview}>
          <img src={URL.createObjectURL(selectedAnswerImg)} alt="Preview" />
        </div>
      )}
      {!selectedAnswerImg && defaultValue?.answerImg && (
        <div className={s.coverPreview}>
          <img src={defaultValue?.answerImg} alt="Preview" />
        </div>
      )}
      <InputFile
        {...register('answerImg')}
        id={'answer-img'}
        onSelect={onAnswerImgChange}
        errorMessage={errors.answerImg?.message?.toString()}
      />
      <Button type="submit" className={s.addBtn}>
        {isEdit ? 'Save Changes ' : 'Add New Card'}
      </Button>
    </form>
  )
}
