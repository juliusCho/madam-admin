import { USER_STATUS } from '~/enums'

export type UserType = {
  uid: string
  email?: string
  phone?: string
  password?: string
  passwordQuestion?: string
  passwordAnswer?: string
  status: USER_STATUS
  createdAt: Date
  lastUsedAt?: Date
  quitAt?: string
  charm: number
  luckyDrawn?: boolean
  modifierEmail?: string
  modifiedAt?: Date
}
