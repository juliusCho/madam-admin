import Recoil from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { AdminType } from '~/models/admin'

const { persistAtom } = recoilPersist()

const adminState = Recoil.atom<AdminType | null>({
  key: 'adminState',
  default: null,
  effects_UNSTABLE: [persistAtom],
})

const tokenState = Recoil.atom({
  key: 'tokenState',
  default: '',
  effects_UNSTABLE: [persistAtom],
})

export default {
  adminState,
  tokenState,
}
