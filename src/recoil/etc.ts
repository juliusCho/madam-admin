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

type AlertState = {
  show: boolean
  msg: string
  type: 'info' | 'success' | 'warning' | 'error'
  time: number
}

const alertState = Recoil.atom<AlertState>({
  key: 'alertState',
  default: {
    show: false,
    msg: '',
    type: 'info',
    time: 1000,
  },
})

export default {
  loadingState,
  firstTabLoadingState,
  secondTabLoadingState,
  alertState,
}
