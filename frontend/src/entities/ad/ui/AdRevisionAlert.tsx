import type { Ad } from '@/entities/ad'
import AlertSvg from '@/shared/assets/Vector.svg?react'
import clsx from 'clsx'
import { getMissingFields } from '../model/getMissingFields'
import styles from './AdRevisionAlert.module.css'

interface IAdRevisionAlert {
  ad: Ad
  className?: string
}

export const AdRevisionAlert = ({ ad, className }: IAdRevisionAlert) => {
  const missingFields = getMissingFields(ad)

  if (missingFields.length === 0) return null

  return (
    <div className={clsx(styles.container, className)}>
      <AlertSvg className={styles.svg} />

      <div className={styles.content}>
        <h3 className={styles.title}>Требуются доработки</h3>

        <p className={styles.text}>У объявления не заполнены поля:</p>

        <ul className={clsx(styles.list, styles.text)}>
          {missingFields.map((field) => (
            <li className={styles.item} key={field}>
              {field}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
