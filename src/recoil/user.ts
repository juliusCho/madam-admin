import firebase from 'firebase/app'
import Recoil from 'recoil'

const userState = Recoil.atom<firebase.User | null>({
  key: 'userState',
  default: null,
})

export default {
  userState,
}
