import { PROFILE_EXTRA_ITEM_TYPE } from '~/enums'

export type ProfileExtraItemType = {
  id: string
  titleKr: string
  titleEn: string
  type: PROFILE_EXTRA_ITEM_TYPE
  inputLength?: number
  createdAt?: string
  modifiedAt?: string
  adminEmail?: string
}