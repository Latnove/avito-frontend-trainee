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
      {ads.map((ad, index) => (
          // CR: Math.random() генерирует новый ключ при каждом рендере, React будет полностью пересоздавать DOM для каждого элемента списка
          // нужно использовать стабильный key
          // id элемента можно генерировать на уровне получения данных с помощью uuid/Date.now/window.crypto.randomUUID()
        <Link to={`/ads/${index}`} key={`${ad.title}-${ad.price}-${index}`} className={styles.item}>
          <AdCard ad={ad} className={styles.card} isShortCard={isShort} />
        </Link>
      ))}
    </div>
  )
}
