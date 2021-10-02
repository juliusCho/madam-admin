import React from 'react'
import Chart from 'react-google-charts'
import Recoil from 'recoil'
import { SearchChartDate } from '~/components/searches/chart-date'
import deviceGlobalState from '~/states/device'
import { ChartDatePickerOptionType } from '~/types'
import ChartDonutStyle from './donut.style'

type CenterTextType = {
  text: string
  bold?: boolean
}

export interface ChartDonutProps {
  title: string
  data: Array<[string, string] | [string, number]>
  centerText?: CenterTextType | CenterTextType[]
  dateSearch?: {
    type: ChartDatePickerOptionType
    date?: Date | Array<Date | undefined>
    onChange: (date?: Date | Array<Date | undefined>) => void
    format: string
    maxDate?: Date
    minDate?: Date
  }
  colors?: string[]
  style?: React.CSSProperties
  className?: string
}

function ChartDonut({
  title,
  data,
  centerText,
  dateSearch,
  colors,
  style,
  className,
}: ChartDonutProps) {
  const device = Recoil.useRecoilValue(deviceGlobalState.getDevice)

  const chartLayoutProps = React.useCallback(() => {
    if (device === 'mobile') {
      return {
        width: 300,
        height: 270,
      }
    }
    return device === 'smallScreen'
      ? {
          width: 350,
          height: 300,
        }
      : {
          width: 550,
          height: dateSearch ? 350 : 420,
        }
  }, [device, dateSearch])

  const fontSize = React.useCallback(() => {
    return device === 'mobile' || device === 'smallScreen' ? 8 : 13
  }, [device])

  return (
    <div
      className={`${ChartDonutStyle.chart({
        isMobile: device === 'mobile' || device === 'smallScreen',
      })} ${className ?? ''}`}
      style={style}>
      {centerText && (
        <div
          className={ChartDonutStyle.centerTextContainer({
            isMobile: device === 'mobile',
            dateSearch: !!dateSearch,
          })}>
          <span
            className={ChartDonutStyle.centerText({
              isSmallScreen: device === 'mobile' || device === 'smallScreen',
              bold: Array.isArray(centerText)
                ? centerText[0].bold
                : centerText.bold,
            })}>
            {Array.isArray(centerText) ? centerText[0].text : centerText.text}
          </span>
          {Array.isArray(centerText) && centerText.length > 1 && (
            <span
              className={`mt-2 ${ChartDonutStyle.centerText({
                isSmallScreen: device === 'mobile' || device === 'smallScreen',
                bold: centerText[1].bold,
              })}`}>
              {centerText[1].text}
            </span>
          )}
        </div>
      )}
      <span
        className={ChartDonutStyle.chartLabel({
          isMobile: device === 'mobile' || device === 'smallScreen',
        })}>
        {title}
      </span>
      <Chart
        {...chartLayoutProps()}
        chartType="PieChart"
        data={data}
        options={{
          pieSliceTextStyle: {
            fontSize: fontSize(),
          },
          pieHole: centerText ? 0.6 : 0,
          legend: {
            alignment: 'center',
            position: 'top',
            textStyle: {
              fontSize: fontSize(),
            },
          },
          backgroundColor: 'transparent',
          chartArea: {
            left: 50,
            top: 70,
            right: 50,
            bottom: 20,
          },
          pieSliceBorderColor: 'white',
          sliceVisibilityThreshold: 0,
          colors,
        }}
      />
      {dateSearch && (
        <SearchChartDate
          type={dateSearch.type}
          onChange={dateSearch.onChange}
          date={dateSearch.date}
          maxDate={dateSearch.maxDate}
          minDate={dateSearch.minDate}
          typeShow={{
            showWeek: true,
          }}
          optionDisabled
        />
      )}
    </div>
  )
}

ChartDonut.defaultProps = {
  dateSearch: undefined,
  colors: undefined,
  centerText: undefined,
  style: {},
  className: undefined,
}

export default React.memo(ChartDonut)
