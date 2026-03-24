import { useMutation } from '@tanstack/react-query'
import { generateText } from '../api/generate'

export const useGenerateDescription = () => {
  return useMutation({
    mutationFn: generateText,
  })
}
