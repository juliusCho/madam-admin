import * as React from 'react'
import { TimePicker } from '../time-picker'
import TimePickerRangeStyle from './time-picker-range.style'

export interface TimePickerRangeProps {
  value?: string[]
  date?: Date | Array<Date | undefined>
  onChange: (value: Array<string | undefined>) => void
  clearIcons?: string[]
  testID1?: string
  testID2?: string
}

function TimePickerRange({
  value,
  date,
  onChange,
  clearIcons,
  testID1,
  testID2,
}: TimePickerRangeProps) {
  const onTimeChange = React.useCallback(
    (time?: string, id?: 'start' | 'end') => {
      if (!id) return
      if (time) {
        if (value) {
          const timeNum = Number(`${time.substr(0, 2)}${time.substr(3, 2)}`)
          if (id === 'start') {
            const valueNum = Number(
              `${value[1].substr(0, 2)}${value[1].substr(3, 2)}`,
            )
            onChange([time, timeNum > valueNum ? time : value[1]])
          } else {
            const valueNum = Number(
              `${value[0].substr(0, 2)}${value[0].substr(3, 2)}`,
            )
            onChange([value[0], timeNum < valueNum ? value[0] : time])
          }
        } else {
          onChange([time, time])
        }
      } else {
        onChange([undefined, undefined])
      }
    },
    [value, onChange],
  )

  const getDate = React.useCallback(
    (idx: number) => {
      if (date) {
        return Array.isArray(date) ? date[idx] : date
      }
      return undefined
    },
    [date],
  )

  return (
    <div className={TimePickerRangeStyle.container}>
      <TimePicker
        key="start"
        id="start"
        value={value ? value[0] : undefined}
        date={getDate(0)}
        onChange={onTimeChange}
        clearIcon={clearIcons ? clearIcons[0] : undefined}
        testID={testID1}
      />
      <TimePicker
        key="end"
        id="end"
        value={value ? value[1] : undefined}
        date={getDate(1)}
        onChange={onTimeChange}
        clearIcon={clearIcons ? clearIcons[1] : undefined}
        testID={testID2}
      />
    </div>
  )
}

TimePickerRange.defaultProps = {
  value: undefined,
  date: undefined,
  clearIcons: undefined,
  testID1: undefined,
  testID2: undefined,
}

export default React.memo(TimePickerRange)
