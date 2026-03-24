import { Switch } from 'antd'
import { useAdsStore } from '../../model/store'
import styles from './NeedFixAds.module.css'

export const NeedsFixAds = () => {
  const needsRevision = useAdsStore((s) => s.needsRevision)
  const setNeedsRevision = useAdsStore((s) => s.setNeedsRevision)

  return (
    <div className={styles.row}>
      <span className={styles.label}>Только требующие доработок</span>

      <Switch checked={needsRevision} onChange={setNeedsRevision} />
    </div>
  )
}
