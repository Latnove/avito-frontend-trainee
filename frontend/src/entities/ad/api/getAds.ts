import { api } from '@/shared/api'
import type { GetItemsParams, ItemsGetOut } from '../model/types'

export const getAds = async (params: GetItemsParams) => {
  const res = await api.get<ItemsGetOut>('/items', { params })
  return res.data
}
