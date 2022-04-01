export type Category = {
  id?: number
  name: string
}

export type Book = {
  id?: number
  category_id: number
  name: string
  price: number
}

export interface Column {
  key: string
  title?: string
  class?: string
  scopedSlots?: boolean
  headScopedSlots?: boolean
  isTime?: boolean
  isCurrency?: boolean
}

