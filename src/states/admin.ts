import Recoil from 'recoil'
import { recoilPersist } from 'recoil-persist'
import Admin from '~/classes/admin'

const { persistAtom } = recoilPersist()

const adminState = Recoil.atom<Admin | null>({
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
