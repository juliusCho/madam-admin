import { ProfileExtraItemType } from './profile-extra-item'

export type ProfileExtraValueType = {
  key: string
  profileKey: string
  value: string | number | boolean | Date | string[]
  profileExtraItem: ProfileExtraItemType
  createdAt: Date
  modifiedAt: Date
  adminKey: string
}

export type ProfileExtraValueFilterType = {
  profileKey?: string
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
