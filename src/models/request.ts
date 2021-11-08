import { MADAM_REQUEST_STATUS } from '~/enums'

export type RequestType = {
  status: MADAM_REQUEST_STATUS
  requesterProfileKey: string
  madamUserKey: string
  createdAt?: Date
  modifiedAt?: Date
}
