import { useCallback, useMemo } from 'react'

type PaginationRange = (number | '...')[]

type ParamType = {
  count: number
  siblings?: number
  page: number
  onChange: (pageNumber: number) => void
}

const DOTS = '...'

export const usePagination = ({ siblings = 1, count, page, onChange }: ParamType) => {
  const paginationRange = useMemo(() => {
    // кол-во отображаемых элементов пагинации: sibling*2 + firstPage + lastPage + page.tsx + 2*dots
    const totalPageNumbers = siblings * 2 + 5

    // 1: если totalPageNumbers больше общего числа страниц возвращаем массив от 1 до totalPageCount
    if (totalPageNumbers >= count) {
      return range(1, count)
    }

    // точки слева появялются при условии что кол-во элементов пагинации до текующей страницы больше firstPage + dots + siblings
    const shouldShowLeftDots = page - 1 > 2 + siblings // не должны показыватся
    // точки справа появялются при условии что кол-во элементов пагинации после текующей страницы больше lastPage + dots + siblings
    const shouldShowRightDots = count - page > 2 + siblings // не должны показыватся

    const firstPageIndex = 1
    const lastPageIndex = count

    //  2: Показываются только правые точки
    if (!shouldShowLeftDots && shouldShowRightDots) {
      // кол-во страниц до точек = totalPageNumbers - dots - lastPage
      let leftItemCount = totalPageNumbers - 2
      let leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, lastPageIndex]
    }

    //  3: Показываются только левые точки
    if (shouldShowLeftDots && !shouldShowRightDots) {
      // кол-во страниц после точек = totalPageNumbers - dots - lastPage
      let rightItemCount = totalPageNumbers - 2
      let rightRange = range(count - rightItemCount + 1, count)

      return [firstPageIndex, DOTS, ...rightRange]
    }

    //  4: Показываются точки слева и справа
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(page - siblings, page + siblings)

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [siblings, page, count]) as PaginationRange

  const handleNextPageClicked = useCallback(() => {
    onChange(page + 1)
  }, [page, onChange])

  const handlePreviousPageClicked = useCallback(() => {
    onChange(page - 1)
  }, [page, onChange])

  const handleMainPageClicked = useCallback(
    (pageNumber: number) => {
      onChange(pageNumber)
    },
    [onChange]
  )

  return {
    paginationRange,
    handleMainPageClicked,
    handleNextPageClicked,
    handlePreviousPageClicked,
  }
}

const range = (start: number, end: number) => {
  let length = end - start + 1

  // создаем массив элементов длиной length начиная с элемента start
  return Array.from({ length }, (_, idx) => idx + start)
}
