import { useAdsQuery, useAdsTotalQuery } from '@/entities/ad'
import { AdsPagination } from '@/features/ads-list'
import { AdsFilter } from '@/widgets/ads-filters'
import { AdsList } from '@/widgets/ads-list/ui/AdsList'
import { AdsToolbar } from '@/widgets/ads-toolbar'
import { Layout, Spin } from 'antd'
import Sider from 'antd/es/layout/Sider'
import clsx from 'clsx'
import styles from './AdsPage.module.css'

export const AdsPage = () => {
  const { data, isLoading, isError, error } = useAdsQuery()
  const {
    data: dataTotal,
    isLoading: isLoadingTotal,
    isError: isErrorTotal,
    error: errorTotal,
  } = useAdsTotalQuery()

  if (isError) return <div>{error?.message}</div>

  if (isErrorTotal) return <div>{errorTotal?.message}</div>

  return (
    <Layout className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.title}>Мои объявления</h1>
        <span className={styles.text}>
          {isLoadingTotal ? <Spin className={styles.spin} /> : dataTotal} объявления
        </span>

        <AdsToolbar />
      </header>

      <Layout className={styles.content}>
        <Sider className={styles.sider} width={256}>
          <AdsFilter className={styles.filter} />
        </Sider>

        <Layout style={{ gap: '10px' }}>
          {isLoading && <Spin size='large' className={clsx(styles.adsSpinner, styles.spin)} />}
          {data && <AdsList className={styles.list} ads={data.items} />}
          <AdsPagination total={Number(data?.total) || 0} />
        </Layout>
      </Layout>
    </Layout>
  )
}
