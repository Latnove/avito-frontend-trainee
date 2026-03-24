import { AdRevisionAlert, type Ad } from '@/entities/ad'
import imgSrc from '@/shared/assets/Фотки.png'
import { Spin } from 'antd'
import clsx from 'clsx'
import styles from './AdInfo.module.css'
import { AdParams } from './AdParams'
import { InfoBlock } from './InfoBlock'

interface IAdInfo {
  ad: Ad | null
  className?: string
  isLoading?: boolean
}

export const AdInfo = ({ ad, className, isLoading }: IAdInfo) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.left}>
        <div className={styles.image}>
          <img src={imgSrc} alt='placeholder' />
        </div>

        <InfoBlock title='Описание'>
          {isLoading && <Spin size='large' className={styles.spin} />}
          {ad && (
            <>
              {ad.description ? (
                <span className={styles.text}>{ad.description}</span>
              ) : (
                <span style={{ color: 'var(--color-gray)', opacity: 0.75 }}>
                  Вы пока не описали товар
                </span>
              )}
            </>
          )}
        </InfoBlock>
      </div>
      <div className={styles.right}>
        {isLoading && <Spin size='medium' className={clsx(styles.spin, styles.spinCenter)} />}
        {ad && (
          <>
            <AdRevisionAlert className={styles.revisionAlert} ad={ad} />

            <InfoBlock title='Характеристики'>{ad && <AdParams ad={ad} />}</InfoBlock>
          </>
        )}
      </div>
    </div>
  )
}
