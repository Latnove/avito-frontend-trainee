import { CategoriesList } from '@/entities/category'
import { NeedsFixAds, ResetFilter } from '@/features/ads-list'
import clsx from 'clsx'
import styles from './AdsFilter.module.css'

interface IAdsFilter {
  className: string
}

export const AdsFilter = ({ className }: IAdsFilter) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.filters}>
        <h2 className={styles.title}>Фильтры</h2>
        <CategoriesList className={styles.categories} />
        <NeedsFixAds />
      </div>

      <ResetFilter />
    </div>
  )
}
