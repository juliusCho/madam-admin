import moment from 'moment'
import React from 'react'
import { ButtonPrevNext } from '../../buttons/prev-next'
import { InputDateTime } from '../../inputs/date-time'

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
  format?: string
  maxDate?: Date
  minDate?: Date
}

function SearchChartDate({
  type,
  onChange,
  date,
  format,
  maxDate,
  minDate,
}: SearchChartDateProps) {
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

  const prevNextClassName = `
    bg-mono-pale hover:bg-mono-paleHover active:bg-mono-paleActive
    text-subTitleBig font-subTitleBig
    text-mono-black hover:text-mono-blackHover active:text-mono-blackActive
  `

  const prevNextDisabledClassName = `
    bg-transparent
    text-subTitleBig font-subTitleBig
    text-mono-lightGray
  `

  return (
    <div className="flex flex-col justify-center items-center mt-6 w-82">
      <ButtonPrevNext
        prevDisabled={prevDisabled()}
        nextDisabled={nextDisabled()}
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
        prevLabel="전 주"
        nextLabel="차 주"
        className="my-2"
        dividerClassName="bg-mono-pale mx-2 w-4"
        prevClassName={prevNextClassName}
        nextClassName={prevNextClassName}
        prevDisabledClassName={prevNextDisabledClassName}
        nextDisabledClassName={prevNextDisabledClassName}
        prevIcon={{
          name: 'angle-left',
          color: 'mono.black',
          size: '1.125rem',
        }}
        nextIcon={{
          name: 'angle-right',
          color: 'mono.black',
          size: '1.125rem',
        }}
      />
      <InputDateTime
        onChange={onChange}
        date={date}
        format={format}
        range={type !== 'day'}
        datePick={type !== 'months'}
        maxDate={maxDate}
        minDate={minDate}
        backgroundColor="bg-main-blue hover:bg-main-blueHover active:bg-main-blueActive"
        textColor="text-mono-white hover:text-mono-whiteHover active:text-mono-whiteActive"
        resetColor="text-mono-lightGray hover:text-mono-lightGrayHover active:text-mono-lightGrayActive"
        placeholderColor="text-mono-lightGray hover:text-mono-lightGrayHover active:text-mono-lightGrayActive"
      />
    </div>
  )
}

SearchChartDate.defaultProps = {
  date: undefined,
  format: 'YYYY-MM-DD',
  maxDate: undefined,
  minDate: undefined,
}

export default React.memo(SearchChartDate)
