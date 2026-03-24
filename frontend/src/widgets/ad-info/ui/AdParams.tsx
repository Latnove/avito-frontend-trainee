import { paramsConfig, type Ad } from '@/entities/ad'
import React from 'react'
import styles from './AdInfo.module.css'

interface IAdParams {
  ad: Ad
}

export const AdParams = ({ ad }: IAdParams) => {
  const currentParams = paramsConfig[ad.category]

  const filledParams = currentParams.filter(({ key }) => {
    const value = (ad.params as Record<string, unknown>)[key]
    return Boolean(value)
  })

  return (
    <div className={styles.characteristics}>
      {filledParams.length > 0 ? (
        filledParams.map((param) => {
          const value = (ad.params as Record<string, unknown>)[param.key]

          return (
            <React.Fragment key={param.key}>
              <span className={styles.itemTitle}>{param.label}</span>
              <span className={styles.itemText}>
                {param.type === 'select'
                  ? param.options.find(({ value: v }) => v === value)?.label
                  : (value as string)}
              </span>
            </React.Fragment>
          )
        })
      ) : (
        <span style={{ color: 'var(--color-gray)', opacity: 0.75 }}>
          Вы пока не указали характеристики
        </span>
      )}
    </div>
  )
}
