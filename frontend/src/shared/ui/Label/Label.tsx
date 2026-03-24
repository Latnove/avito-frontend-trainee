import clsx from 'clsx'
import type { ReactNode } from 'react'
import styles from './Label.module.css'

interface ILabel {
  title: string
  children: ReactNode
  className?: string
  isRequired?: boolean
}

export const Label = ({ isRequired = false, title, children, className }: ILabel) => {
  return (
    <div className={clsx(className)}>
      <div className={styles.titleWrapper}>
        {isRequired && <span className={styles.require}>*</span>}
        <h3 className={styles.title}>{title}</h3>
      </div>
      {children}
    </div>
  )
}
