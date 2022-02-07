export type ProfileSelectItemType = {
  key?: string
  profileExtraItemKey?: string
  value?: string
  labelEn?: string
  labelKr?: string
  use: boolean
  createdAt?: Date
  modifiedAt?: Date
  adminKey: string
}

export type ProfileSelectItemFilterType = {
  profileExtraItemKey?: string
  use: boolean
  createdAt?: {
    start?: Date
    end?: Date
  }
  modifiedAt?: {
    start?: Date
    end?: Date
  }
  adminKey?: string
}
