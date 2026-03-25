import { api } from '@/shared/api'
import type { GetFullAdResponse } from '../model/types'

export const getFullAdInfo = async (id: string) => {
  const { data } = await api.get<GetFullAdResponse>(`/items/${id}`)

  if (!data) {
    throw new Error('Ad not Found')
  }

  // так как приходит он в виде строки и
  if (
    data.params &&
    'yearOfManufacture' in data.params &&
    data.params.yearOfManufacture !== undefined
  ) {
    data.params.yearOfManufacture = Number(data.params.yearOfManufacture)
  }

  return data
}
