import moment from 'moment'
import * as React from 'react'
import customHooks from '~/utils/hooks'
import { TimePicker } from '../time-picker'
import TimePickerRangeStyle from './time-picker-range.style'

export interface TimePickerRangeProps {
  value?: string[]
  date?: Date | Array<Date | undefined>
  onChange: (value: Array<string | undefined>) => void
  clearIcons?: string[]
  timeRange: boolean
  testID1?: string
  testID2?: string
}

function TimePickerRange({
  value,
  date,
  onChange,
  clearIcons,
  timeRange,
  testID1,
  testID2,
}: TimePickerRangeProps) {
  const isMounted = customHooks.useIsMounted()

  const onTimeChange = (time?: string, id?: 'start' | 'end') => {
    if (!isMounted() || !id) return
    if (value) {
      if (id === 'start') {
        onChange([time, value[1]])
      } else {
        onChange([value[0], time])
      }
      if (
        timeRange &&
        !!time &&
        date &&
        (!Array.isArray(date) ||
          date.length === 1 ||
          moment(date[0]).format('YYYYMMDD') ===
            moment(date[1]).format('YYYYMMDD'))
      ) {
        if (id === 'start') {
          if (
            !!value[1] &&
            Number(time.replace(':', '')) > Number(value[1].replace(':', ''))
          ) {
            onChange([value[1], value[1]])
          }
        } else if (
          !!value[0] &&
          Number(time.replace(':', '')) < Number(value[0].replace(':', ''))
        ) {
          onChange([value[0], value[0]])
        }
      }
    } else if (id === 'start') {
      onChange([time, undefined])
    } else {
      onChange([undefined, time])
    }
  }

  const getDate = React.useCallback(
    (idx: number) => {
      if (!isMounted()) return undefined

      if (date) {
        return Array.isArray(date) ? date[idx] : date
      }
      return undefined
    },
    [isMounted, date],
  )

  const removingStyle: React.CSSProperties = {
    position: 'unset' as const,
    bottom: 0,
  }

  return (
    <div className={TimePickerRangeStyle.container}>
      <TimePicker
        key="start"
        id="start"
        value={value ? value[0] : undefined}
        date={getDate(0)}
        onChange={onTimeChange}
        style={removingStyle}
        clearIcon={clearIcons ? clearIcons[0] : undefined}
        testID={testID1}
      />
      <TimePicker
        key="end"
        id="end"
        value={value ? value[1] : undefined}
        date={getDate(1)}
        onChange={onTimeChange}
        style={{ ...removingStyle, marginRight: '0.7rem' }}
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
