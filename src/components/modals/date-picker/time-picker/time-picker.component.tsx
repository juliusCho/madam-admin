import moment from 'moment'
import * as React from 'react'
import { XEIcon } from '~/components/etc/xeicon'
import customHooks from '~/utils/hooks'
import TimePickerStyle from './time-picker.style'

export interface TimePickerProps {
  id?: 'start' | 'end'
  value?: string
  date?: Date
  onChange: (time?: string, id?: 'start' | 'end') => void
  clearIcon?: string
  testID?: string
  locale?: 'kr' | 'en'
  startHour?: number
  minuteInterval?: 1 | 5 | 10
}

const makeTwoDigits = (num: number) => {
  if (num < 0) {
    return '00'
  }

  return num < 10 ? `0${num}` : String(num).substr(0, 2)
}

const makeMinuteArray = (minuteInterval: 1 | 5 | 10 = 1) => {
  const result: string[] = []

  let maxNum = 0

  switch (minuteInterval) {
    case 5:
      maxNum = 55
      break
    case 10:
      maxNum = 50
      break
    default:
      maxNum = 59
      break
  }

  for (let i = 0; i <= maxNum; i += minuteInterval) {
    result.push(makeTwoDigits(i))
  }

  return result
}

const makeHourArray = () => {
  const result: string[] = []

  for (let i = 0; i <= 23; i += 1) {
    result.push(makeTwoDigits(i))
  }

  return result
}

function TimePicker({
  id,
  value,
  date,
  onChange,
  clearIcon,
  testID,
  locale,
  startHour,
  minuteInterval,
}: TimePickerProps) {
  const [show, setShow] = React.useState(false)
  const [hours, setHours] = React.useState<string[]>([])
  const [minutes, setMinutes] = React.useState<string[]>([])
  const [hour, setHour] = React.useState('')
  const [minute, setMinute] = React.useState('')

  const isMounted = customHooks.useIsMounted()

  const hourRefs: React.RefObject<HTMLLIElement>[] = []

  const makeHours = React.useCallback(() => makeHourArray(), [makeHourArray])
  const makeMinutes = React.useCallback(
    () => makeMinuteArray(minuteInterval),
    [minuteInterval, makeMinuteArray],
  )

  React.useLayoutEffect(() => {
    setHours(() => makeHours())
    setMinutes(() => makeMinutes())
  }, [makeHours, makeMinutes])

  React.useLayoutEffect(() => {
    if (typeof value === 'string' && value.length === 5) {
      setHour(() => value.substr(0, 2))
      setMinute(() => value.substr(3, 2))
    } else {
      setHour(() => '')
      setMinute(() => '')
    }
  }, [value])

  React.useLayoutEffect(() => {
    hours.forEach(() => {
      hourRefs.push(React.createRef<HTMLLIElement>())
    })
  }, [hours, hourRefs])

  React.useEffect(() => {
    if (!isMounted()) return
    if (!show) return
    if (typeof startHour === 'undefined' || startHour <= 0 || startHour >= 24)
      return
    if (hours.length === 0) return
    if (!hourRefs) {
      return
    }

    const idx = hours.findIndex((h) => h === makeTwoDigits(startHour))

    if (idx > -1 && hourRefs[idx]?.current) {
      hourRefs[idx].current?.scrollIntoView({
        block: 'center',
        inline: 'start',
      })
    }
  }, [isMounted, show, startHour, hourRefs, hours.length, makeTwoDigits])

  const dateLabel = React.useMemo(() => {
    if (!date) return ''

    if (Array.isArray(date)) {
      if (date.length === 0) return ''

      return moment(date[0]).format('YYYY/MM/DD')
    }

    return moment(date).format('YYYY/MM/DD')
  }, [date])

  return (
    <div {...TimePickerStyle.container(id)}>
      <span {...TimePickerStyle.dateLabel}>{dateLabel}</span>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          if (date) {
            setShow(true)
          }
        }}
        onKeyPress={(e) => {
          e.preventDefault()
        }}
        {...TimePickerStyle.inputButton(!date)}
        data-testid={testID}>
        <XEIcon
          name={clearIcon?.replace('xi-', '') || ''}
          {...TimePickerStyle.toggleIcon(!date)}
          disabled={!date}
          onClick={date ? () => setShow(true) : undefined}
          testID={`${testID}-button`}
        />
        {value ?? '--:--'}
        {show && (
          <>
            <div
              role="button"
              {...TimePickerStyle.listExterior(id)}
              onClick={(e) => {
                e.stopPropagation()
                setShow(false)
              }}
              tabIndex={0}
              onKeyPress={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}>
              {' '}
            </div>
            <div {...TimePickerStyle.listContainer}>
              <button
                type="button"
                {...TimePickerStyle.listTitle}
                onClick={(e) => {
                  e.stopPropagation()
                  setShow(false)
                }}>
                {value ?? '--:--'}
              </button>
              <div {...TimePickerStyle.listBottom}>
                <div className="w-1/2 h-full">
                  <div
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      onChange(undefined, id)
                    }}
                    {...TimePickerStyle.item(!value)}>
                    {locale === 'kr' ? '미정' : 'Unselected'}
                  </div>
                  <ol {...TimePickerStyle.list()}>
                    {hours.map((h, idx) => (
                      <li
                        key={h}
                        role="option"
                        aria-selected={false}
                        ref={hourRefs[idx]}
                        onKeyPress={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          onChange(`${h}:${minute || '00'}`, id)
                        }}
                        {...TimePickerStyle.item(value?.substr(0, 2) === h)}>
                        {h}
                      </li>
                    ))}
                  </ol>
                </div>
                <ol {...TimePickerStyle.list(true)}>
                  {minutes.map((m) => (
                    <li
                      key={m}
                      role="option"
                      aria-selected={false}
                      onKeyPress={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onClick={(e) => {
                        e.stopPropagation()
                        onChange(`${hour || '00'}:${m}`, id)
                      }}
                      {...TimePickerStyle.item(value?.substr(3, 2) === m)}>
                      {m}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

TimePicker.defaultProps = {
  id: undefined,
  value: undefined,
  date: undefined,
  clearIcon: 'close',
  testID: undefined,
  locale: 'kr',
  startHour: 9,
  minuteInterval: 1,
}

export default React.memo(TimePicker)
