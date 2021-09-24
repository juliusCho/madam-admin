import moment from 'moment'
import helpers from '.'
import { ROUTER_PATH } from '../../constants'

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

  it('getDateRangeArray', () => {
    let result = ['', '']
    const format = 'YYYYMMDD'

    const set = (date?: Date | Array<undefined | Date>) => {
      if (!date) return
      if (!Array.isArray(date)) return
      if (date.length <= 1) return
      if (!date[0] || !date[1]) return

      result = [moment(date[0]).format(format), moment(date[1]).format(format)]
    }

    helpers.changeChartDate(set, undefined, 'day')
    setTimeout(() => {
      expect(result[0]).toBe(moment().add(-1, 'days').format(format))
      expect(result[1]).toBe(moment().add(-1, 'days').format(format))
    }, 100)
  })
})
