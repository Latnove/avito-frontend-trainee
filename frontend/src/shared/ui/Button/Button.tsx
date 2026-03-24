import { Button as AntdButton } from 'antd'
import clsx from 'clsx'
import type { ReactNode } from 'react'
import styles from './Button.module.css'

interface IButton {
  children: ReactNode
  onClick: () => void
  isPrimary?: boolean
  isSecondary?: boolean
  className?: string
  disabled?: boolean
  loading?: boolean
  icon?: ReactNode
}

export const Button = ({
  isPrimary,
  isSecondary,
  className,
  onClick,
  disabled = false,
  loading,
  children,
  icon,
}: IButton) => {
  return (
    <AntdButton
      icon={icon}
      className={clsx(
        styles.button,
        isPrimary && styles.isPrimary,
        isSecondary && styles.isSecondary,
        className,
      )}
      loading={loading}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </AntdButton>
  )
}
