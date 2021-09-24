import React from 'react'
import Recoil from 'recoil'
import deviceGlobalStates from '../../../recoil/device'
import { XEIcon } from '../../etc/xeicon'
import ButtonToTopStyle from './to-top.style'

export interface ButtonToTopProps {
  show: boolean
}

function ButtonToTop({ show }: ButtonToTopProps) {
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  const onClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={ButtonToTopStyle.button({ show, device })}>
      <XEIcon
        name="navigation"
        size={device === 'mobile' || device === 'smallScreen' ? 16 : 25}
        color="mono-white"
        onClick={onClick}
        testID="components.buttons.toTop"
      />
      <p className={ButtonToTopStyle.label}>Top</p>
    </button>
  )
}

export default React.memo(ButtonToTop)
