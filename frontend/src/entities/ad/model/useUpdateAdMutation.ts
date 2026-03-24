import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAd } from '../api/updateAd'
import type { ItemUpdateIn } from './types'

export const useUpdateAdMutation = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ItemUpdateIn) => updateAd(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ad', id] })
      queryClient.invalidateQueries({ queryKey: ['items'] })
    },
  })
}
