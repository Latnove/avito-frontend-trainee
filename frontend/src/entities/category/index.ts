// CR: Слой entities не должен знать о слое features, это прямое нарушение FSD
export { CategoriesList } from '../../features/ads-list/ui/categories-list/CategoriesList'
export { getCategories } from './model/api'
export { categoryLabels } from './model/types'
export type { Category } from './model/types'
