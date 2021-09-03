import { AdminType } from '../types'

export const apiLogin = async (uid: string): Promise<string | null> => {
  return uid
}

export const apiGetAdminInfo = async (token: string, uid: string) => {
  return {
    uid,
    email: process.env.REACT_APP_TEST_EMAIL || '',
    name: process.env.REACT_APP_TEST_NAME || '',
  }
}

export const apiChangeName = async (
  token: string,
  user: AdminType,
): Promise<boolean> => {
  return true
}

export const apiLogout = () => {}
