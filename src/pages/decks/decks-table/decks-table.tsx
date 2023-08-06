import { FC } from 'react'

import { Delete, Edit, Learn } from '@/assets/icons/components'
import { Cell, EditBlock, Table } from '@/components/ui'
import s from '@/pages/decks/decks.module.scss'
import { DecksRes } from '@/services/decks/types.ts'

const columns = [
  { title: 'Name', sortKey: 'name', width: '26%' },
  { title: 'Cards', sortKey: 'cards', width: '14%' },
  { title: 'Last Update', sortKey: 'update', width: '20%' },
  { title: 'Created by', sortKey: 'author', width: '29%' },
  { title: '', sortKey: 'edit', width: '11%' },
]

type Props = {
  data: DecksRes
}
const DecksTable: FC<Props> = ({ data }) => {
  return (
    <Table columns={columns} className={s.table}>
      {data.items.map(el => {
        return (
          <tr key={el.id}>
            <Cell>{el.name}</Cell>
            <Cell>{el.cardsCount}</Cell>
            <Cell>{new Date(el.updated).toLocaleString('en-GB')}</Cell>
            <Cell>{el.author.name}</Cell>
            <Cell>
              <EditBlock>
                <Learn size={16} />
                <Edit size={16} />
                <Delete size={16} />
              </EditBlock>
            </Cell>
          </tr>
        )
      })}
    </Table>
  )
}

export default DecksTable
