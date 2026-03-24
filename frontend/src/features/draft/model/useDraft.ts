import { useState } from 'react'

export const useDraft = <T>(key: string) => {
  const saved = localStorage.getItem(key)
  const parsed = saved ? JSON.parse(saved) : null

  const [draft, setDraft] = useState<T | null>(parsed)

  const save = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const restore = () => {
    if (!draft) return null
    setDraft(null)
    return draft
  }

  const clear = () => {
    localStorage.removeItem(key)
    setDraft(null)
  }

  return { draft, save, restore, clear }
}
