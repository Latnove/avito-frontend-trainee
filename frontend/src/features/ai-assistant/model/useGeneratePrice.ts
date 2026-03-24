import { useMutation } from '@tanstack/react-query'
import { generatePrice } from '../api/generate'

export const useGeneratePrice = () => {
  return useMutation({
    mutationFn: generatePrice,
  })
}
