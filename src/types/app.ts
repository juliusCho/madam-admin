export enum USER_STATUS {
  REST = 'REST',
  ACTIVE = 'ACTIVE',
  BAN = 'BAN',
  QUIT = 'QUIT',
  INACTIVE = 'INACTIVE',
}

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

export enum MADAM_REQUEST_STATUS {
  REQUEST = 'REQUEST',
  ACCEPT = 'ACCEPT',
  REJECT = 'REJECT',
  COMPLETE = 'COMPLETE',
  TIMEOUT = 'TIMEOUT',
}
