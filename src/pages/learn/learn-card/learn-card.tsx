import { FC, useState } from 'react'

import { useParams } from 'react-router-dom'

import s from './learn-card.module.scss'

import { Button, Card, Typography } from '@/components/ui'
import { RadioGroup, RadioItemType } from '@/components/ui/radio-group'
import { useGetRandomCardQuery } from '@/services/cards/cards-api.ts'
import { useGetDecksByIdQuery } from '@/services/decks/decks-api.ts'

type LearnCardProps = {}

export const LearnPage: FC<LearnCardProps> = () => {
  const params = useParams()

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

  const onRate = (value: string) => {
    console.log(value)
  }

  const onNextQuestion = () => {
    refetch()
    setIsShowAnswer(false)
  }

  return data && deck ? (
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

          <RadioGroup items={gradeItems} defaultValue={'1'} onChange={onRate} className={s.rate} />
        </>
      )}

      {isShowAnswer ? (
        <Button variant={'primary'} fullWidth={true} onClick={onNextQuestion}>
          Next Question
        </Button>
      ) : (
        <Button variant={'primary'} fullWidth={true} onClick={onShowAnswer}>
          Show Answer
        </Button>
      )}
    </Card>
  ) : null
}

const gradeItems: RadioItemType[] = [
  { label: 'Did not know', value: '1' },
  { label: 'Forgot', value: '2' },
  { label: 'A lot of thought', value: '3' },
  { label: 'Confused', value: '4' },
  { label: 'Knew the answer', value: '5' },
]
