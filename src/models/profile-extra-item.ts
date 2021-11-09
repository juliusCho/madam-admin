import { PROFILE_EXTRA_ITEM_TYPE } from '~/enums'

export type ProfileExtraItemType = {
  key: string
  titleKr: string
  titleEn: string
  type: PROFILE_EXTRA_ITEM_TYPE
  createdAt: Date
  modifiedAt: Date
  adminKey: string
}

export type ProfileExtraItemFilterType = {
  title?: string
  type?: PROFILE_EXTRA_ITEM_TYPE
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
