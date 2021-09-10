import React from 'react'
import Chart from 'react-google-charts'
import { MAX_WEB_BROWSER_WIDTH_FOR_DASHBOARD } from '../../../constants'
import helpers from '../../../utils/helpers'
import customHooks from '../../../utils/hooks'
import { SearchChartDate } from '../../search/chart-date'
import ChartLineStyle from './line.style'

export interface ChartLineProps {
  title: string
  data: Array<Array<Record<string, string> | Array<string | number>>>
  dateSearch?: {
    type: 'day' | 'days' | 'months'
    date?: Date | Array<Date | undefined>
    onChange: (date?: Date | Array<Date | undefined>) => void
    format: string
    maxDate?: Date
    minDate?: Date
  }
  style?: React.CSSProperties
  className?: string
}

function ChartLine({
  title,
  data,
  dateSearch,
  style,
  className,
}: ChartLineProps) {
  const [isMobile, setIsMobile] = React.useState(helpers.isMobile())
  const [isSmallScreen, setIsSmallScreen] = React.useState(
    helpers.isMobile(MAX_WEB_BROWSER_WIDTH_FOR_DASHBOARD),
  )

  customHooks.useCheckMobile(setIsMobile)
  customHooks.useCheckMobile(
    setIsSmallScreen,
    MAX_WEB_BROWSER_WIDTH_FOR_DASHBOARD,
  )

  const chartLayoutProps = React.useCallback(() => {
    if (isMobile) {
      return {
        width: 300,
        height: 250,
      }
    }
    return isSmallScreen
      ? {
          width: 400,
          height: 300,
        }
      : {
          width: 550,
          height: 350,
        }
  }, [isMobile, isSmallScreen])

  return (
    <div
      className={`${ChartLineStyle.chart({
        isMobile: isSmallScreen,
      })} ${className}`}
      style={style}>
      <span
        className={ChartLineStyle.chartLabel({
          isMobile: isSmallScreen,
        })}>
        {title}
      </span>
      {dateSearch && (
        <SearchChartDate
          type={dateSearch.type}
          onChange={dateSearch.onChange}
          date={dateSearch.date}
          format={dateSearch.format}
          maxDate={dateSearch.maxDate}
          minDate={dateSearch.minDate}
        />
      )}
      <Chart
        {...chartLayoutProps()}
        chartType="LineChart"
        data={data}
        options={{
          backgroundColor: 'transparent',
          chartArea: {
            left: 70,
            top: 70,
            right: 20,
            bottom: 50,
          },
          legend: {
            alignment: 'center',
            position: 'top',
            textStyle: {
              fontSize: isSmallScreen ? 8 : 16,
            },
          },
          animation: {
            startup: true,
            duration: 200,
            easing: 'inAndOut',
          },
          pointSize: 6,
          lineWidth: 3,
        }}
      />
    </div>
  )
}

ChartLine.defaultProps = {
  dateSearch: undefined,
  style: {},
  className: undefined,
}

export default React.memo(ChartLine)
