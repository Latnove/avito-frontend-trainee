import type { Category } from '@/entities/category'

export type ParamsType = AutoParams | RealEstateParams | ElectronicsParams

export interface Ad {
  category: Category
  title: string
  description?: string
  price: number
  createdAt: string
  updatedAt?: string
  needsRevision: boolean
  params: ParamsType
}

export type AdListItem = ItemsGetOut['items'][number]

export interface AutoParams {
  brand?: string
  model?: string
  yearOfManufacture?: number
  transmission?: 'automatic' | 'manual'
  mileage?: number
  enginePower?: number
}

export interface RealEstateParams {
  type?: 'flat' | 'house' | 'room'
  address?: string
  area?: number
  floor?: number
}

export interface ElectronicsParams {
  type?: 'phone' | 'laptop' | 'misc'
  brand?: string
  model?: string
  condition?: 'new' | 'used'
  color?: string
}

export interface ItemsGetOut {
  items: {
    category: Category
    title: string
    price: number
    needsRevision: boolean
  }[]
  total: number
}

export type GetFullAdResponse = Ad & {
  // CR: Ad уже содержит поле needsRevision
  needsRevision: boolean
}

export type GetItemsParams = {
  q?: string
  limit?: number
  skip?: number
  needsRevision?: boolean
  categories?: string
  sortColumn?: 'title' | 'createdAt'
  sortDirection?: 'asc' | 'desc'
}

export type ItemUpdateIn = {
  category: Category
  title: string
  description?: string
  price: number
  params: ParamsType
}
