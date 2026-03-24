import { paramsConfig } from './paramsConfig'
import type { Ad } from './types'

export const getMissingFields = (ad: Ad): string[] => {
  const fields = paramsConfig[ad.category]
  const params = ad.params as Record<string, unknown>

  const missing = fields
    .filter(({ key }) => {
      const value = params[key]

      return value === undefined || value === ''
    })
    .map(({ label }) => label)

  if (!ad.description) {
    missing.push('Описание')
  }

  return missing
}
