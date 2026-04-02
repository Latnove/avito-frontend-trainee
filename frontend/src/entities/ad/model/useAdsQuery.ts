import { getAds } from '@/entities/ad'
// CR: entity не должен зависеть от feature
import { useAdsStore } from '@/features/ads-list'
import { useQuery } from '@tanstack/react-query'

// CR: useAdsQuery следует перенести в слой features/ads-list, так как он зависит от стора этого feature, или принимать параметры фильтрации аргументами
export const useAdsQuery = () => {
  const q = useAdsStore((s) => s.q)
  const categories = useAdsStore((s) => s.categories)
  const needsRevision = useAdsStore((s) => s.needsRevision)
  const sortColumn = useAdsStore((s) => s.sortColumn)
  const sortDirection = useAdsStore((s) => s.sortDirection)
  const page = useAdsStore((s) => s.page)
  const limit = useAdsStore((s) => s.limit)

  const skip = (page - 1) * limit

  return useQuery({
    queryKey: [
      'items',
      q,
      categories.join(','),
      needsRevision,
      sortColumn,
      sortDirection,
      page,
      limit,
    ],
    queryFn: () =>
      getAds({
        q,
        limit,
        skip,
        needsRevision: needsRevision || undefined,
        categories: categories.length ? categories.join(',') : undefined,
        sortColumn,
        sortDirection,
      }),
  })
}
