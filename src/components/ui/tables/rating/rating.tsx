import { FC } from 'react'

import { Star, StarOutline } from '@/assets/icons/components'
type EditBlockProps = {
  value: number
}
export const Rating: FC<EditBlockProps> = ({ value }) => {
  const starArr = []

  for (let i = 0; i < 5; i++) {
    let star = <Star color={'var(--color-warning-300)'} key={i} />

    if (value - 1 < i) star = <StarOutline color={'var(--color-warning-300)'} key={i} />
    starArr.push(star)
  }

  return <div>{starArr}</div>
}
