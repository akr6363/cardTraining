import s from './table-data-preloader.module.scss'

import { Preloader } from '@/components/common/preloader/preloader.tsx'

export const TableDataPreloader = () => {
  return (
    <tr className={s.loadingCover}>
      <td>
        <Preloader />
      </td>
    </tr>
  )
}
