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

export interface ModalDateTimePickerProps {
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
  locale?: 'kr' | 'en'
  viewType?: 'month' | 'year' | 'decade' | 'century'
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
  locale,
  viewType,
}: ModalDateTimePickerProps) {
  const [show, setShow] = React.useState(false)
  // 세기/년/월/일 선택 화면 중, 기본화면 모드
  const [viewMode, setViewMode] = React.useState<
    undefined | 'month' | 'year' | 'decade' | 'century'
  >(viewType)
  // 표시영역 높이
  const [containerHeight, setContainerHeight] = React.useState<string>('')
  // 실제 사용 값
  const [value, setValue] = React.useState<
    Date | Array<Date | undefined> | undefined
  >()
  // 시간 선택 여부
  const [timeSelect, setTimeSelect] = React.useState<boolean | Array<boolean>>(
    false,
  )
  // 시간 값
  const [timeValue, setTimeValue] = React.useState<
    string | Array<string | undefined> | undefined
  >()

  const isMounted = customHooks.useIsMounted()

  // const forceUpdate = customHooks.useForceUpdate()

  // React.useEffect(() => {
  //   if (!isMounted() || !isOpen) return

  //   setTimeout(() => {
  //     forceUpdate()
  //   }, 300)
  // }, [isMounted, isOpen, forceUpdate])

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

  const setLocalDateValue = React.useCallback(() => {
    if (selectRange) {
      if (!date) {
        setValue(() => [undefined, undefined])
        return
      }

      if (Array.isArray(date)) {
        if (date.length === 0) {
          setValue(() => [undefined, undefined])
          return
        }

        if (date.length === 1) {
          if (date[0]) {
            setValue(() => [moment(date[0]).toDate(), moment(date[0]).toDate()])
          } else {
            setValue(() => [undefined, undefined])
          }
          return
        }

        if (date[0]) {
          setValue(() => [
            moment(date[0]).toDate(),
            moment(date[1] ? date[1] : date[0]).toDate(),
          ])
          return
        }

        if (date[1]) {
          setValue(() => [moment(date[1]).toDate(), moment(date[1]).toDate()])
          return
        }

        setValue(() => [undefined, undefined])
        return
      }

      setValue(() => [moment(date).toDate(), moment(date).toDate()])
    } else {
      if (!date) {
        setValue(() => undefined)
        return
      }

      if (Array.isArray(date)) {
        if (date.length === 0) {
          setValue(() => undefined)
          return
        }

        if (date.length === 1) {
          if (date[0]) {
            setValue(() => moment(date[0]).toDate())
          } else {
            setValue(() => undefined)
          }
          return
        }

        if (date[0]) {
          setValue(() => moment(date[0]).toDate())
          return
        }

        if (date[1]) {
          setValue(() => moment(date[1]).toDate())
          return
        }

        setValue(() => undefined)
        return
      }

      setValue(() => moment(date).toDate())
    }
  }, [date, selectRange])

  React.useEffect(() => {
    if (!isMounted()) return
    if (!isOpen) return

    setLocalDateValue()
  }, [isMounted, isOpen, setLocalDateValue])

  const setLocalTimeSelect = React.useCallback(() => {
    if (selectRange || timeRange) {
      if (!date) {
        setTimeSelect(() => [false, false])
        return
      }

      if (Array.isArray(date)) {
        if (date.length === 0) {
          setTimeSelect(() => [false, false])
          return
        }

        if (date.length === 1) {
          if (date[0]) {
            const select = moment(date[0]).format('HH::mm') !== '00:00'
            setTimeSelect(() => [select, select])
          } else {
            setTimeSelect(() => [false, false])
          }
          return
        }

        if (date[0]) {
          setTimeSelect(() => [
            moment(date[0]).format('HH::mm') !== '00:00',
            moment(date[1] ? date[1] : date[0]).format('HH::mm') !== '00:00',
          ])
          return
        }

        if (date[1]) {
          const select = moment(date[1]).format('HH::mm') !== '00:00'
          setTimeSelect(() => [select, select])
          return
        }

        setTimeSelect(() => [false, false])
        return
      }

      const select = moment(date).format('HH::mm') !== '00:00'
      setTimeSelect(() => [select, select])
    } else {
      if (!date) {
        setTimeSelect(() => false)
        return
      }

      if (Array.isArray(date)) {
        if (date.length === 0) {
          setTimeSelect(() => false)
          return
        }

        if (date.length === 1) {
          if (date[0]) {
            setTimeSelect(() => moment(date[0]).format('HH:mm') !== '00:00')
          } else {
            setTimeSelect(() => false)
          }
          return
        }

        if (date[0]) {
          setTimeSelect(() => moment(date[0]).format('HH:mm') !== '00:00')
          return
        }

        if (date[1]) {
          setTimeSelect(() => moment(date[1]).format('HH:mm') !== '00:00')
          return
        }

        setTimeSelect(() => false)
        return
      }

      setTimeSelect(() => moment(date).format('HH:mm') !== '00:00')
    }
  }, [date, selectRange, timeRange])

  React.useEffect(() => {
    if (!isMounted()) return
    if (!isOpen) return
    if (!timeDisplay) return

    setLocalTimeSelect()
  }, [isMounted, isOpen, timeDisplay, setLocalTimeSelect])

  const calculateTimeValue = React.useCallback(
    (dt?: Date | Array<Date | undefined>) => {
      if (selectRange || timeRange) {
        if (!dt) {
          return [undefined, undefined]
        }

        if (Array.isArray(dt)) {
          if (dt.length === 0) {
            return [undefined, undefined]
          }

          if (dt.length === 1) {
            if (dt[0]) {
              const time = moment(dt[0]).format('HH:mm')
              return [time, time]
            }
            return [undefined, undefined]
          }

          if (dt[0]) {
            return [
              moment(dt[0]).format('HH:mm'),
              moment(dt[1] ? dt[1] : dt[0]).format('HH:mm'),
            ]
          }

          if (dt[1]) {
            const time = moment(dt[1]).format('HH:mm')
            return [time, time]
          }

          return [undefined, undefined]
        }

        const time = moment(dt).format('HH:mm')
        return [time, time]
      }
      if (!dt) {
        return undefined
      }

      if (Array.isArray(dt)) {
        if (dt.length === 0) {
          return undefined
        }

        if (dt.length === 1) {
          return dt[0] ? moment(dt[0]).format('HH:mm') : undefined
        }

        if (dt[0]) {
          return moment(dt[0]).format('HH:mm')
        }

        return dt[1] ? moment(dt[1]).format('HH:mm') : undefined
      }

      return moment(dt).format('HH:mm')
    },
    [selectRange, timeRange],
  )

  const setLocalTimeValue = React.useCallback(() => {
    setTimeValue(() => calculateTimeValue(date))
  }, [date, selectRange, timeRange])

  React.useEffect(() => {
    if (!isMounted()) return
    if (!isOpen) return
    if (!timeDisplay) return

    setLocalTimeValue()
  }, [isMounted, isOpen, timeDisplay, setLocalTimeValue])

  const refreshLocalTimeValue = React.useCallback(() => {
    setTimeValue(() => calculateTimeValue(date))
  }, [value, selectRange, timeRange])

  React.useEffect(() => {
    if (!isMounted()) return
    if (!isOpen) return
    if (!timeDisplay) return

    refreshLocalTimeValue()
  }, [isMounted, isOpen, timeDisplay, refreshLocalTimeValue])

  React.useEffect(() => {
    if (!isMounted()) return
    if (!isOpen) return

    setViewMode(() => viewType)
  }, [isMounted, viewType, isOpen])

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
    switch (view) {
      case 'month':
        if (viewType !== 'year') {
          setViewMode(view)
        }
        break
      case 'year':
        if (viewType !== 'decade') {
          setViewMode(view)
        }
        break
      default:
        setViewMode(view)
        break
    }
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
    // forceUpdate()
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
  const onChange = React.useCallback(
    (pickedDate?: Date | Array<Date | undefined>) => {
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
    },
    [selectRange, timeRange, timeDisplay, timeValue],
  )

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

  const sortListValue = React.useCallback(
    (dateList: Array<Date | undefined>) => {
      return dateList.sort((a, b) => {
        if (!a) {
          return -1
        }
        if (!b) {
          return 1
        }
        const aNum = Number(moment(a).format('YYYYMMDD'))
        const bNum = Number(moment(b).format('YYYYMMDD'))

        if (aNum > bNum) {
          return 1
        }
        if (aNum < bNum) {
          return -1
        }
        return 0
      })
    },
    [],
  )

  // 월 선택 이벤트
  const onClickMonth = React.useCallback(
    (inputDate: Date) => {
      if (viewType === 'year') {
        if (selectRange) {
          setValue((old) => {
            if (Array.isArray(old)) {
              if (old.length === 0) {
                return [inputDate, undefined]
              }

              if (old.length === 1) {
                if (old[0]) {
                  return sortListValue([old[0], inputDate])
                }
                return [inputDate, undefined]
              }

              if (old[0]) {
                return old[1]
                  ? [inputDate, undefined]
                  : sortListValue([old[0], inputDate])
              }

              return old[1]
                ? sortListValue([inputDate, old[1]])
                : [inputDate, undefined]
            }

            if (old) {
              return sortListValue([old, inputDate])
            }
            return [inputDate, undefined]
          })
          return
        }

        setValue(() => inputDate)
        changeDate(inputDate)
      }
    },
    [viewType, selectRange, changeDate, sortListValue],
  )

  const onClickYear = (inputDate: Date) => {
    if (viewType === 'decade') {
      setValue(inputDate)
      changeDate(inputDate)
    }
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
          onClickMonth={onClickMonth}
          onClickYear={onClickYear}
          onViewChange={onViewChange}
          view={viewMode}
          defaultView={viewType}
          calendarType="US"
          formatDay={(_: any, d: moment.MomentInput) => moment(d).format('D')}
        />
        {timeDisplay &&
          show &&
          viewType === 'month' &&
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
  viewType: 'month',
}

export default React.memo(DatePicker)
