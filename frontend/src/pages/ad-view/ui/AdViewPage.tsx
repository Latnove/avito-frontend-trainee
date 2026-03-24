import { useAdQuery } from '@/entities/ad'
import { AdInfo } from '@/widgets/ad-info'
import { AdViewHeader } from '@/widgets/ad-view-header'
import { Layout, Spin } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { useParams } from 'react-router-dom'
import styles from './AdViewPage.module.css'

export const AdViewPage = () => {
  const { id } = useParams()
  if (!id) return 'ОШИБКА'

  const { data: ad, isLoading, isError, error } = useAdQuery(id)

  if (isError) return error?.message

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        {isLoading && <Spin size='medium' className={styles.spin} />}
        {ad && (
          <AdViewHeader
            className={styles.headerContent}
            id={id}
            title={ad.title}
            createdAt={ad.createdAt}
            updatedAt={ad.updatedAt}
            price={ad.price}
          />
        )}
      </Header>

      <AdInfo ad={ad || null} isLoading={isLoading} className={styles.adInfo} />
    </Layout>
  )
}
