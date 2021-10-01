import moment from 'moment'
import { ROUTER_PATH } from '~/constants/etc'
import helpers from '.'

describe('Helpers', () => {
  it('convertTextToTailwind', () => {
    expect(helpers.convertTextToTailwind('textBig')).toBe(
      'text-textBig font-textBig',
    )
  })

  it('convertColorToTailwind', () => {
    expect(helpers.convertColorToTailwind('bg')).toBe('bg-transparent')
    expect(helpers.convertColorToTailwind('bg', 'mono-black', true)).toBe(
      'bg-mono-black',
    )
    expect(helpers.convertColorToTailwind('bg', 'mono-black')).toBe(
      'bg-mono-black hover:bg-mono-blackHover active:bg-mono-blackActive',
    )
  })

  it('encode && decode', () => {
    expect(helpers.encode('aaa')).not.toBe('aaa')
    expect(helpers.decode(helpers.encode('aaa'))).toBe('aaa')
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
})
