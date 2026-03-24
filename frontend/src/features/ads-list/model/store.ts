import type { Category } from '@/entities/category'
import { create } from 'zustand'

export type SortColumn = 'title' | 'createdAt'
export type SortDirection = 'asc' | 'desc'

interface AdsListState {
  q: string

  categories: Category[]
  needsRevision: boolean

  sortColumn: SortColumn
  sortDirection: SortDirection

  page: number
  limit: number

  isShort: boolean

  setQuery: (q: string) => void
  setCategories: (categories: Category[]) => void
  toggleCategory: (category: Category) => void
  setNeedsRevision: (value: boolean) => void

  setSort: (column: SortColumn, direction: SortDirection) => void

  setPage: (page: number) => void
  setLimit: (limit: number) => void

  toggleView: (isShort: boolean) => void

  resetFilters: () => void
}

export const useAdsStore = create<AdsListState>((set) => ({
  q: '',

  categories: [],
  needsRevision: false,

  sortColumn: 'createdAt',
  sortDirection: 'desc',

  page: 1,
  limit: 10,

  isShort: true,

  setQuery: (q) => set({ q, page: 1 }),

  setCategories: (categories) => set({ categories, page: 1 }),

  toggleCategory: (category) =>
    set((state) => {
      const exists = state.categories.includes(category)

      return {
        categories: exists
          ? state.categories.filter((c) => c !== category)
          : [...state.categories, category],
        page: 1,
      }
    }),

  setNeedsRevision: (needsRevision) => set({ needsRevision, page: 1 }),

  setSort: (sortColumn, sortDirection) => set({ sortColumn, sortDirection, page: 1 }),

  setPage: (page) => set({ page }),

  setLimit: (limit) => set({ limit, page: 1 }),

  toggleView: (isShort) => set({ isShort: isShort, page: 1 }),

  resetFilters: () =>
    set({
      q: '',
      categories: [],
      needsRevision: false,
      sortColumn: 'createdAt',
      sortDirection: 'desc',
      page: 1,
    }),
}))
