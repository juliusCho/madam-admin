import React from 'react'
import Modal from 'react-modal'
import { ChartDatePickerOption } from '../../../types'
import ModalDatePickerOptionStyle from './date-picker-option.style'

export interface ModalDatePickerOptionProps {
  show: boolean
  changeOption: (type: ChartDatePickerOption) => void
  type?: ChartDatePickerOption
  backgroundColor?: string
  className?: string
}

function ModalDatePickerOption({
  show,
  changeOption,
  type,
  backgroundColor,
  className,
}: ModalDatePickerOptionProps) {
  const getLabel = React.useCallback((optionType: ChartDatePickerOption) => {
    switch (optionType) {
      case 'day':
        return '하루'
      case 'week':
        return '일주일'
      case 'month':
        return '한달'
      case '3-months':
        return '3달'
      case '6-months':
        return '6달'
      default:
        return '일년'
    }
  }, [])

  const Option = React.useCallback(
    (optionType: ChartDatePickerOption) => (
      <button
        type="button"
        onClick={() => changeOption(optionType)}
        className={ModalDatePickerOptionStyle.button({
          selected: type === optionType,
        })}>
        {getLabel(optionType)}
      </button>
    ),
    [type],
  )

  return (
    <Modal
      isOpen={show}
      onRequestClose={() => changeOption(type ?? 'day')}
      overlayClassName={ModalDatePickerOptionStyle.container({
        backgroundColor,
      })}
      bodyOpenClassName="rounded-lg"
      className={`bottom-${show ? 'up' : 'down'} ${className}`}>
      <div className={ModalDatePickerOptionStyle.buttonArea}>
        {Option('day')}
        {Option('week')}
        {Option('month')}
        {Option('3-months')}
        {Option('6-months')}
        {Option('year')}
      </div>
    </Modal>
  )
}

ModalDatePickerOption.defaultProps = {
  type: 'day',
  backgroundColor: 'bg-mono-darkGray',
  className: undefined,
}

export default React.memo(ModalDatePickerOption)
