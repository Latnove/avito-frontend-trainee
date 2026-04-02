import { useAdQuery } from '@/entities/ad'
import { AdForm } from '@/features/ad-edit'
import { Layout, Spin } from 'antd'
import { useParams } from 'react-router-dom'
import styles from './AdEditPage.module.css'

export const AdEditPage = () => {
  const { id } = useParams()

  // CR: React требует, чтобы хуки вызывались безусловно и в одном и том же порядке
  const { data: ad, isLoading, isError, error } = useAdQuery(id ?? '')

  if (!id) return 'Error id not Found'

  if (isError) return error?.message

  return (
    <Layout className={styles.layout}>
      <h1 className={styles.title}>Редактирование объявления</h1>

      {isLoading && <Spin size='large' />}
      {ad && !isLoading && <AdForm ad={ad} id={id} />}
    </Layout>
  )
}
