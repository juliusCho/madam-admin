export type SystemVariableType = {
  key: string
  type: string
  value: string | number
  use: boolean
  createdAt: Date
  modifiedAt: Date
  adminKey: string
}

export type SystemVariableFilterType = {
  type?: null | string
  use?: null | boolean
}
