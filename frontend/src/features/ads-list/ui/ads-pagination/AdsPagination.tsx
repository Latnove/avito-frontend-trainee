import { Pagination } from 'antd'
import { useAdsStore } from '../../model/store'
import styles from './AdsPagination.module.css'

interface IAdsPagination {
  total: number
}

export const AdsPagination = ({ total }: IAdsPagination) => {
  const page = useAdsStore((s) => s.page)
  const setPage = useAdsStore((s) => s.setPage)
  const limit = useAdsStore((s) => s.limit)

  return (
    <div className={styles.wrapper}>
      <Pagination
        current={page}
        total={total}
        pageSize={limit}
        onChange={setPage}
        showSizeChanger={false}
        itemRender={(pageNumber, type, originalElement) => {
          if (type === 'jump-prev' || type === 'jump-next') {
            return null
          }

          const totalPages = Math.ceil(total / limit)

          if (totalPages <= 5) {
            return originalElement
          }

          if (page <= 3) {
            if (pageNumber <= 5) {
              return originalElement
            }
            return null
          }

          if (page >= totalPages - 2) {
            if (pageNumber > totalPages - 5) {
              return originalElement
            }
            return null
          }

          if (pageNumber >= page - 2 && pageNumber <= page + 2) {
            return originalElement
          }

          return null
        }}
      />
    </div>
  )
}
