import type { Category } from './types'

export const getCategories = async (): Promise<Category[]> => {
  return ['auto', 'real_estate', 'electronics']
}
