import { AdminType } from '../types'

export const verifyAndGetToken = async (token: string, uid: string) => {
  return true
}

export const apiLogin = async (uid: string): Promise<AdminType | null> => {
  return {
    uid,
    email: process.env.REACT_APP_TEST_EMAIL || '',
    name: process.env.REACT_APP_TEST_NAME || '',
  }
}

export const apiToken = async (uid: string): Promise<string | null> => {
  return uid
}

export const apiChangeName = async (user: AdminType): Promise<boolean> => {
  return true
}

export const apiLogout = () => {}
