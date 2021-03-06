import moment from 'moment'
import * as React from 'react'
import { ViewCallbackProperties } from 'react-calendar'
import ReactDatePicker from 'react-date-picker'
import * as helpers from '~/utils/helpers'
import customHooks from '~/utils/hooks'
import './date-picker.style.scss'
import { TimePicker } from './time-picker'
import { TimePickerRange } from './time-picker-range'
import TimePickerRangeStyle from './time-picker-range/time-picker-range.style'

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

  const isMounted = customHooks.useIsMounted()

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
    if (selectRange || timeRange) {
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
  }, [date, selectRange, timeRange])

  React.useEffect(() => {
    if (!isMounted()) return
    if (!isOpen) return

    setLocalDateValue()
  }, [isMounted, isOpen, setLocalDateValue])

  const timeValue = React.useMemo(() => {
    if (!timeDisplay) return undefined

    if (timeRange) {
      if (!value) {
        return [undefined, undefined]
      }

      if (Array.isArray(value)) {
        if (value.length === 0) {
          return [undefined, undefined]
        }

        if (value.length === 1) {
          if (value[0]) {
            const time = moment(value[0]).format('HH:mm')
            return [time, time]
          }
          return [undefined, undefined]
        }

        if (value[0]) {
          return [
            moment(value[0]).format('HH:mm'),
            moment(value[1] ? value[1] : value[0]).format('HH:mm'),
          ]
        }

        if (value[1]) {
          const time = moment(value[1]).format('HH:mm')
          return [time, time]
        }

        return [undefined, undefined]
      }

      const time = moment(value).format('HH:mm')
      return [time, time]
    }

    if (selectRange) {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          return [undefined, undefined]
        }

        return [
          moment(value[0]).format('HH:mm'),
          value.length === 2 ? moment(value[1]).format('HH:mm') : undefined,
        ]
      }

      return moment(value).format('HH:mm')
    }

    if (!value) {
      return undefined
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return undefined
      }

      if (value.length === 1) {
        return value[0] ? moment(value[0]).format('HH:mm') : undefined
      }

      if (value[0]) {
        return moment(value[0]).format('HH:mm')
      }

      return value[1] ? moment(value[1]).format('HH:mm') : undefined
    }

    return moment(value).format('HH:mm')
  }, [value, selectRange, timeRange, timeDisplay])

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

    if (selectRange) {
      if (Array.isArray(value) || value === undefined) {
        setValue(() => pickedDate)
      } else if (
        Number(moment(pickedDate).format('YYYYMMDD')) <
        Number(moment(value).format('YYYYMMDD'))
      ) {
        setValue(() => [pickedDate, value])
      } else {
        setValue(() => [value, pickedDate])
      }
    } else if (timeRange) {
      setValue(() => [pickedDate, pickedDate])
    }
  }

  // 날짜 변경 이벤트
  const onDateChange = (pickedDate: Date | Date[]) => {
    if (selectRange || timeRange) return

    setValue(pickedDate)
  }

  // 시간 변경 이벤트
  const onTimeChange = (pickedTime?: string) => {
    const dtStr = helpers.dateValidator(
      moment(value as Date).format('YYYY.MM.DD'),
    )
    if (dtStr) {
      const newDate = helpers.convertToDate(
        moment(dtStr).format('YYYY-MM-DD') +
          (pickedTime ? ` ${pickedTime}:00` : ' 00:00:00'),
      )

      if (newDate) {
        setValue(() => newDate)
      }
    }
  }

  // 시간 범위 변경 이벤트
  const onTimeRangeChange = React.useCallback(
    (pickedTime: Array<string | undefined>) => {
      if (!Array.isArray(value)) {
        const dtStr = helpers.dateValidator(
          moment(value as Date).format('YYYY.MM.DD'),
        )
        const result = [
          helpers.convertToDate(
            moment(dtStr).format('YYYY-MM-DD') +
              (pickedTime[0] ? ` ${pickedTime[0]}:00` : ' 00:00:00'),
          ),
          helpers.convertToDate(
            moment(dtStr).format('YYYY-MM-DD') +
              (pickedTime[1] ? ` ${pickedTime[1]}:00` : ' 00:00:00'),
          ),
        ]
        if (result.some((r) => r === null)) return

        setValue(() => result as Date[])
      } else if (value.length === 2 && value[0] && value[1]) {
        setValue(() => [
          helpers.convertToDate(
            moment(value[0]).format('YYYY-MM-DD') +
              (pickedTime[0] ? ` ${pickedTime[0]}:00` : ' 00:00:00'),
          ),
          helpers.convertToDate(
            moment(value[1]).format('YYYY-MM-DD') +
              (pickedTime[1] ? ` ${pickedTime[1]}:00` : ' 00:00:00'),
          ),
        ])
      }
    },
    [value, helpers.dateValidator, helpers.convertToDate],
  )

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
                  ? helpers.convertToDate(
                      moment(pickedDate[0]).format('YYYY-MM-DD') +
                        (timeValue[0] ? ` ${timeValue[0]}:00` : ' 00:00:00'),
                    )
                  : undefined,
                pickedDate[1]
                  ? helpers.convertToDate(
                      moment(pickedDate[1]).format('YYYY-MM-DD') +
                        (timeValue[1] ? ` ${timeValue[1]}:00` : ' 00:00:00'),
                    )
                  : undefined,
              ]
            } else if (timeRange) {
              newDate = [
                helpers.convertToDate(
                  moment(pickedDate).format('YYYY-MM-DD') +
                    (timeValue[0] ? ` ${timeValue[0]}:00` : ' 00:00:00'),
                ),
                helpers.convertToDate(
                  moment(pickedDate).format('YYYY-MM-DD') +
                    (timeValue[1] ? ` ${timeValue[1]}:00` : ' 00:00:00'),
                ),
              ]
            } else {
              newDate = [
                helpers.convertToDate(
                  `${moment(pickedDate).format('YYYY-MM-DD')} 00:00:00`,
                ),
                helpers.convertToDate(
                  `${moment(pickedDate).format('YYYY-MM-DD')} 00:00:00`,
                ),
              ]
            }
          } else if (Array.isArray(pickedDate)) {
            newDate = [
              pickedDate[0]
                ? helpers.convertToDate(
                    moment(pickedDate[0]).format('YYYY-MM-DD') +
                      (timeValue ? ` ${timeValue}:00` : ' 00:00:00'),
                  )
                : undefined,
              pickedDate[1]
                ? helpers.convertToDate(
                    moment(pickedDate[1]).format('YYYY-MM-DD') +
                      (timeValue ? ` ${timeValue}:00` : ' 00:00:00'),
                  )
                : undefined,
            ]
          } else if (pickedDate) {
            newDate = timeRange
              ? [
                  helpers.convertToDate(
                    moment(pickedDate).format('YYYY-MM-DD') +
                      (timeValue ? ` ${timeValue}:00` : ' 00:00:00'),
                  ),
                  helpers.convertToDate(
                    moment(pickedDate).format('YYYY-MM-DD') +
                      (timeValue ? ` ${timeValue}:00` : ' 00:00:00'),
                  ),
                ]
              : [
                  helpers.convertToDate(
                    `${moment(pickedDate).format('YYYY-MM-DD')} 00:00:00`,
                  ),
                  helpers.convertToDate(
                    `${moment(pickedDate).format('YYYY-MM-DD')} 00:00:00`,
                  ),
                ]
          }
        } else {
          newDate = [
            helpers.convertToDate(
              `${moment(
                Array.isArray(pickedDate)
                  ? pickedDate[0] || pickedDate[1]
                  : pickedDate,
              ).format('YYYY-MM-DD')} 00:00:00`,
            ),
            helpers.convertToDate(
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
          ? helpers.convertToDate(
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

  const timeComponent = React.useMemo(() => {
    if (!show || !timeDisplay || viewType !== 'month') {
      return null
    }

    if (selectRange && Array.isArray(value)) {
      return (
        <div className={TimePickerRangeStyle.container}>
          <TimePicker
            id="start"
            value={(timeValue as Array<string | undefined>)[0]}
            date={(value as Array<Date | undefined>)[0]}
            onChange={(time) =>
              onTimeRangeChange([
                time,
                (timeValue as Array<string | undefined>)[1],
              ])
            }
            clearIcon={
              (timeValue as Array<string | undefined>)[0]
                ? 'radiobox-checked'
                : 'radiobox-blank'
            }
            testID="calendarPeriod.timepicker1"
          />
          <TimePicker
            id="end"
            value={(timeValue as Array<string | undefined>)[1]}
            date={(value as Array<Date | undefined>)[1]}
            onChange={(time) =>
              onTimeRangeChange([
                (timeValue as Array<string | undefined>)[0],
                time,
              ])
            }
            clearIcon={
              (timeValue as Array<string | undefined>)[1]
                ? 'radiobox-checked'
                : 'radiobox-blank'
            }
            testID="calendarPeriod.timepicker2"
          />
        </div>
      )
    }

    if (timeRange) {
      return (
        <TimePickerRange
          value={timeValue as string[] | undefined}
          date={value}
          onChange={onTimeRangeChange}
          clearIcons={[
            (timeValue as Array<string | undefined>)[0]
              ? 'radiobox-checked'
              : 'radiobox-blank',
            (timeValue as Array<string | undefined>)[1]
              ? 'radiobox-checked'
              : 'radiobox-blank',
          ]}
          testID1="calendarPeriod.timepicker1"
          testID2="calendarPeriod.timepicker2"
        />
      )
    }

    return (
      <TimePicker
        value={timeValue as string | undefined}
        date={value as Date | undefined}
        onChange={onTimeChange}
        clearIcon={timeValue ? 'radiobox-checked' : 'radiobox-blank'}
        testID="calendarPeriod.timepicker"
      />
    )
  }, [
    timeDisplay,
    show,
    viewType,
    timeRange,
    selectRange,
    value,
    timeValue,
    onTimeChange,
    onTimeRangeChange,
  ])

  const confirmDisabled = React.useMemo(() => {
    if (selectRange || timeRange) {
      return (
        !value ||
        !Array.isArray(value) ||
        value.length < 2 ||
        !value[0] ||
        !value[1]
      )
    }

    return !value
  }, [value, selectRange, timeRange])

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
          formatDay={(_: unknown, d: moment.MomentInput) =>
            moment(d).format('D')
          }
        />
        {timeComponent}
        {(timeDisplay || selectRange) && (
          <button
            type="button"
            className={`btn ${confirmDisabled ? 'disabled' : ''}`}
            disabled={confirmDisabled}
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
