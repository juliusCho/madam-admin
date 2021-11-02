/* eslint-disable no-case-declarations */
import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import { ButtonPrevNext } from '~/components/buttons/prev-next'
import { XEIcon } from '~/components/etc/xeicon'
import { ModalDateTimePicker } from '~/components/modals/date-picker'
import { ModalDatePickerOption } from '~/components/modals/date-picker-option'
import { ChartDatePickerOptionType, CHART_DATE_PICKER_OPTION } from '~/enums'
import deviceGlobalStates from '~/states/device'
import helpers from '~/utils/helpers'
import SearchChartDateStyle from './chart-date.style'

const getPrevNextSequel = (
  type: ChartDatePickerOptionType,
  prevNext: 'prev' | 'next',
  date: Date,
) => {
  let end = new Date()

  if (prevNext === 'prev') {
    switch (type) {
      case 'day':
        return moment(date).add(-1, 'days').toDate()
      case 'week':
        return [
          moment(date).add(-7, 'days').toDate(),
          moment(date).add(-1, 'days').toDate(),
        ]
      case 'month':
        end = moment(date).add(-1, 'months').toDate()

        return [
          moment(date).add(-1, 'months').date(1).toDate(),
          new Date(end.getFullYear(), end.getMonth() + 1, 0),
        ]
      case '3-months':
        end = moment(date).add(-1, 'months').date(1).toDate()

        return [
          moment(date).add(-3, 'months').date(1).toDate(),
          new Date(end.getFullYear(), end.getMonth() + 1, 0),
        ]
      case '6-months':
        end = moment(date).add(-1, 'months').toDate()

        return [
          moment(date).add(-6, 'months').date(1).toDate(),
          new Date(end.getFullYear(), end.getMonth() + 1, 0),
        ]
      default:
        return [
          moment(date).add(-1, 'years').month(0).date(1).toDate(),
          moment(date).add(-1, 'years').month(11).date(31).toDate(),
        ]
    }
  } else {
    switch (type) {
      case 'day':
        return moment(date).add(1, 'days').toDate()
      case 'week':
        return [
          moment(date).add(1, 'days').toDate(),
          moment(date).add(7, 'days').toDate(),
        ]
      case 'month':
        end = moment(date).add(1, 'months').toDate()

        return [
          moment(date).add(1, 'months').date(1).toDate(),
          new Date(end.getFullYear(), end.getMonth() + 1, 0),
        ]
      case '3-months':
        end = moment(date).add(3, 'months').date(1).toDate()

        return [
          moment(date).add(1, 'months').date(1).toDate(),
          new Date(end.getFullYear(), end.getMonth() + 1, 0),
        ]
      case '6-months':
        end = moment(date).add(6, 'months').toDate()

        return [
          moment(date).add(1, 'months').date(1).toDate(),
          new Date(end.getFullYear(), end.getMonth() + 1, 0),
        ]
      default:
        return [
          moment(date).add(1, 'years').month(0).date(1).toDate(),
          moment(date).add(1, 'years').month(11).date(31).toDate(),
        ]
    }
  }
}

export interface SearchChartDateProps {
  type: ChartDatePickerOptionType
  onChange: (
    date?: Date | Array<Date | undefined>,
    type?: ChartDatePickerOptionType,
  ) => void
  date: Date | Array<Date | undefined>
  optionDisabled?: boolean
  typeShow: {
    showOneDay?: boolean
    showWeek?: boolean
    showMonth?: boolean
    show3Month?: boolean
    show6Month?: boolean
    showYear?: boolean
  }
  maxDate?: Date
  minDate?: Date
}

