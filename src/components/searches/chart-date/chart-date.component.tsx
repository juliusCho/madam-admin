import moment from 'moment'
import React from 'react'
import Recoil from 'recoil'
import deviceGlobalStates from '../../../recoil/device'
import { ButtonPrevNext } from '../../buttons/prev-next'
import { XEIcon } from '../../etc/xeicon'
import { DateTimePicker } from '../../modals/date-picker'
import SearchChartDateStyle from './chart-date.style'

const getPrevNextSequel = (
  type: 'day' | 'days' | 'months',
  prevNext: 'prev' | 'next',
  date: Date,
) => {
  if (prevNext === 'prev') {
    switch (type) {
      case 'day':
        return moment(date).add(-1, 'days').toDate()
      case 'days':
        return [
          moment(date).add(-7, 'days').toDate(),
          moment(date).add(-1, 'days').toDate(),
        ]
      default:
        return [
          moment(date).add(-1, 'days').add(-1, 'months').toDate(),
          moment(date).add(-1, 'days').toDate(),
        ]
    }
  } else {
    switch (type) {
      case 'day':
        return moment(date).add(1, 'days').toDate()
      case 'days':
        return [
          moment(date).add(1, 'days').toDate(),
          moment(date).add(7, 'days').toDate(),
        ]
      default:
        return [
          moment(date).add(1, 'days').toDate(),
          moment(date).add(1, 'days').add(1, 'months').toDate(),
        ]
    }
  }
}

export interface SearchChartDateProps {
  type: 'day' | 'days' | 'months'
  onChange: (date?: Date | Array<Date | undefined>) => void
  date: Date | Array<Date | undefined>
  maxDate?: Date
  minDate?: Date
}

function SearchChartDate({
  type,
  onChange,
  date,
  maxDate,
  minDate,
}: SearchChartDateProps) {
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  const [showPicker, setShowPicker] = React.useState(false)

  const onClick = () => {
    setShowPicker(true)
  }

  const prevDisabled = React.useCallback(() => {
    if (!minDate) return false

    const compareFormat = `YYYYMM${type === 'months' ? '' : 'DD'}`

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

    const compareFormat = `YYYYMM${type === 'months' ? '' : 'DD'}`

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

    const compareFormat = `YYYYMM${type === 'months' ? '' : 'DD'}`
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

    const compareFormat = `YYYYMM${type === 'months' ? '' : 'DD'}`
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

  return (
    <>
      <DateTimePicker
        date={date}
        changeDate={(inputDate?: Date | Array<Date | undefined>) => {
          setShowPicker(false)
          onChange(inputDate)
        }}
        isOpen={showPicker}
        selectRange={type !== 'day'}
        datePick={type !== 'months'}
        minDate={minDate}
        maxDate={maxDate}
      />
      <div className={SearchChartDateStyle.container}>
        <XEIcon
          {...SearchChartDateStyle.icon('calendar-check', device)}
          testID="components.searches.chartDate.pickerCaller"
          onClick={onClick}
          className={SearchChartDateStyle.calendarCaller({ device })}
        />
        <ButtonPrevNext
          prevDisabled={prevDisabled()}
          nextDisabled={nextDisabled()}
          onClickPrev={onClickPrev}
          onClickNext={onClickNext}
          dividerClassName={SearchChartDateStyle.dividerClassName}
          prevClassName={SearchChartDateStyle.prevNextClassName({ device })}
          nextClassName={SearchChartDateStyle.prevNextClassName({ device })}
          prevDisabledClassName={SearchChartDateStyle.prevNextDisabledClassName(
            { device },
          )}
          nextDisabledClassName={SearchChartDateStyle.prevNextDisabledClassName(
            { device },
          )}
          prevIcon={SearchChartDateStyle.icon('angle-left', device)}
          nextIcon={SearchChartDateStyle.icon('angle-right', device)}
        />
      </div>
    </>
  )
}

SearchChartDate.defaultProps = {
  date: undefined,
  maxDate: undefined,
  minDate: undefined,
}

export default React.memo(SearchChartDate)
