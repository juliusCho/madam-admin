import React from 'react'
import { ChartDatePickerOptionType } from '~/types'
import helpers from '~/utils/helpers'

export function useMaxDateAndFormat(rangeOption: ChartDatePickerOptionType) {
  const maxDate = React.useMemo(() => {
    switch (rangeOption) {
      case 'day':
      case 'week':
        return helpers.getYesterday()
      case 'year':
        return helpers.getLastYear()
      default:
        return helpers.getLastMonth()
    }
  }, [rangeOption])

  const format = React.useMemo(() => {
    switch (rangeOption) {
      case 'day':
      case 'week':
      case 'month':
        return 'YYYY-MM-DD'
      default:
        return 'YYYY-MM'
    }
  }, [rangeOption])

  return { maxDate, format }
}
