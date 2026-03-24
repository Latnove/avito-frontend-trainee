import { categoryLabels } from '@/entities/category'
import coverImg from '@/shared/assets/cover.png'
import { TipWithIcon } from '@/shared/ui/Tip'
import clsx from 'clsx'
import type { AdListItem } from '../model/types'
import shortStyles from './ShortAdCard.module.css'
import longStyles from './AdCard.module.css'

interface IAdCard {
  ad: AdListItem
  isShortCard: boolean
  className?: string
}

export const AdCard = ({ ad, className, isShortCard }: IAdCard) => {
  const styles = isShortCard ? shortStyles : longStyles

  return (
    <div className={clsx(styles.card, className)}>
      <div className={styles.image}>
        <img src={coverImg} alt='placeholder' />
      </div>

      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.category}>{categoryLabels[ad.category]}</div>

          <div className={styles.title}>{ad.title}</div>

          <div className={styles.price}>{ad.price.toLocaleString('ru-RU')} ₽</div>

          {ad.needsRevision && <TipWithIcon className={styles.badge} />}
        </div>
      </div>
    </div>
  )
}
