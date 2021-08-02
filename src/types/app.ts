export enum UserStatus {
  REST = 'REST',
  ACTIVE = 'ACTIVE',
  BAN = 'BAN',
  QUIT = 'QUIT',
  INACTIVE = 'INACTIVE',
}

export type UserType = {
  key: string
  email?: string
  phone?: string
  password?: string
  passwordQuestion?: string
  passwordAnswer?: string
  status: UserStatus
  createdAt: string
  lastUsedAt?: string
  quitAt?: string
  charm: number
  luckyDrawn?: boolean
  modifierEmail?: string
  modifiedAt?: string
}
