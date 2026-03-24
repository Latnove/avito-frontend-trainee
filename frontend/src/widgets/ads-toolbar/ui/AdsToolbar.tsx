import { SearchAd, SortAdsSelect, ViewToggleAds } from '@/features/ads-list'
import styles from './AdsToolbar.module.css'

export const AdsToolbar = () => {
  return (
    <div className={styles.container}>
      <SearchAd placeholder='Найти объявление...' className={styles.search} />
      <div className={styles.params}>
        <ViewToggleAds />

        <SortAdsSelect />
      </div>
    </div>
  )
}
