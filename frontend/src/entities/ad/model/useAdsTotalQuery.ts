import { getAds } from '@/entities/ad'
import { useQuery } from '@tanstack/react-query'

export const useAdsTotalQuery = () => {
  return useQuery({
    queryKey: ['ads-total'],
    queryFn: () => getAds({ limit: 1, skip: 0 }),
    select: (data) => data.total,
    staleTime: Infinity,
  })
}
