import { api } from '@/shared/api'
import type { GetFullAdResponse } from '../model/types'

export const getFullAdInfo = async (id: string) => {
  const { data } = await api.get<GetFullAdResponse>(`/items/${id}`)

  if (!data) {
    throw new Error('Ad not Found')
  }

  return data
}
