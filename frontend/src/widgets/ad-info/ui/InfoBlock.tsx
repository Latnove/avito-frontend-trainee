import type { ReactNode } from 'react'
import styles from './AdInfo.module.css'

interface IInfoBlock {
  children: ReactNode | string
  title: string
}

export const InfoBlock = ({ children, title }: IInfoBlock) => {
  return (
    <div className={styles.infoBlock}>
      <h3 className={styles.infoTitle}>{title}</h3>
      {children}
    </div>
  )
}
