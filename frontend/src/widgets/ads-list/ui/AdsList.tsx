import { AdCard, type AdListItem } from '@/entities/ad'
import { useAdsStore } from '@/features/ads-list'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import styles from './AdsList.module.css'

interface IAdsList {
  className?: string
  ads: AdListItem[]
}

export const AdsList = ({ className, ads }: IAdsList) => {
  const isShort = useAdsStore((s) => s.isShort)

  return (
    <div className={clsx(isShort ? styles.container : styles.containerLong, className)}>
      {/* because server not send us id of ads */}
      {ads.map((ad) => (
        <Link to={`/ads/${1}`} key={Math.random()} className={styles.item}>
          <AdCard ad={ad} className={styles.card} isShortCard={isShort} />
        </Link>
      ))}
    </div>
  )
}
