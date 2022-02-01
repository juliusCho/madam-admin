export type SystemVariableType = {
  key?: string
  type?: string
  value?: string | number
  use: boolean
  name?: string
  createdAt?: Date
  modifiedAt?: Date
  adminKey: string
}

export type SystemVariableFilterType = {
  type?: null | string
  use?: null | boolean
  adminKey?: null | string
}
