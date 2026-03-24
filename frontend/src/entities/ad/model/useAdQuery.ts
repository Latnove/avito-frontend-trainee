import { useQuery } from '@tanstack/react-query'
import { getFullAdInfo } from '../api/getFullAdInfo'

export const useAdQuery = (id: string) => {
  return useQuery({
    queryKey: ['ad', id],
    queryFn: () => getFullAdInfo(id),
    enabled: !!id,
  })
}
