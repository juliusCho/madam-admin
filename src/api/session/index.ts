import { AdminType } from '~/models/admin'

const apiLogin = async (uid: string): Promise<string | null> => {
  return uid
}

const apiGetAdminInfo = async (token: string, uid: string) => {
  return {
    uid,
    email: process.env.REACT_APP_TEST_EMAIL || '',
    name: process.env.REACT_APP_TEST_NAME || '',
  }
}

const apiChangeName = async (
  token: string,
  user: AdminType,
): Promise<boolean> => {
  return true
}

const apiLogout = () => {}

export default {
  apiLogin,
  apiGetAdminInfo,
  apiChangeName,
  apiLogout,
}
