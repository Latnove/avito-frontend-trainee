import { api } from '@/shared/api'
import type { ItemUpdateIn } from '../model/types'

export const updateAd = async (id: string, data: ItemUpdateIn) => {
  const response = await api.put(`/items/${id}`, data)
  return response.data
}
