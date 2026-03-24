import clsx from 'clsx'
import type { ReactNode } from 'react'
import styles from './SquareButton.module.css'

interface ISquareButton {
  className?: string
  onClick: () => void
  children: ReactNode
}

export const SquareButton = ({ className, onClick, children }: ISquareButton) => {
  return (
    <button className={clsx(styles.button, className)} onClick={onClick}>
      {children}
    </button>
  )
}
