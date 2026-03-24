import { Button } from '@/shared/ui/Button'
import { Tooltip } from 'antd'
import clsx from 'clsx'
import React from 'react'
import styles from './AiTooltip.module.css'

type AiTooltipProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactElement
  onApply: () => void
  data?: string | null
  isError?: boolean
}

export const AiTooltip = ({
  data,
  isError,
  isOpen,
  onApply,
  onClose,
  children,
}: AiTooltipProps) => {
  const content = isError ? (
    <div className={styles.content}>
      <p className={clsx(styles.title, styles.errorTitle)}>Произошла ошибка при запросе к AI</p>

      <p className={styles.text}>Попробуйте повторить запрос или закройте уведомление</p>

      <Button onClick={onClose} className={clsx(styles.button, styles.errorButton)} isSecondary>
        Закрыть
      </Button>
    </div>
  ) : (
    <div className={styles.content}>
      <p className={styles.title}>Ответ AI:</p>

      <p className={styles.text}>{data || 'Нет данных'}</p>

      <div className={styles.buttons}>
        {onApply && (
          <Button onClick={onApply} isPrimary className={styles.button}>
            Применить
          </Button>
        )}

        <Button onClick={onClose} isSecondary className={styles.button}>
          Закрыть
        </Button>
      </div>
    </div>
  )

  return (
    <Tooltip open={isOpen} placement='top' title={content} color='var(--color-white)'>
      <span>{children}</span>
    </Tooltip>
  )
}
