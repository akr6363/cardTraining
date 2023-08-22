import { FC, ReactNode } from 'react'

import { PreloaderCircle } from '@/components/common/preloader/preloader.tsx'

type Props = {
  isFetching: boolean
  children: ReactNode
}
export const WithIconPreloader: FC<Props> = ({ isFetching, children }) => {
  return isFetching ? <PreloaderCircle /> : <>{children}</>
}
