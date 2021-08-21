import Recoil from 'recoil'

const loadingState = Recoil.atom({
  key: 'loadingState',
  default: true,
})

const firstTabLoadingState = Recoil.atom({
  key: 'firstTabLoadingState',
  default: true,
})

const secondTabLoadingState = Recoil.atom({
  key: 'secondTabLoadingState',
  default: true,
})

export default {
  loadingState,
  firstTabLoadingState,
  secondTabLoadingState,
}
