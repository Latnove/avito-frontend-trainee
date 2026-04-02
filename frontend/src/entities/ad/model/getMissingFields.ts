import { paramsConfig } from './paramsConfig'
import type { Ad } from './types'

const isEmpty = (value: unknown): boolean =>
    value === undefined || value === '' || value === null

export const getMissingFields = (ad: Ad): string[] => {
  const fields = paramsConfig[ad.category]
  const params = ad.params as Record<string, unknown>

  const missing = fields
    .filter(({ key }) => isEmpty(params[key]))
    .map(({ label }) => label)

  if (!ad.description) {
    missing.push('Описание')
  }

  return missing
}
