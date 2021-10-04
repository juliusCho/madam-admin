import moment from 'moment'
import { USER_STATUS } from '~/enums'
import helpers from '~/utils/helpers'

export type UserType = {
  uid: string
  email?: string
  phone?: string
  password?: string
  passwordQuestion?: string
  passwordAnswer?: string
  status: USER_STATUS
  createdAt: string
  lastUsedAt?: string
  quitAt?: string
  charm: number
  luckyDrawn?: boolean
  modifierEmail?: string
  modifiedAt?: string
}

export default class User {
  readonly uid: string = ''

  readonly email?: string

  readonly phone?: string

  readonly password?: string

  readonly passwordQuestion?: string

  readonly passwordAnswer?: string

  readonly status: USER_STATUS = USER_STATUS.ACTIVE

  readonly createdAt: string = moment().format('YYYY-MM-DDTHH:mm:ss.sssZ')

  readonly lastUsedAt?: string

  readonly quitAt?: string

  readonly charm: number = 0

  readonly luckyDrawn?: boolean

  readonly modifierEmail?: string

  readonly modifiedAt?: string

  constructor(init: UserType) {
    if (init.email) {
      if (helpers.validateEmail(init.email)) {
        Object.assign(this, init)
      }
      return
    }
    Object.assign(this, init)
  }

  json() {
    return {
      uid: this.uid,
      email: this.email,
      phone: this.phone,
      password: this.password,
      passwordQuestion: this.passwordQuestion,
      passwordAnswer: this.passwordAnswer,
      status: this.status,
      createdAt: this.createdAt,
      lastUsedAt: this.lastUsedAt,
      quitAt: this.quitAt,
      charm: this.charm,
      luckyDrawn: this.luckyDrawn,
      modifierEmail: this.modifierEmail,
      modifiedAt: this.modifiedAt,
    }
  }
}
