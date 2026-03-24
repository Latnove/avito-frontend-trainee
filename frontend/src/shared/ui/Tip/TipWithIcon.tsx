import clsx from 'clsx'
import type { ReactNode } from 'react'
import styles from './TipWithIcon.module.css'

interface ITipWithIcon {
  children?: ReactNode
  className?: string
}

export const TipWithIcon = ({ children, className }: ITipWithIcon) => {
  return (
    <div className={clsx(styles.badge, className)}>
      {children ? children : <div className={styles.dot}></div>} Требует доработок
    </div>
  )
}
