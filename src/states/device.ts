import Recoil from 'recoil'
import helpers from '~/utils/helpers'

const isMediumScreen = Recoil.atom({
  key: 'isMediumScreen',
  default: false,
})

const isSmallScreen = Recoil.atom({
  key: 'isSmallScreen',
  default: false,
})

const isMobile = Recoil.atom({
  key: 'isMobile',
  default: helpers.isMobile(),
})

const getDevice = Recoil.selector({
  key: 'getDevice',
  get: ({ get }) => {
    const mobile = get(isMobile)
    if (mobile) {
      return 'mobile'
    }

    const smallScreen = get(isSmallScreen)
    if (smallScreen) {
      return 'smallScreen'
    }

    const mediumScreen = get(isMediumScreen)
    if (mediumScreen) {
      return 'mediumScreen'
    }

    return 'screen'
  },
})

export default {
  isMediumScreen,
  isSmallScreen,
  isMobile,
  getDevice,
}
