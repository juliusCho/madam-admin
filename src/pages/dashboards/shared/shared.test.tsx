import React from 'react'
import * as helpers from '~/utils/helpers'
import { useMaxDateAndFormat } from '.'

describe('dashboard - shared test', () => {
  describe('useMaxDateAndFormat', () => {
    it('day', () => {
      ;(() => {
        const { maxDate, format } = useMaxDateAndFormat('day')
        expect(maxDate).toBe(helpers.getYesterday())
        expect(format).toBe('YYYY-MM-DD')
        return null
      }) as React.ReactNode
    })

    it('week', () => {
      ;(() => {
        const { maxDate, format } = useMaxDateAndFormat('week')
        expect(maxDate).toBe(helpers.getYesterday())
        expect(format).toBe('YYYY-MM-DD')
        return null
      }) as React.ReactNode
    })

    it('month', () => {
      ;(() => {
        const { maxDate, format } = useMaxDateAndFormat('month')
        expect(maxDate).toBe(helpers.getLastMonth())
        expect(format).toBe('YYYY-MM-DD')
        return null
      }) as React.ReactNode
    })

    it('3-months', () => {
      ;(() => {
        const { maxDate, format } = useMaxDateAndFormat('3-months')
        expect(maxDate).toBe(helpers.getLastMonth())
        expect(format).toBe('YYYY-MM')
        return null
      }) as React.ReactNode
    })

    it('6-months', () => {
      ;(() => {
        const { maxDate, format } = useMaxDateAndFormat('6-months')
        expect(maxDate).toBe(helpers.getLastMonth())
        expect(format).toBe('YYYY-MM')
        return null
      }) as React.ReactNode
    })

    it('year', () => {
      ;(() => {
        const { maxDate, format } = useMaxDateAndFormat('year')
        expect(maxDate).toBe(helpers.getLastYear())
        expect(format).toBe('YYYY-MM')
        return null
      }) as React.ReactNode
    })
  })
})
