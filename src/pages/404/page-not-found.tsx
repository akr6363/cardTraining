import { NavLink } from 'react-router-dom'

import NotFoundImg from '../../assets/img/404.svg'

import { EmptyPage } from '@/components/common/empty-page/empty-page.tsx'
import { Button, Typography } from '@/components/ui'
export const PageNotFound = () => {
  return (
    <EmptyPage>
      <div>
        <img src={NotFoundImg} alt="" />
      </div>
      <Typography variant={'Body_1'}>Sorry! Page not found!</Typography>
      <Button variant={'primary'} as={NavLink} to={'/'}>
        Back to home page
      </Button>
    </EmptyPage>
  )
}
