import Recoil from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { AdminType } from '../types'

const { persistAtom } = recoilPersist()

const adminState = Recoil.atom<AdminType | null>({
  key: 'adminState',
  default: null,
  effects_UNSTABLE: [persistAtom],
})

const verifiedState = Recoil.atom({
  key: 'verifiedState',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export default {
  adminState,
  verifiedState,
}
