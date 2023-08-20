import { FC, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import s from './learn.module.scss'

import { ArrowBackLong } from '@/assets/icons/components/ArrowBackLong.tsx'
import { Button, Card, Typography } from '@/components/ui'
import { GradeFormValues, SetGradeForm } from '@/pages/learn/set-grade-form/set-grade-from.tsx'
import { useGetRandomCardQuery, useSaveGradeMutation } from '@/services/cards/cards-api.ts'
import { useGetDecksByIdQuery } from '@/services/decks/decks-api.ts'

type LearnCardProps = {}

export const LearnPage: FC<LearnCardProps> = () => {
  const params = useParams()
  const navigate = useNavigate()

  if (!params.id) return null
  const id = params.id
  const { data: cardData, refetch } = useGetRandomCardQuery({ deckId: id })
  const { data: deck } = useGetDecksByIdQuery({
    id,
  })

  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false)

  const onShowAnswer = () => {
    setIsShowAnswer(true)
  }

  const [saveGrade] = useSaveGradeMutation()
  const onSetGrade = (data: GradeFormValues) => {
    saveGrade({ deckId: id, cardId: cardData!.id, grade: Number(data.rate) })
    setIsShowAnswer(false)
    refetch()
  }

  return cardData && deck ? (
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
          <Typography variant={'Body_1'}>{cardData.question}</Typography>
        </div>
        {cardData.questionImg && (
          <div className={s.img}>
            <img src={cardData.questionImg} alt="Preview" />
          </div>
        )}
        {isShowAnswer && (
          <>
            <div className={s.question}>
              <Typography variant={'Subtitle_1'}>Answer: </Typography>
              <Typography variant={'Body_1'}>{cardData.answer}</Typography>
            </div>
            {cardData.answerImg && (
              <div className={s.img}>
                <img src={cardData.answerImg} alt="Preview" />
              </div>
            )}
            <Typography variant={'Subtitle_1'} className={s.rateLabel}>
              Rate yourself:
            </Typography>
            <SetGradeForm
              onSetGrade={onSetGrade}
              defaultValue={cardData.grade ? cardData.grade.toString() : '1'}
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
