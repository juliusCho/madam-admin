import helpers from '~/utils/helpers'

export type AdminType = {
  email: string
  uid: string
  name?: string
}
export default class Admin {
  readonly email: string

  readonly uid: string

  readonly name?: string

  constructor({ email, uid, name }: AdminType) {
    if (helpers.validateEmail(email)) {
      this.email = email
    } else {
      this.email = ''
    }
    this.uid = uid
    this.name = name
  }

  json() {
    return {
      email: this.email,
      uid: this.uid,
      name: this.name,
    }
  }
}
