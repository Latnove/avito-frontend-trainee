import AppstoreIcon from '@/shared/assets/Appstore.svg?react'
import UnorderedListIcon from '@/shared/assets/UnorderedList.svg?react'

import clsx from 'clsx'
import { useAdsStore } from '../../model/store'
import styles from './ViewToggleAds.module.css'

export const ViewToggleAds = () => {
  const isShort = useAdsStore((s) => s.isShort)
  const toggleView = useAdsStore((s) => s.toggleView)

  const handleClick = (value: boolean) => {
    if (isShort === value) return

    toggleView(value)
  }

  return (
    <div className={styles.layout}>
      <button
        className={clsx(styles.button, isShort && styles.active)}
        onClick={() => handleClick(true)}
      >
        <AppstoreIcon className={styles.svg} />
      </button>
      <button
        className={clsx(styles.button, !isShort && styles.active)}
        onClick={() => handleClick(false)}
      >
        <UnorderedListIcon className={styles.svg} />
      </button>
    </div>
  )
}
