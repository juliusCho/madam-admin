import moment from 'moment'
import { PROFILE_EXTRA_ITEM_TYPE } from '~/enums'
import helpers from '~/utils/helpers'

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

export default class ProfileExtraItem {
  readonly id: string = ''

  readonly titleKr: string = ''

  readonly titleEn: string = ''

  readonly type: PROFILE_EXTRA_ITEM_TYPE = PROFILE_EXTRA_ITEM_TYPE.TEXT

  readonly inputLength?: number

  readonly createdAt: string = moment().format('YYYY-MM-DDTHH:mm:ss.sssZ')

  readonly modifiedAt?: string

  readonly adminEmail?: string

  constructor(init: ProfileExtraItemType) {
    if (init.adminEmail) {
      if (helpers.validateEmail(init.adminEmail)) {
        Object.assign(this, init)
      }
      return
    }
    Object.assign(this, init)
  }

  json() {
    return {
      id: this.id,
      titleKr: this.titleKr,
      titleEn: this.titleEn,
      type: this.type,
      inputLength: this.inputLength,
      createdAt: this.createdAt,
      modifiedAt: this.modifiedAt,
      adminEmail: this.adminEmail,
    }
  }
}
