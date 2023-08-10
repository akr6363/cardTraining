import { FC } from 'react'

import { Delete, Edit } from '@/assets/icons/components'
import { Cell, EditBlock, Rating, Table } from '@/components/ui'
import s from '@/pages/cards/cards.module.scss'
import { CardRes } from '@/services/cards/types.ts'

type Props = {
  data: CardRes
}
export const CardsTable: FC<Props> = ({ data }) => {
  return (
    <>
      <Table columns={columns} className={s.table}>
        {data.items.map(el => {
          return (
            <tr key={el.id}>
              {el.questionImg ? <Cell img={el.questionImg}></Cell> : <Cell>{el.question}</Cell>}
              {el.answerImg ? <Cell img={el.answerImg}></Cell> : <Cell>{el.answer}</Cell>}
              <Cell>{new Date(el.updated).toLocaleDateString('en-GB')}</Cell>
              <Cell>
                <Rating value={el.grade} />
              </Cell>
              <Cell>
                <EditBlock>
                  <Edit size={16} />
                  <Delete size={16} />
                </EditBlock>
              </Cell>
            </tr>
          )
        })}
      </Table>
    </>
  )
}

const columns = [
  { title: 'Question', sortKey: 'question', width: '30%' },
  { title: 'Answer', sortKey: 'answer', width: '30%' },
  { title: 'Last Update', sortKey: 'update', width: '13%' },
  { title: 'Grade', sortKey: 'grade', width: '17%' },
  { title: '', sortKey: 'edit', width: '10%' },
]
