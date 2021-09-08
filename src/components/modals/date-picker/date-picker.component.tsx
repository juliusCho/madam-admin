import moment from 'moment'
import * as React from 'react'
import { ViewCallbackProperties } from 'react-calendar'
import ReactDatePicker from 'react-date-picker'
import customHooks from '../../../utils/hooks'
import './date-picker.style.scss'
import { TimePicker } from './time-picker'
import { TimePickerRange } from './time-picker-range'

const helper = {
  makeTwoDigits(num: number) {
    if (num < 0) {
      return '00'
    }

    return num < 10 ? `0${num}` : String(num).substr(0, 2)
  },
  setValidDateTime(year: number, month: number, day: number) {
    const tmpDateStr = `${String(year)}.${this.makeTwoDigits(
      month + 1,
    )}.${this.makeTwoDigits(day)}`
    let resultYear = year
    let resultMonth = month
    let resultDay = day

    if (year < 0) resultYear = 1

    if (month < 0) resultMonth = 0
    else if (month > 11) resultMonth = 11

    if (day < 0) resultDay = 1
    else if (day > 26 && !moment(tmpDateStr, 'YYYY.MM.DD', true).isValid()) {
      let dt = 31
      let text = `${resultYear}.${this.makeTwoDigits(resultMonth + 1)}.${String(
        dt,
      )}`
      while (!moment(text, 'YYYY.MM.DD', true).isValid()) {
        dt -= 1
        text = `${resultYear}.${this.makeTwoDigits(resultMonth + 1)}.${String(
          dt,
        )}`
      }
      resultDay = dt
    }
    return { year: resultYear, month: resultMonth, day: resultDay }
  },
  convertToDate(input: string) {
    const strings: string[] = input.split(/[- :]/)
    const arr: number[] = strings.map((str) => Number(str))
    if (arr.some((a) => Number.isNaN(a)) || arr.length < 3) return undefined

    const { year, month, day } = this.setValidDateTime(
      arr[0],
      arr[1] - 1,
      arr[2],
    )

    if (arr.length < 6) {
      return new Date(year, month, day, 0, 0, 0)
    }

    let hour = 0
    let min = 0
    let sec = 0

    if (arr[3] > 23) {
      hour = 23
    } else {
      hour = arr[3] < 0 ? 0 : arr[3]
    }

    if (arr[4] > 59) {
      min = 59
    } else {
      min = arr[4] < 0 ? 0 : arr[4]
    }

    if (arr[5] > 59) {
      sec = 59
    } else {
      sec = arr[5] < 0 ? 0 : arr[5]
    }

    return new Date(year, month, day, hour, min, sec)
  },
  dateValidator(input: string) {
    const tmp = input.split('.')

    if (tmp.some((t) => Number.isNaN(t)) || tmp.length < 3) return null

    const { year, month, day } = this.setValidDateTime(
      Number(tmp[0]),
      Number(tmp[1]) - 1,
      Number(tmp[2]),
    )
    return new Date(year, month, day, 0, 0, 0)
  },
}

export interface DateTimePickerProps {
  changeDate:
    | ((date?: Date | Array<Date | undefined>) => void)
    | React.Dispatch<
        React.SetStateAction<Date | Array<Date | undefined> | undefined>
      >
  isOpen: boolean
  date?: Date | Array<Date | undefined>
  selectRange?: boolean
  timeRange?: boolean
  timeDisplay?: boolean
  maxDate?: Date
  minDate?: Date
  calculatedTop?: string
  calculatedLeft?: string
  datePick?: boolean
  locale?: 'kr' | 'en'
}

