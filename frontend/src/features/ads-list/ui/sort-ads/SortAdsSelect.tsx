import { Select } from 'antd'
import { useAdsStore } from '../../model/store'
import styles from './SortAdsSelect.module.css'

const sortValues = {
  '1': {
    sortColumn: 'createdAt',
    sortDirection: 'desc',
  },
  '2': {
    sortColumn: 'createdAt',
    sortDirection: 'asc',
  },
  '5': {
    sortColumn: 'title',
    sortDirection: 'asc',
  },
  '6': {
    sortColumn: 'title',
    sortDirection: 'desc',
  },
} as const

export const SortAdsSelect = () => {
  const { setSort, sortColumn, sortDirection } = useAdsStore((s) => ({
    setSort: s.setSort,
    sortColumn: s.sortColumn,
    sortDirection: s.sortDirection,
  }))

  const currentValue = (Object.entries(sortValues).find(
    ([, value]) => sortColumn === value.sortColumn && sortDirection === value.sortDirection,
  )?.[0] || '1') as keyof typeof sortValues

  const handleChange = (value: keyof typeof sortValues) => {
    const { sortColumn, sortDirection } = sortValues[value]
    setSort(sortColumn, sortDirection)
  }

  return (
    <Select
      className={styles.wrapper}
      value={currentValue}
      onChange={handleChange}
      options={[
        { value: '1', label: 'По новизне (сначала новые)' },
        { value: '2', label: 'По новизне (сначала старые)' },
        // server not support price sort
        // { value: '3', label: 'По цене (сначала дешевле)' },
        // { value: '4', label: 'По цене (сначала дороже)' },
        { value: '5', label: 'По названию (А → Я)' },
        { value: '6', label: 'По названию (Я → А)' },
      ]}
    />
  )
}
