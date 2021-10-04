import moment from 'moment'
import helpers from '~/utils/helpers'

export type ProfileSelectItemType = {
  profileExtraItemId: string
  key: string
  value: string
  valueLength?: number
  use: boolean
  createdAt: string
  modifiedAt?: string
  adminEmail?: string
}

export default class ProfileSelectItem {
  readonly profileExtraItemId: string = ''

  readonly key: string = ''

  readonly value: string = ''

  readonly valueLength?: number

  readonly use: boolean = true

  readonly createdAt: string = moment().format('YYYY-MM-DDTHH:mm:ss.sssZ')

  readonly modifiedAt?: string

  readonly adminEmail?: string

  constructor(init: ProfileSelectItemType) {
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
      profileExtraItemId: this.profileExtraItemId,
      key: this.key,
      value: this.value,
      valueLength: this.valueLength,
      use: this.use,
      createdAt: this.createdAt,
      modifiedAt: this.modifiedAt,
      adminEmail: this.adminEmail,
    }
  }
}
