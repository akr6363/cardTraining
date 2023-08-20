import { FC, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'

import s from './learn.module.scss'

import { ArrowBackLong } from '@/assets/icons/components/ArrowBackLong.tsx'
import { Button, Card, ControlledCheckbox, ControlledTextField, Typography } from '@/components/ui'
import { RadioGroup, RadioItemType } from '@/components/ui/radio-group'
import {
  GradeFormValues,
  SetGradeForm,
  setGradeForm,
} from '@/pages/learn/set-grade-form/set-grade-from.tsx'
import { useGetRandomCardQuery } from '@/services/cards/cards-api.ts'
import { useGetDecksByIdQuery } from '@/services/decks/decks-api.ts'

type LearnCardProps = {}

export const LearnPage: FC<LearnCardProps> = () => {
  const params = useParams()
  const navigate = useNavigate()

  if (!params.id) return null
  const id = params.id
  const { data, refetch } = useGetRandomCardQuery({ deckId: id })
  const { data: deck } = useGetDecksByIdQuery({
    id,
  })

  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false)

  const onShowAnswer = () => {
    setIsShowAnswer(true)
  }

  // const onRate = (value: string) => {
  //   console.log(value)
  // }

  const onSetGrade = (data: GradeFormValues) => {
    // refetch()
    console.log(data)
    // setIsShowAnswer(false)
  }

  return data && deck ? (
    <>
      <Button
        onClick={() => {
          navigate(-1)
        }}
        variant={'link'}
        style={{ alignSelf: 'start' }}
        icon={<ArrowBackLong size={16} color={'var(--color-accent-500)'} />}
      >
        Back
      </Button>

      <Card title={`Learn ${deck.name}`} className={s.card}>
        <div className={s.question}>
          <Typography variant={'Subtitle_1'}>Question:</Typography>
          <Typography variant={'Body_1'}>{data.question}</Typography>
        </div>
        {data.questionImg && (
          <div className={s.img}>
            <img src={data.questionImg} alt="Preview" />
          </div>
        )}
        {isShowAnswer && (
          <>
            <div className={s.question}>
              <Typography variant={'Subtitle_1'}>Answer: </Typography>
              <Typography variant={'Body_1'}>{data.answer}</Typography>
            </div>
            {data.answerImg && (
              <div className={s.img}>
                <img src={data.answerImg} alt="Preview" />
              </div>
            )}
            <SetGradeForm
              onSetGrade={onSetGrade}
              defaultValue={data.grade ? data.grade.toString() : '1'}
            />
          </>
        )}
        {!isShowAnswer && (
          <Button variant={'primary'} fullWidth={true} onClick={onShowAnswer}>
            Show Answer
          </Button>
        )}
      </Card>
    </>
  ) : null
}
