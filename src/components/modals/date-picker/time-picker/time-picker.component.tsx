import moment from 'moment'
import TmPicker from 'rc-time-picker'
import * as React from 'react'
import { XEIcon } from '../../../etc/xeicon'
import './time-picker.style.scss'

export interface TimePickerProps {
  id?: 'start' | 'end'
  value?: string
  date?: Date
  onChange: (time?: string, id?: 'start' | 'end') => void
  style?: React.CSSProperties
  clearIcon?: string
  testID?: string
}

function TimePicker({
  id,
  value,
  date,
  onChange,
  style,
  clearIcon,
  testID,
}: TimePickerProps) {
  // 시간 선택 컴포넌트 활성화 시
  const onOpen = () => {
    onChange(value || '00:00', id)
  }

  // 시간 선택 시
  const onTimeChange = (e: moment.Moment) => {
    if (e === null) {
      onChange(undefined, id)
      return
    }
    if (!e.isValid()) return

    onChange(e === null ? undefined : e.format('HH:mm'), id)
  }

  // 시간 초기화 버튼 클릭 시
  const clickedClear = () => {
    if (!date) return

    onChange(value ? undefined : '00:00', id)
  }

  return (
    <div className="time-container" style={style}>
      <span className="time-text" data-testid={testID}>
        {date ? moment(date).format('YYYY/MM/DD') : ''}
      </span>
      <div className="time-picker">
        <TmPicker
          value={
            value
              ? moment(`${moment(new Date()).format('YYYY-MM-DD')} ${value}:00`)
              : undefined
          }
          showSecond={false}
          onOpen={onOpen}
          onChange={onTimeChange}
          className="time-picker"
          format="HH:mm"
          use12Hours={false}
          inputReadOnly
          clearIcon={clearIcon}
          disabled={!date}
          minuteStep={5}
        />
        <XEIcon
          name={clearIcon?.replace('xi-', '') || ''}
          color="text-main-blue hover:text-main-blueHover active:text-main-blueActive"
          size="0.875rem"
          className="time-button"
          onClick={clickedClear}
          testID={`${testID}-button`}
        />
      </div>
    </div>
  )
}

TimePicker.defaultProps = {
  id: undefined,
  value: undefined,
  date: undefined,
  style: {},
  clearIcon: 'close',
  testID: undefined,
}

export default React.memo(TimePicker)
