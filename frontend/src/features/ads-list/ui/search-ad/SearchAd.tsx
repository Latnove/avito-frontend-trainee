import { useDebounce } from '@/shared/lib/hooks'
import Search from 'antd/es/input/Search'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useAdsStore } from '../../model/store'
import styles from './SearchAd.module.css'

interface ISearchAd {
  placeholder: string
  className?: string
}

export const SearchAd = ({ placeholder, className }: ISearchAd) => {
  const q = useAdsStore((s) => s.q)
  const setQuery = useAdsStore((s) => s.setQuery)

  const [value, setValue] = useState<string>(q)

  const debouncedValue = useDebounce(value, 500)

  useEffect(() => {
    setQuery(debouncedValue)
  }, [debouncedValue, setValue])

  return (
    <Search
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={clsx(styles.search, className)}
    />
  )
}
