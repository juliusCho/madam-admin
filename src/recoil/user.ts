import Recoil from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { AdminType } from '../types'

const { persistAtom } = recoilPersist()

const userState = Recoil.atom<AdminType | null>({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [persistAtom],
})

export default {
  userState,
}