function DatePicker({
  date, // 날짜 값
  changeDate, // 날짜 변경 callback
  isOpen, // 활성화 여부
  selectRange = false, // 기간 선택 여부
  timeDisplay = false, // 시간 선택 여부
  timeRange = false, // 시간 범위 선택 여부
  maxDate, // 최대 선택 가능 날짜
  minDate, // 최소 선택 가능 날짜
  calculatedTop, // 화면상의 컴포넌트 표시 x-axis
  calculatedLeft, // 화면상의 컴포넌트 표시 y-axis
  datePick = true, // 일자 선택 가능 여부(false면, 월 선택)
  locale,
}: DateTimePickerProps) {
  const [show, setShow] = React.useState(false)
  // 세기/년/월/일 선택 화면 중, 기본화면 모드
  const [viewMode, setViewMode] = React.useState<
    undefined | 'month' | 'year' | 'decade' | 'century'
  >(datePick ? 'month' : 'year')
  // 표시영역 높이
  const [containerHeight, setContainerHeight] = React.useState<string>('')
  // 실제 사용 값
  const [value, setValue] = React.useState<
    Date | Array<Date | undefined> | undefined
  >()
  // 시간 선택 여부
  const [timeSelect, setTimeSelect] = React.useState<boolean | Array<boolean>>(
    selectRange ? [false, false] : false,
  )
  // 시간 값
  const [timeValue, setTimeValue] = React.useState<
    string | Array<string | undefined> | undefined
  >()

  const isMounted = customHooks.useIsMounted()

  const forceUpdate = customHooks.useForceUpdate()

  React.useEffect(() => {
    if (!isMounted() || !isOpen) return

    setTimeout(() => {
      forceUpdate()
    }, 300)
  }, [isMounted, isOpen, forceUpdate])

  React.useEffect(() => {
    if (!isMounted()) return

    if (isOpen) {
      setShow(() => true)
    } else {
      setTimeout(() => {
        setShow(() => false)
      }, 200)
    }
  }, [isMounted, isOpen])

  // prop으로 받아온 날짜 값을 세팅
  React.useEffect(() => {
    if (isMounted()) {
      setViewMode(() => (datePick ? 'month' : 'year'))

      const initialize = () => {
        setValue(() => undefined)
        setTimeSelect(() => false)
        setTimeValue(() => undefined)
      }

      if (date) {
        if (Array.isArray(date)) {
          const momentDt = [
            (date as Date[])[0] ? moment((date as Date[])[0]) : undefined,
            (date as Date[])[1] ? moment((date as Date[])[1]) : undefined,
          ]

          if (!!momentDt[0] && !!momentDt[1]) {
            initialize()
          } else if (!momentDt[0] || !momentDt[1]) {
            setValue(() =>
              momentDt[0] ? momentDt[0].toDate() : momentDt[1]?.toDate(),
            )
            setTimeSelect(() =>
              momentDt[0]
                ? momentDt[0].format('HH:mm') !== '00:00'
                : momentDt[1]?.format('HH:mm') !== '00:00',
            )

            if (momentDt[0]) {
              setTimeValue(() =>
                momentDt[0]?.format('HH:mm') === '00:00'
                  ? undefined
                  : momentDt[0]?.format('HH:mm'),
              )
            } else {
              setTimeValue(() =>
                momentDt[1]?.format('HH:mm') === '00:00'
                  ? undefined
                  : momentDt[1]?.format('HH:mm'),
              )
            }
          } else {
            setValue(() => [
              momentDt[0] ? momentDt[0].toDate() : undefined,
              momentDt[1] ? momentDt[1].toDate() : undefined,
            ])
            setTimeSelect(() => [
              !momentDt[0] || momentDt[0].format('HH:mm') !== '00:00',
              !momentDt[1] || momentDt[1].format('HH:mm') !== '00:00',
            ])
            setTimeValue(() => [
              !momentDt[0] || momentDt[0].format('HH:mm') === '00:00'
                ? undefined
                : momentDt[0].format('HH:mm'),
              !momentDt[1] || momentDt[1].format('HH:mm') === '00:00'
                ? undefined
                : momentDt[1].format('HH:mm'),
            ])
          }
        } else {
          const momentDt = moment(date)

          setValue(() => momentDt.toDate())
          setTimeSelect(() => momentDt.format('HH:mm') !== '00:00')
          setTimeValue(() =>
            momentDt.format('HH:mm') === '00:00'
              ? undefined
              : momentDt.format('HH:mm'),
          )
        }
      } else {
        initialize()
      }
    }
  }, [isMounted, isOpen, date, datePick, selectRange])

  // 세기/년/월/일 선택 화면 변경 시 css 레이아웃 조정
  React.useEffect(() => {
    if (isMounted()) {
      switch (viewMode) {
        case 'month':
          if (timeDisplay) {
            setContainerHeight(() => '29.375rem')
          } else {
            setContainerHeight(() => (selectRange ? '26.25rem' : '21.875rem'))
          }
          break
        case 'century':
          if (timeDisplay) {
            setContainerHeight(() => '35.625rem')
          } else {
            setContainerHeight(() => (selectRange ? '32.5rem' : '28.125rem'))
          }
          break
        default:
          if (timeDisplay) {
            setContainerHeight(() => '31.25rem')
          } else {
            setContainerHeight(() => (selectRange ? '28.125rem' : '23.75rem'))
          }
          break
      }
    }
  }, [isMounted, viewMode, timeDisplay])

  const onViewChange = ({ view }: ViewCallbackProperties) => {
    // eslint-disable-next-line react/prop-types
    if (!datePick && view === 'month') return

    // eslint-disable-next-line react/prop-types
    setViewMode(view)
  }

  // 일자 선택 시, 설정값에 따라 날짜 선택 컴포넌트 표출여부 설정
  const onClickDay = (pickedDate: Date) => {
    if (!selectRange && !timeRange) return

    if (Array.isArray(value) || value === undefined) {
      setValue(() => pickedDate)
    } else if (selectRange) {
      if (
        Number(moment(pickedDate).format('YYYYMMDD')) <
        Number(moment(value).format('YYYYMMDD'))
      ) {
        setValue(() => [pickedDate, value])
      } else {
        setValue(() => [value, pickedDate])
      }
    } else if (timeRange) {
      setValue(() => pickedDate)
    }
    forceUpdate()
  }

  // 날짜 변경 이벤트
  const onDateChange = (pickedDate: Date | Date[]) => {
    if (selectRange || timeRange) return

    setValue(pickedDate)
  }

  // 시간 변경 이벤트
  const onTimeChange = (pickedTime?: string) => {
    setTimeValue(() => pickedTime)
    setTimeSelect(() => !!pickedTime)

    const dtStr = helper.dateValidator(
      moment(value as Date).format('YYYY.MM.DD'),
    )
    if (dtStr) {
      const newDate = helper.convertToDate(
        moment(dtStr).format('YYYY-MM-DD') +
          (pickedTime ? ` ${pickedTime}:00` : ' 00:00:00'),
      )

      if (newDate) {
        setValue(() => newDate)
      }
    }
  }

  // 시간 범위 변경 이벤트
  const onTimeRangeChange = (pickedTime: Array<string | undefined>) => {
    setTimeValue(() => pickedTime)
    setTimeSelect(() => [!!pickedTime[0], !!pickedTime[1]])

    if (!Array.isArray(value)) {
      const dtStr = helper.dateValidator(
        moment(value as Date).format('YYYY.MM.DD'),
      )
      const result = [
        helper.convertToDate(
          moment(dtStr).format('YYYY-MM-DD') +
            (pickedTime[0] ? ` ${pickedTime[0]}:00` : ' 00:00:00'),
        ),
        helper.convertToDate(
          moment(dtStr).format('YYYY-MM-DD') +
            (pickedTime[1] ? ` ${pickedTime[1]}:00` : ' 00:00:00'),
        ),
      ]
      if (result.some((r) => r === null)) return

      setValue(() => result as Date[])
    }
  }

  // 해당 컴포넌트 내 설정된 값 변경 후에 데이터 가공
  const onChange = (pickedDate?: Date | Array<Date | undefined>) => {
    let newDate: Date | Array<Date | undefined> | undefined

    if (selectRange || timeRange) {
      if (timeDisplay) {
        if (Array.isArray(timeValue)) {
          if (Array.isArray(pickedDate)) {
            newDate = [
              pickedDate[0]
                ? helper.convertToDate(
                    moment(pickedDate[0]).format('YYYY-MM-DD') +
                      (timeValue[0] ? ` ${timeValue[0]}:00` : ' 00:00:00'),
                  )
                : undefined,
              pickedDate[1]
                ? helper.convertToDate(
                    moment(pickedDate[1]).format('YYYY-MM-DD') +
                      (timeValue[1] ? ` ${timeValue[1]}:00` : ' 00:00:00'),
                  )
                : undefined,
            ]
          } else if (timeRange) {
            newDate = [
              helper.convertToDate(
                moment(pickedDate).format('YYYY-MM-DD') +
                  (timeValue[0] ? ` ${timeValue[0]}:00` : ' 00:00:00'),
              ),
              helper.convertToDate(
                moment(pickedDate).format('YYYY-MM-DD') +
                  (timeValue[1] ? ` ${timeValue[1]}:00` : ' 00:00:00'),
              ),
            ]
          } else {
            newDate = [
              helper.convertToDate(
                `${moment(pickedDate).format('YYYY-MM-DD')} 00:00:00`,
              ),
              helper.convertToDate(
                `${moment(pickedDate).format('YYYY-MM-DD')} 00:00:00`,
              ),
            ]
          }
        } else if (Array.isArray(pickedDate)) {
          newDate = [
            pickedDate[0]
              ? helper.convertToDate(
                  moment(pickedDate[0]).format('YYYY-MM-DD') +
                    (timeValue ? ` ${timeValue}:00` : ' 00:00:00'),
                )
              : undefined,
            pickedDate[1]
              ? helper.convertToDate(
                  moment(pickedDate[1]).format('YYYY-MM-DD') +
                    (timeValue ? ` ${timeValue}:00` : ' 00:00:00'),
                )
              : undefined,
          ]
        } else if (pickedDate) {
          newDate = timeRange
            ? [
                helper.convertToDate(
                  moment(pickedDate).format('YYYY-MM-DD') +
                    (timeValue ? ` ${timeValue}:00` : ' 00:00:00'),
                ),
                helper.convertToDate(
                  moment(pickedDate).format('YYYY-MM-DD') +
                    (timeValue ? ` ${timeValue}:00` : ' 00:00:00'),
                ),
              ]
            : [
                helper.convertToDate(
                  `${moment(pickedDate).format('YYYY-MM-DD')} 00:00:00`,
                ),
                helper.convertToDate(
                  `${moment(pickedDate).format('YYYY-MM-DD')} 00:00:00`,
                ),
              ]
        }
      } else {
        newDate = [
          helper.convertToDate(
            `${moment(
              Array.isArray(pickedDate)
                ? pickedDate[0] || pickedDate[1]
                : pickedDate,
            ).format('YYYY-MM-DD')} 00:00:00`,
          ),
          helper.convertToDate(
            `${moment(
              Array.isArray(pickedDate)
                ? pickedDate[1] || pickedDate[0]
                : pickedDate,
            ).format('YYYY-MM-DD')} 00:00:00`,
          ),
        ]
      }
    } else {
      newDate = pickedDate
        ? helper.convertToDate(
            moment(pickedDate as Date).format('YYYY-MM-DD') +
              (timeValue ? ` ${timeValue as string}:00` : ' 00:00:00'),
          )
        : undefined
    }
    setValue(() => newDate)

    return newDate
  }

  // 해당 컴포넌트 종료 시에 callback 호출
  const onCalendarClose = () => {
    if (!selectRange && !timeDisplay) {
      if (!value && !date) {
        changeDate(undefined)
      } else if (
        moment(value as Date).format('YYYY-MM-DD') !==
        moment(date as Date).format('YYYY-MM-DD')
      ) {
        changeDate(onChange(value))
      }
    }
  }

  // 컴포넌트 영역 외부 클릭 시, 종료
  const onClickExterior = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    e.preventDefault()

    changeDate(date)
  }

  // 월 선택 이벤트
  const onClickMonth = (inputDate: Date) => {
    setValue(inputDate)
    changeDate(inputDate)
  }

  return (
    <>
      <div
        className="exterior"
        role="button"
        data-testid="calendarPeriod.exterior"
        tabIndex={0}
        onKeyPress={onClickExterior}
        onClick={onClickExterior}
        style={{
          display: show ? 'block' : 'none',
          height: `calc(1000% + ${calculatedTop || '0.063rem'})`,
        }}>
        {' '}
      </div>
      <div
        className={`container bottom-${isOpen ? 'up' : 'down'}`}
        data-testid="calendarPeriod.container"
        style={{
          display: show ? 'block' : 'none',
          height: containerHeight,
          top: calculatedTop,
          left: calculatedLeft,
        }}>
        <ReactDatePicker
          onClickDay={onClickDay}
          onChange={onDateChange}
          value={
            !!value && Array.isArray(value) && !value[1]
              ? undefined
              : (value as Date | Date[] | undefined)
          }
          required
          yearPlaceholder="YYYY"
          monthPlaceholder="MM"
          dayPlaceholder="DD"
          format="yyyy.MM.dd"
          maxDate={maxDate}
          minDate={minDate}
          isOpen={show}
          onCalendarClose={onCalendarClose}
          selectRange={selectRange}
          onClickMonth={datePick ? undefined : onClickMonth}
          onViewChange={onViewChange}
          view={viewMode}
          defaultView={datePick ? undefined : 'year'}
          calendarType="US"
          formatDay={(localeInput: any, d: moment.MomentInput) =>
            moment(d).format('D')
          }
        />
        {timeDisplay &&
          show &&
          ((selectRange && Array.isArray(value)) || timeRange ? (
            <TimePickerRange
              value={timeValue as string[] | undefined}
              date={value}
              onChange={onTimeRangeChange}
              clearIcons={[
                (timeSelect as boolean[])[0]
                  ? 'radiobox-checked'
                  : 'radiobox-blank',
                (timeSelect as boolean[])[1]
                  ? 'radiobox-checked'
                  : 'radiobox-blank',
              ]}
              timeRange={timeRange}
              testID1="calendarPeriod.timepicker1"
              testID2="calendarPeriod.timepicker2"
            />
          ) : (
            <TimePicker
              value={timeValue as string | undefined}
              date={value as Date | undefined}
              onChange={onTimeChange}
              clearIcon={
                (timeSelect as boolean) ? 'radiobox-checked' : 'radiobox-blank'
              }
              testID="calendarPeriod.timepicker"
            />
          ))}
        {(timeDisplay || selectRange) && (
          <button
            type="button"
            className="btn"
            onClick={() => changeDate(onChange(value))}
            data-testid="calendarPeriod.confirm"
            style={{
              padding: '0.313rem',
              left: '40%',
              minWidth: '3.125rem',
            }}>
            {locale === 'kr' ? '확인' : 'Confirm'}
          </button>
        )}
      </div>
    </>
  )
}

DatePicker.defaultProps = {
  date: undefined,
  selectRange: undefined,
  timeRange: undefined,
  timeDisplay: undefined,
  maxDate: undefined,
  minDate: undefined,
  calculatedTop: undefined,
  calculatedLeft: undefined,
  datePick: undefined,
  locale: 'kr',
}

export default React.memo(DatePicker)
