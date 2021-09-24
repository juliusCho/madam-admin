import React from 'react'
import Chart from 'react-google-charts'
import Recoil from 'recoil'
import deviceGlobalStates from '../../../recoil/device'
import { ChartDatePickerOption } from '../../../types'
import { SearchChartDate } from '../../searches/chart-date'
import ChartBarLineStyle from './bar-line.style'

export interface ChartBarLineProps {
  title: string
  data: Array<Array<string | number>>
  lineColumnIdx: number
  dateSearch?: {
    type: ChartDatePickerOption
    date?: Date | Array<Date | undefined>
    onChange: (date?: Date | Array<Date | undefined>) => void
    format: string
    maxDate?: Date
    minDate?: Date
  }
  style?: React.CSSProperties
  className?: string
}

function ChartBarLine({
  title,
  data,
  lineColumnIdx,
  dateSearch,
  style,
  className,
}: ChartBarLineProps) {
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  const chartLayoutProps = React.useCallback(() => {
    if (device === 'mobile') {
      return {
        width: 300,
        height: 250,
      }
    }
    return device === 'smallScreen'
      ? {
          width: 400,
          height: 300,
        }
      : {
          width: 550,
          height: 350,
        }
  }, [device])

  return (
    <div
      className={`${ChartBarLineStyle.chart({
        isMobile: device === 'mobile' || device === 'smallScreen',
      })} ${className}`}
      style={style}>
      <span
        className={ChartBarLineStyle.chartLabel({
          isMobile: device === 'mobile' || device === 'smallScreen',
        })}>
        {title}
      </span>
      <Chart
        {...chartLayoutProps()}
        chartType="ComboChart"
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
              fontSize:
                device === 'mobile' || device === 'smallScreen' ? 8 : 16,
            },
          },
          animation: {
            startup: true,
            duration: 200,
            easing: 'inAndOut',
          },
          pointSize: 6,
          lineWidth: 3,
          seriesType: 'bars',
          series: {
            [lineColumnIdx]: { type: 'line' },
          },
        }}
      />
      {dateSearch && (
        <SearchChartDate
          type={dateSearch.type}
          onChange={dateSearch.onChange}
          date={dateSearch.date}
          maxDate={dateSearch.maxDate}
          minDate={dateSearch.minDate}
        />
      )}
    </div>
  )
}

ChartBarLine.defaultProps = {
  dateSearch: undefined,
  style: {},
  className: undefined,
}

export default React.memo(ChartBarLine)
