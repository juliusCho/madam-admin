import moment from 'moment'
import { ROUTER_PATH } from '~/constants/etc'
import helpers from '.'

describe('Helpers', () => {
  it('convertColorToTailwind', () => {
    expect(helpers.convertColorToTailwind('bg')).toBe('bg-transparent')
    expect(helpers.convertColorToTailwind('bg', 'mono-black', true)).toBe(
      'bg-mono-black',
    )
    expect(helpers.convertColorToTailwind('bg', 'mono-black')).toBe(
      'bg-mono-black hover:bg-mono-blackHover active:bg-mono-blackActive',
    )
  })

  it('convertFontToTailwindClass', () => {
    expect(helpers.convertFontToTailwindClass()).toBe('')
    expect(helpers.convertFontToTailwindClass('subBig')).toBe(
      'text-subBig font-subBig',
    )
  })

  it('convertFontSizeToCSSSize', () => {
    expect(helpers.convertFontSizeToCSSSize()).toBe('1rem')
    expect(helpers.convertFontSizeToCSSSize('subTitleBig')).toBe('1.125rem')
  })

  it('convertBorderRadiusDirectionToTailwindClass', () => {
    expect(helpers.convertBorderRadiusDirectionToTailwindClass()).toBe('')
    expect(helpers.convertBorderRadiusDirectionToTailwindClass('top')).toBe(
      '-t',
    )
    expect(
      helpers.convertBorderRadiusDirectionToTailwindClass('bottom-left'),
    ).toBe('-bl')
  })

  it('convertBorderRadiusToTailwindClass', () => {
    expect(helpers.convertBorderRadiusToTailwindClass()).toBe('')
    expect(helpers.convertBorderRadiusToTailwindClass('2xl')).toBe(
      'rounded-2xl',
    )
    expect(helpers.convertBorderRadiusToTailwindClass('full', 'bottom')).toBe(
      'rounded-b-full',
    )
    expect(
      helpers.convertBorderRadiusToTailwindClass('basic', 'top-left'),
    ).toBe('rounded-tl')
  })

  it('convertBorderDirectionToTailwindClass', () => {
    expect(helpers.convertBorderDirectionToTailwindClass()).toBe('')
    expect(helpers.convertBorderDirectionToTailwindClass('bottom')).toBe('-b')
  })

  it('convertBorderStyleToTailwindClass', () => {
    expect(helpers.convertBorderStyleToTailwindClass()).toBe('')
    expect(
      helpers.convertBorderStyleToTailwindClass('solid', false, 'bottom'),
    ).toBe('border-b border-solid')
    expect(
      helpers.convertBorderStyleToTailwindClass('dashed', true, 'top'),
    ).toBe('border-t-2 border-dashed')
  })

  it('separateCSSValueToLengthAndUnit', () => {
    expect(helpers.separateCSSValueToLengthAndUnit()).toStrictEqual({
      length: 0,
      unit: 'px',
    })
    expect(helpers.separateCSSValueToLengthAndUnit('2px')).toStrictEqual({
      length: 2,
      unit: 'px',
    })
    expect(helpers.separateCSSValueToLengthAndUnit('480rem')).toStrictEqual({
      length: 480,
      unit: 'rem',
    })
  })

  it('encode && decode', () => {
    expect(helpers.encode('aaa')).not.toBe('aaa')
    expect(helpers.decode(helpers.encode('aaa'))).toBe('aaa')
  })

  it('validateEmail', () => {
    expect(helpers.validateEmail('joanav')).toBeFalsy()
    expect(helpers.validateEmail('joanav@')).toBeFalsy()
    expect(helpers.validateEmail('joanav@se')).toBeFalsy()
    expect(helpers.validateEmail('joanav@se.com')).toBeTruthy()
  })

  it('firstDepthTab', () => {
    const routersOnWeb = helpers.firstDepthTab(ROUTER_PATH.DASHBOARD.APP_USE)
    const routersOnMobile = helpers.firstDepthTab(
      ROUTER_PATH.DASHBOARD.APP_USE,
      'mobile',
    )
    expect(routersOnWeb.length).toBe(6)
    expect(routersOnMobile.length).toBe(1)

    expect(routersOnWeb[0].selected).toBeTruthy()
    expect(routersOnWeb[1].selected).toBeFalsy()
  })

  it('secondDepthTab', () => {
    const routers = helpers.secondDepthTab(ROUTER_PATH.DASHBOARD.APP_USE)
    expect(routers.DASHBOARD.length).toBe(5)
    expect(routers.SYSTEM_VARIABLE.length).toBe(3)
    expect(routers.HELP_DESK.length).toBe(6)
    expect(routers.USER.length).toBe(4)

    expect(routers.DASHBOARD[0].selected).toBeTruthy()
    expect(routers.DASHBOARD[1].selected).toBeFalsy()
    expect(routers.HELP_DESK[0].selected).toBeFalsy()
  })

  it('convertToMoneyFormat', () => {
    expect(helpers.convertToMoneyFormat(0)).toBe('0')
    expect(helpers.convertToMoneyFormat(1)).toBe('1')
    expect(helpers.convertToMoneyFormat(123)).toBe('123')
    expect(helpers.convertToMoneyFormat(1234)).toBe('1,234')
    expect(helpers.convertToMoneyFormat(123478)).toBe('123,478')
    expect(helpers.convertToMoneyFormat(1234789)).toBe('1,234,789')
    expect(helpers.convertToMoneyFormat(-1234789)).toBe('-1,234,789')
  })

  describe('getDateRangeArray', () => {
    let result = ['', '']
    let format = 'YYYYMMDD'

    const set = jest.fn((date?: Date | Array<undefined | Date>) => {
      if (!date) return
      if (!Array.isArray(date)) return
      if (date.length <= 1) return
      if (!date[0] || !date[1]) return

      result = [moment(date[0]).format(format), moment(date[1]).format(format)]
    })

    it('day', () => {
      helpers.changeChartDate(set, undefined, 'day')

      setTimeout(() => {
        expect(set).toHaveBeenCalled()
        expect(result[0]).toEqual(moment().add(-1, 'days').format(format))

        helpers.changeChartDate(set, new Date(), 'day')

        setTimeout(() => {
          expect(result[0]).toEqual(moment().format(format))

          helpers.changeChartDate(set, [], 'day')

          setTimeout(() => {
            expect(result[0]).toEqual(moment().add(-1, 'days').format(format))

            helpers.changeChartDate(
              set,
              [moment().add(-2, 'days').toDate()],
              'day',
            )

            setTimeout(() => {
              expect(result[0]).toEqual(moment().add(-2, 'days').format(format))

              helpers.changeChartDate(
                set,
                [moment().add(-3, 'days').toDate(), new Date()],
                'day',
              )

              setTimeout(() => {
                expect(result[0]).toEqual(
                  moment().add(-3, 'days').format(format),
                )
              }, 100)
            }, 100)
          }, 100)
        }, 100)
      }, 100)
    })

    it('week', () => {
      helpers.changeChartDate(set, undefined, 'week')

      setTimeout(() => {
        expect(result[0]).toEqual(moment().add(-7, 'days').format(format))
        expect(result[1]).toEqual(moment().add(-1, 'days').format(format))

        helpers.changeChartDate(set, new Date(), 'week')

        setTimeout(() => {
          expect(result[0]).toBe(moment().add(-6, 'days').format(format))
          expect(result[1]).toBe(moment().format(format))

          helpers.changeChartDate(set, [], 'week')

          setTimeout(() => {
            expect(result[0]).toEqual(moment().add(-7, 'days').format(format))
            expect(result[1]).toEqual(moment().add(-1, 'days').format(format))

            helpers.changeChartDate(set, [new Date()], 'week')

            setTimeout(() => {
              expect(result[0]).toBe(moment().add(-6, 'days').format(format))
              expect(result[1]).toBe(moment().format(format))

              helpers.changeChartDate(
                set,
                [moment().add(-3, 'days').toDate(), new Date()],
                'week',
              )

              setTimeout(() => {
                expect(result[0]).toBe(moment().add(-9, 'days').format(format))
                expect(result[1]).toBe(moment().add(-3, 'days').format(format))
              }, 100)
            }, 100)
          }, 100)
        }, 100)
      }, 100)
    })

    it('month', () => {
      helpers.changeChartDate(set, undefined, 'month')

      setTimeout(() => {
        expect(result[0]).toBe(
          moment().add(-1, 'months').date(1).format(format),
        )

        helpers.changeChartDate(set, new Date(), 'month')

        setTimeout(() => {
          expect(result[0]).toBe(moment().date(1).format(format))

          helpers.changeChartDate(set, [], 'month')

          setTimeout(() => {
            expect(result[0]).toBe(
              moment().add(-1, 'months').date(1).format(format),
            )

            helpers.changeChartDate(
              set,
              [moment().add(-7, 'months').date(15).toDate()],
              'month',
            )

            setTimeout(() => {
              expect(result[0]).toBe(
                moment().add(-7, 'months').date(1).format(format),
              )

              helpers.changeChartDate(
                set,
                [moment().add(-12, 'months').toDate(), new Date()],
                'month',
              )
              setTimeout(() => {
                expect(result[0]).toBe(
                  moment().add(-12, 'months').date(1).format(format),
                )
              }, 100)
            }, 100)
          }, 100)
        }, 100)
      }, 100)
    })

    it('3-months', () => {
      format = 'YYYYMM'

      helpers.changeChartDate(set, undefined, '3-months')

      setTimeout(() => {
        expect(result[0]).toEqual(moment().add(-3, 'months').format(format))
        expect(result[1]).toEqual(moment().add(-1, 'months').format(format))

        helpers.changeChartDate(set, new Date(), '3-months')

        setTimeout(() => {
          expect(result[0]).toBe(moment().add(-2, 'months').format(format))
          expect(result[1]).toBe(moment().format(format))

          helpers.changeChartDate(set, [], '3-months')

          setTimeout(() => {
            expect(result[0]).toEqual(moment().add(-3, 'months').format(format))
            expect(result[1]).toEqual(moment().add(-1, 'months').format(format))

            helpers.changeChartDate(set, [new Date()], '3-months')

            setTimeout(() => {
              expect(result[0]).toBe(moment().add(-2, 'months').format(format))
              expect(result[1]).toBe(moment().format(format))

              helpers.changeChartDate(
                set,
                [moment().add(-3, 'months').toDate(), new Date()],
                '3-months',
              )

              setTimeout(() => {
                expect(result[0]).toBe(
                  moment().add(-5, 'months').format(format),
                )
                expect(result[1]).toBe(
                  moment().add(-3, 'months').format(format),
                )
              }, 100)
            }, 100)
          }, 100)
        }, 100)
      }, 100)
    })

    it('6-months', () => {
      format = 'YYYYMM'

      helpers.changeChartDate(set, undefined, '6-months')

      setTimeout(() => {
        expect(result[0]).toEqual(moment().add(-6, 'months').format(format))
        expect(result[1]).toEqual(moment().add(-1, 'months').format(format))

        helpers.changeChartDate(set, new Date(), '6-months')

        setTimeout(() => {
          expect(result[0]).toBe(moment().add(-5, 'months').format(format))
          expect(result[1]).toBe(moment().format(format))

          helpers.changeChartDate(set, [], '6-months')

          setTimeout(() => {
            expect(result[0]).toEqual(moment().add(-6, 'months').format(format))
            expect(result[1]).toEqual(moment().add(-1, 'months').format(format))

            helpers.changeChartDate(set, [new Date()], '6-months')

            setTimeout(() => {
              expect(result[0]).toBe(moment().add(-5, 'months').format(format))
              expect(result[1]).toBe(moment().format(format))

              helpers.changeChartDate(
                set,
                [moment().add(-3, 'months').toDate(), new Date()],
                '6-months',
              )

              setTimeout(() => {
                expect(result[0]).toBe(
                  moment().add(-8, 'months').format(format),
                )
                expect(result[1]).toBe(
                  moment().add(-3, 'months').format(format),
                )
              }, 100)
            }, 100)
          }, 100)
        }, 100)
      }, 100)
    })

    it('year', () => {
      format = 'YYYYMM'

      helpers.changeChartDate(set, undefined, 'year')

      setTimeout(() => {
        expect(result[0]).toBe(
          moment().add(-1, 'year').month(0).date(1).format(format),
        )
        expect(result[1]).toBe(
          moment().add(-1, 'year').month(11).date(31).format(format),
        )

        helpers.changeChartDate(set, new Date(), 'year')

        setTimeout(() => {
          expect(result[0]).toBe(moment().month(0).date(1).format(format))
          expect(result[1]).toBe(moment().month(11).date(31).format(format))

          helpers.changeChartDate(set, [], 'year')

          setTimeout(() => {
            expect(result[0]).toBe(
              moment().add(-1, 'year').month(0).date(1).format(format),
            )
            expect(result[1]).toBe(
              moment().add(-1, 'year').month(11).date(31).format(format),
            )

            helpers.changeChartDate(
              set,
              [moment().add(-7, 'months').date(15).toDate()],
              'year',
            )

            setTimeout(() => {
              expect(result[0]).toBe(
                moment()
                  .add(-1, 'years')
                  .add(-6, 'months')
                  .date(1)
                  .format(format),
              )
              const momentDt = moment().add(-7, 'months').toDate()
              expect(result[1]).toBe(
                moment(
                  new Date(momentDt.getFullYear(), momentDt.getMonth() + 1, 0),
                ).format(format),
              )

              helpers.changeChartDate(
                set,
                [moment().add(-12, 'months').toDate(), new Date()],
                'year',
              )
              setTimeout(() => {
                expect(result[0]).toBe(
                  moment().add(-2, 'year').month(0).date(1).format(format),
                )
                expect(result[1]).toBe(
                  moment().add(-2, 'year').month(11).date(31).format(format),
                )
              }, 100)
            }, 100)
          }, 100)
        }, 100)
      }, 100)
    })
  })

  it('getFlagEmoji', () => {
    const emoji = helpers.getFlagEmoji('EN')

    expect(emoji).toBeTruthy()
  })

  it('convertFirestoreDataToModel', () => {
    const currMoment = moment()

    const firestoreData = {
      text: 'text',
      date: {
        seconds: currMoment.unix(),
      },
    }

    const result = helpers.convertFirestoreDataToModel(firestoreData)

    expect(result.text).toBe('text')
    expect(typeof result.date).toBe('object')
    expect(moment(result.date).format('YYYY-MM-DD')).toBe(
      currMoment.format('YYYY-MM-DD'),
    )
  })

  it('makeTwoDigits', () => {
    expect(helpers.makeTwoDigits(10)).toBe('10')
    expect(helpers.makeTwoDigits(1)).toBe('01')
  })

  it('setValidDateTime', () => {
    const { year, month, day } = helpers.setValidDateTime(2021, 11, 1)
    expect(year).toBe(2021)
    expect(month).toBe(11)
    expect(day).toBe(1)

    const { month: invalidMonth } = helpers.setValidDateTime(2021, 12, 1)
    expect(invalidMonth).toBe(11)

    const { month: underMonth } = helpers.setValidDateTime(2021, -1, 1)
    expect(underMonth).toBe(0)

    const { day: overDay } = helpers.setValidDateTime(2021, 2, 32)
    expect(overDay).toBe(31)

    const { day: underDay } = helpers.setValidDateTime(2021, 3, 0)
    expect(underDay).toBe(1)
  })

  it('convertToDate', () => {
    const result = helpers.convertToDate('2021-04-07 00:00:00')
    expect(moment(result).format('YYYY-MM-DD HH:mm:ss')).toBe(
      '2021-04-07 00:00:00',
    )
    const second = helpers.convertToDate('2021-04-07 59:00')
    expect(moment(second).format('YYYY-MM-DD HH:mm:ss')).toBe(
      '2021-04-07 00:00:00',
    )
  })

  it('dateValidator', () => {
    expect(
      moment(helpers.dateValidator('2021.12.01')).format('YYYY-MM-DD HH:mm:ss'),
    ).toBe('2021-12-01 00:00:00')
    expect(
      moment(helpers.dateValidator('2021.53.01')).format('YYYY-MM-DD HH:mm:ss'),
    ).toBe('2021-12-01 00:00:00')
    expect(helpers.dateValidator('w34yshr')).toBeNull()
  })
})
