import { useAdsStore } from '../../model/store'
import styles from './ResetFilter.module.css'

export const ResetFilter = () => {
  const resetFilters = useAdsStore((s) => s.resetFilters)

  return (
    <button className={styles.button} onClick={resetFilters}>
      Сбросить фильтры
    </button>
  )
}
