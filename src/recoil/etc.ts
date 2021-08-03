import Recoil from 'recoil'

const loadingState = Recoil.atom({
  key: 'loadingState',
  default: true,
})

export default {
  loadingState,
}
