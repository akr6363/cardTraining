import { action } from '@storybook/addon-actions'
import type { Meta } from '@storybook/react'
import { StoryObj } from '@storybook/react'

import { Rating } from './rating/rating.tsx'

import { Cell, Table, TableProps } from './'

import { Delete, Edit, Learn } from '@/assets/icons/components'
import { EditBlock } from '@/components/ui'

const meta = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const columnsPacks = [
  { title: 'Name', sortKey: 'name', width: '26%' },
  { title: 'Cards', sortKey: 'cards', width: '14%' },
  { title: 'Last Update', sortKey: 'update', width: '20%' },
  { title: 'Created by', sortKey: 'author', width: '29%' },
  { title: '', sortKey: 'edit', width: '11%' },
]
const columnsCards = [
  { title: 'Question', sortKey: 'question', width: '30%' },
  { title: 'Answer', sortKey: 'answer', width: '30%' },
  { title: 'Last Update', sortKey: 'update', width: '13%' },
  { title: 'Grade', sortKey: 'grade', width: '17%' },
  { title: '', sortKey: 'edit', width: '10%' },
]

export const Example1: Story = {
  render: (args: TableProps) => {
    return (
      <Table
        columns={args.columns}
        onSort={args.onSort}
        sortDirection={args.sortDirection}
        sortName={args.sortName}
      >
        {dataPacks.map(el => {
          return (
            <tr key={el.id}>
              <Cell img={el.img}>{el.title}</Cell>
              <Cell>{el.cardsCount}</Cell>
              <Cell>{el.updated}</Cell>
              <Cell>{el.createdBy}</Cell>
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
  },
  args: {
    columns: columnsPacks,
    onSort: action('onSort'),
    sortDirection: '',
    sortName: '',
  },
}

export const Example2: Story = {
  render: (args: TableProps) => {
    return (
      <Table
        columns={args.columns}
        onSort={args.onSort}
        sortDirection={args.sortDirection}
        sortName={args.sortName}
      >
        {dataCards.map(el => {
          return (
            <tr key={el.id}>
              {el.questionImg ? <Cell img={el.questionImg}></Cell> : <Cell>{el.question}</Cell>}
              {el.answerImg ? <Cell img={el.answerImg}></Cell> : <Cell>{el.answer}</Cell>}
              <Cell>{el.updated}</Cell>
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
    )
  },
  args: {
    columns: columnsCards,
    onSort: action('onSort'),
    sortDirection: '',
    sortName: '',
  },
}

const dataPacks = [
  {
    id: 1,
    title: 'Project A',
    cardsCount: 10,
    updated: '2023-07-07',
    createdBy: 'John Doe',
    img: 'https://i2.wp.com/miro.medium.com/1*yjH3SiDaVWtpBX0g_2q68g.png',
  },
  {
    id: 2,
    title: 'Project B',
    cardsCount: 5,
    updated: '2023-07-06',
    createdBy: 'Jane Smith',
  },
  {
    id: 3,
    title: 'Project C',
    cardsCount: 8,
    updated: '2023-07-05',
    createdBy: 'Alice Johnson',
  },
  {
    id: 4,
    title: 'Project D',
    cardsCount: 3,
    updated: '2023-07-07',
    createdBy: 'Bob Anderson',
  },
  {
    id: 5,
    title: 'Project E',
    cardsCount: 12,
    updated: '2023-07-04',
    createdBy: 'Emma Davis',
  },
]

const dataCards = [
  {
    id: 1,
    question: 'https://belajarreactjs.com/wp-content/uploads/2019/09/reactjs_1.jpg',
    questionImg: 'https://belajarreactjs.com/wp-content/uploads/2019/09/reactjs_1.jpg',
    answer: 'https://belajarreactjs.com/wp-content/uploads/2019/09/reactjs_1.jpg',
    answerImg: 'https://belajarreactjs.com/wp-content/uploads/2019/09/reactjs_1.jpg',
    updated: '2023-07-07',
    grade: 4,
  },
  {
    id: 2,
    question: 'How "This" works in JavaScript?',
    answer: 'This is how "This" works in JavaScript',
    updated: '2023-07-07',
    grade: 5,
  },
  {
    id: 3,
    question: 'How "This" works in JavaScript?',
    answer: 'This is how "This" works in JavaScript',
    updated: '2023-07-07',
    grade: 3,
  },
  {
    id: 4,
    question: 'How "This" works in JavaScript?',
    answer: 'This is how "This" works in JavaScript',
    updated: '2023-07-07',
    grade: 5,
  },
  {
    id: 5,
    question: 'How "This" works in JavaScript?',
    answer: 'This is how "This" works in JavaScript',
    updated: '2023-07-07',
    grade: 5,
  },
]
