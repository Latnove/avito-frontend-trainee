import { categoryLabels, getCategories, type Category } from '@/entities/category'
import { Checkbox, Collapse } from 'antd'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useAdsStore } from '../../model/store'
import styles from './CategoriesList.module.css'

interface ICategoriesList {
  className?: string
}

export const CategoriesList = ({ className }: ICategoriesList) => {
  const [allCategories, setAllCategories] = useState<Category[]>([])
  const categories = useAdsStore((s) => s.categories)
  const toggleCategory = useAdsStore((s) => s.toggleCategory)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategories()
      setAllCategories(data)
    }

    fetchData()
  }, [])

  return (
    <Collapse
      defaultActiveKey={['categories']}
      className={clsx(className, styles.wrapper)}
      ghost
      items={[
        {
          key: 'categories',
          label: 'Категория',
          children: (
            <div className={styles.list}>
              {allCategories.map((cat) => (
                <Checkbox
                  key={cat}
                  value={cat}
                  checked={categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                >
                  {categoryLabels[cat]}
                </Checkbox>
              ))}
            </div>
          ),
        },
      ]}
    />
  )
}