function SearchChartDate({
  type,
  onChange,
  date,
  optionDisabled,
  typeShow,
  maxDate,
  minDate,
}: SearchChartDateProps) {
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  const [showPicker, setShowPicker] = React.useState(false)
  const [showPickerOption, setShowPickerOption] = React.useState(false)

  const onClick = () => {
    setShowPicker(true)
  }

  const prevDisabled = React.useCallback(() => {
    if (!minDate) return false

    const compareFormat = `YYYYMM${
      type === 'day' || type === 'week' || type === 'month' ? 'DD' : ''
    }`

    const minDt = Number(moment(minDate).format(compareFormat))

    let dt = 0
    if (Array.isArray(date)) {
      dt = Number(moment(date[0]).format(compareFormat))
    } else {
      dt = Number(moment(date).format(compareFormat))
    }

    return dt <= minDt
  }, [type, date, minDate])

  const nextDisabled = React.useCallback(() => {
    if (!maxDate) return false

    const compareFormat = `YYYYMM${
      type === 'day' || type === 'week' || type === 'month' ? 'DD' : ''
    }`

    const maxDt = Number(moment(maxDate).format(compareFormat))

    let dt = 0
    if (Array.isArray(date)) {
      dt = Number(
        moment(date.length === 1 || !date[1] ? date[0] : date[1]).format(
          compareFormat,
        ),
      )
    } else {
      dt = Number(moment(date).format(compareFormat))
    }

    return dt >= maxDt
  }, [type, date, maxDate])

  const getPrevDate = React.useCallback(
    (inputDate: Date): Date | Date[] => {
      return getPrevNextSequel(type, 'prev', inputDate)
    },
    [type],
  )

  const getNextDate = React.useCallback(
    (inputDate: Date): Date | Date[] => {
      return getPrevNextSequel(type, 'next', inputDate)
    },
    [type],
  )

  const onClickPrev = React.useCallback(() => {
    const currMinDate = getPrevDate(
      Array.isArray(date) ? date[0] ?? date[1] ?? new Date() : date,
    )

    if (!minDate || type === 'day') {
      onChange(currMinDate)
      return
    }

    const minDt = moment(minDate)
    const compareDtMin = moment(
      Array.isArray(currMinDate) ? currMinDate[0] : currMinDate,
    )
    const compareDtMax = moment(
      Array.isArray(currMinDate)
        ? currMinDate[1] ?? currMinDate[0]
        : currMinDate,
    )

    const compareFormat = `YYYYMM${
      type === 'week' || type === 'month' ? 'DD' : ''
    }`
    const minDtNum = Number(moment(minDt).format(compareFormat))
    const compareDtMinNum = Number(moment(compareDtMin).format(compareFormat))
    const compareDtMaxNum = Number(moment(compareDtMax).format(compareFormat))

    if (compareDtMaxNum < minDtNum) {
      onChange([minDt.toDate(), minDt.toDate()])
      return
    }

    if (compareDtMinNum < minDtNum) {
      onChange([minDt.toDate(), compareDtMax.toDate()])
      return
    }

    onChange([compareDtMin.toDate(), compareDtMax.toDate()])
  }, [minDate, getPrevDate, date, type, onChange])

  const onClickNext = React.useCallback(() => {
    const currMaxDate = getNextDate(
      Array.isArray(date) ? date[1] ?? date[0] ?? new Date() : date,
    )

    if (!maxDate || type === 'day') {
      onChange(currMaxDate)
      return
    }

    const maxDt = moment(maxDate)
    const compareDtMin = moment(
      Array.isArray(currMaxDate) ? currMaxDate[0] : currMaxDate,
    )
    const compareDtMax = moment(
      Array.isArray(currMaxDate)
        ? currMaxDate[1] ?? currMaxDate[0]
        : currMaxDate,
    )

    const compareFormat = `YYYYMM${
      type === 'week' || type === 'month' ? 'DD' : ''
    }`
    const maxDtNum = Number(moment(maxDt).format(compareFormat))
    const compareDtMinNum = Number(moment(compareDtMin).format(compareFormat))
    const compareDtMaxNum = Number(moment(compareDtMax).format(compareFormat))

    if (compareDtMinNum > maxDtNum) {
      onChange([maxDt.toDate(), maxDt.toDate()])
      return
    }

    if (compareDtMaxNum > maxDtNum) {
      onChange([compareDtMin.toDate(), maxDt.toDate()])
      return
    }

    onChange([compareDtMin.toDate(), compareDtMax.toDate()])
  }, [maxDate, getNextDate, date, type, onChange])

  const viewType = React.useMemo(() => {
    switch (type) {
      case 'day':
      case 'week':
        return 'month'
      case 'year':
        return 'decade'
      default:
        return 'year'
    }
  }, [type])

  const changeOption = React.useCallback(
    (optionType: ChartDatePickerOptionType) => {
      setShowPickerOption(() => false)

      let newDate: Date | undefined | Array<Date | undefined>

      switch (optionType) {
        case 'day':
          newDate = [helpers.getYesterday(true), helpers.getYesterday()]
          break
        case 'week':
          newDate = [helpers.getLastWeek(), helpers.getYesterday()]
          break
        case 'month':
          newDate = [helpers.getLastMonth(), helpers.getYesterday()]
          break
        case '3-months':
          newDate = [helpers.getPreviousThreeMonth(), helpers.getLastMonth()]
          break
        case '6-months':
          newDate = [helpers.getPreviousSixMonth(), helpers.getLastMonth()]
          break
        case 'year':
          newDate = [helpers.getLastYear(true), helpers.getLastYear()]
          break
        default:
          newDate = date
          break
      }

      onChange(newDate, optionType)
    },
    [
      helpers.getYesterday,
      helpers.getLastMonth,
      helpers.getLastWeek,
      helpers.getPreviousThreeMonth,
      helpers.getPreviousSixMonth,
      helpers.getLastYear,
      onChange,
    ],
  )

  const dateRange = React.useMemo(() => {
    if (!Array.isArray(date) || date.length < 2) return ''
    if (!date[0] || !date[1]) return ''

    if (type === 'day' || type === 'week' || type === 'month') {
      return `${moment(date[0]).format('YYYY.MM.DD')} ~ ${moment(
        date[1],
      ).format('YYYY.MM.DD')}`
    }
    return `${moment(date[0]).format('YYYY.MM')} ~ ${moment(date[1]).format(
      'YYYY.MM',
    )}`
  }, [device, type, date])

  return (
    <>
      <ModalDateTimePicker
        date={date}
        changeDate={(inputDate?: Date | Array<Date | undefined>) => {
          setShowPicker(false)
          onChange(inputDate)
        }}
        isOpen={showPicker}
        selectRange={
          type === 'week' || type === '3-months' || type === '6-months'
        }
        minDate={minDate}
        maxDate={maxDate}
        viewType={viewType}
      />
      <ModalDatePickerOption
        show={showPickerOption}
        type={type}
        {...typeShow}
        changeOption={changeOption}
      />
      <div className={SearchChartDateStyle.container}>
        <div className={SearchChartDateStyle.leftCallerContainer}>
          <XEIcon
            {...SearchChartDateStyle.icon(
              'calendar-check',
              device,
              'mono-white',
            )}
            testID="components.searches.chartDate.pickerCaller"
            onClick={onClick}
            className={SearchChartDateStyle.calendarCaller({ device })}
          />
          <button
            type="button"
            disabled={optionDisabled}
            onClick={() => setShowPickerOption(true)}
            className={SearchChartDateStyle.optionContainer({
              device,
              disabled: optionDisabled,
            })}>
            <XEIcon
              {...SearchChartDateStyle.icon(
                'bars',
                device,
                'mono-white',
                optionDisabled,
              )}
              testID="components.searches.chartDate.pickerOptionCaller"
              onClick={
                optionDisabled ? undefined : () => setShowPickerOption(true)
              }
              className={SearchChartDateStyle.optionCaller({
                disabled: optionDisabled,
              })}
            />
            {`${CHART_DATE_PICKER_OPTION[type]}${
              device === 'mobile' || device === 'smallScreen' ? '' : ' :'
            }`}
            {(device === 'mediumScreen' || device === 'screen') && (
              <p
                className={SearchChartDateStyle.optionDateLabel({
                  disabled: optionDisabled,
                })}>
                {dateRange}
              </p>
            )}
          </button>
        </div>
        <ButtonPrevNext
          prev={{
            disabled: prevDisabled(),
            onClick: onClickPrev,
            icon: SearchChartDateStyle.icon(
              'angle-left',
              device,
              'mono-white',
              prevDisabled(),
            ),
            borderColor: 'main-navy',
            backgroundColor: 'main-blue',
            disabledColor: 'mono-lightGray',
            fontSize:
              device === 'mobile' || device === 'smallScreen'
                ? 'textBig'
                : 'subTitleBig',
            extraClassName: prevDisabled()
              ? undefined
              : SearchChartDateStyle.prevNextClassName({ device }),
          }}
          next={{
            disabled: nextDisabled(),
            onClick: onClickNext,
            icon: SearchChartDateStyle.icon(
              'angle-right',
              device,
              'mono-white',
              nextDisabled(),
            ),
            borderColor: 'main-navy',
            backgroundColor: 'main-blue',
            disabledColor: 'mono-lightGray',
            fontSize:
              device === 'mobile' || device === 'smallScreen'
                ? 'textBig'
                : 'subTitleBig',
            extraClassName: nextDisabled()
              ? undefined
              : SearchChartDateStyle.prevNextClassName({ device }),
          }}
          dividerClassName={SearchChartDateStyle.dividerClassName}
        />
      </div>
    </>
  )
}

SearchChartDate.defaultProps = {
  optionDisabled: false,
  date: undefined,
  maxDate: undefined,
  minDate: undefined,
}

export default React.memo(SearchChartDate)
