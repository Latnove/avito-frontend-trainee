import EditSvg from '@/shared/assets/Edit.svg?react'
import { formatDate } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/Button'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import styles from './AdViewHeader.module.css'

interface IAdViewHeader {
  id: string
  title: string
  price: number
  createdAt: string
  updatedAt?: string
  className?: string
}

export const AdViewHeader = ({
  id,
  title,
  price,
  createdAt,
  updatedAt,
  className,
}: IAdViewHeader) => {
  const navigate = useNavigate()

  return (
    <div className={clsx(styles.header, className)}>
      <div className={styles.headerTop}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.price}>{price.toLocaleString('ru-RU')} ₽</p>
      </div>
      <div className={styles.headerBottom}>
        <Button
          isPrimary={true}
          className={styles.button}
          onClick={() => navigate(`/ads/${id}/edit`)}
        >
          Редактировать <EditSvg className={styles.svg} />
        </Button>
        <div className={styles.adInfo}>
          <p className={styles.text}>Опубликовано: {formatDate(createdAt)}</p>
          {updatedAt && <p className={styles.text}>Отредактировано: {formatDate(updatedAt)}</p>}
        </div>
      </div>
    </div>
  )
}
