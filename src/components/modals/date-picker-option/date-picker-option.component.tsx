import React from 'react'
import Modal from 'react-modal'
import Recoil from 'recoil'
import deviceGlobalStates from '../../../recoil/device'
import {
  ChartDatePickerOptionType,
  CHART_DATE_PICKER_OPTION,
} from '../../../types'
import customHooks from '../../../utils/hooks'
import ModalDatePickerOptionStyle from './date-picker-option.style'

export interface ModalDatePickerOptionProps {
  show: boolean
  changeOption: (type: ChartDatePickerOptionType) => void
  type?: ChartDatePickerOptionType
  showOneDay?: boolean
  backgroundColor?: string
  className?: string
}

function ModalDatePickerOption({
  show,
  changeOption,
  type,
  showOneDay,
  backgroundColor,
  className,
}: ModalDatePickerOptionProps) {
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  const [isOpen, setIsOpen] = React.useState(false)

  const isMounted = customHooks.useIsMounted()

  React.useEffect(() => {
    if (isMounted()) {
      if (show) {
        setIsOpen(() => show)
        return
      }

      setTimeout(() => {
        setIsOpen(() => false)
      }, 250)
    }
  }, [isMounted, show])

  const Option = React.useCallback(
    (optionType: ChartDatePickerOptionType) => (
      <button
        type="button"
        onClick={() => changeOption(optionType)}
        className={ModalDatePickerOptionStyle.button({
          selected: type === optionType,
        })}>
        {CHART_DATE_PICKER_OPTION[optionType]}
      </button>
    ),
    [type],
  )

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => changeOption(type ?? 'day')}
      overlayClassName={ModalDatePickerOptionStyle.container({
        backgroundColor,
      })}
      bodyOpenClassName="rounded-lg"
      className={`bottom-${show ? 'up' : 'down'} ${className}`}>
      <div className={ModalDatePickerOptionStyle.buttonArea}>
        {showOneDay && Option('day')}
        {Option('week')}
        {device !== 'mobile' && device !== 'smallScreen' && Option('month')}
        {Option('3-months')}
        {Option('6-months')}
        {Option('year')}
      </div>
    </Modal>
  )
}

ModalDatePickerOption.defaultProps = {
  type: 'day',
  showOneDay: false,
  backgroundColor: 'mono-darkGray',
  className: undefined,
}

export default React.memo(ModalDatePickerOption)
