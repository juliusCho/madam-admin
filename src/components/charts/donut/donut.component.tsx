import React from 'react'
import Chart from 'react-google-charts'
import { MAX_WEB_BROWSER_WIDTH_FOR_DASHBOARD } from '../../../constants'
import helpers from '../../../utils/helpers'
import customHooks from '../../../utils/hooks'
import ChartDonutStyle from './donut.style'

type CenterTextType = {
  text: string
  bold?: boolean
}

export interface ChartDonutProps {
  title: string
  data: Array<[string, string] | [string, number]>
  centerText?: CenterTextType | CenterTextType[]
  style?: React.CSSProperties
  className?: string
}

function ChartDonut({
  title,
  data,
  centerText,
  style,
  className,
}: ChartDonutProps) {
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
        height: 270,
      }
    }
    return isSmallScreen
      ? {
          width: 350,
          height: 300,
        }
      : {
          width: 500,
          height: 420,
        }
  }, [isMobile, isSmallScreen])

  const fontSize = React.useCallback(() => {
    return isSmallScreen ? 8 : 16
  }, [isSmallScreen])

  return (
    <div
      className={`${ChartDonutStyle.chart({
        isMobile: isSmallScreen,
      })} ${className ?? ''}`}
      style={style}>
      {centerText && (
        <div className={ChartDonutStyle.centerTextContainer}>
          <span
            className={ChartDonutStyle.centerText({
              isSmallScreen,
              bold: Array.isArray(centerText)
                ? centerText[0].bold
                : centerText.bold,
            })}>
            {Array.isArray(centerText) ? centerText[0].text : centerText.text}
          </span>
          {Array.isArray(centerText) && centerText.length > 1 && (
            <span
              className={`mt-2 ${ChartDonutStyle.centerText({
                isSmallScreen,
                bold: centerText[1].bold,
              })}`}>
              {centerText[1].text}
            </span>
          )}
        </div>
      )}
      <span
        className={ChartDonutStyle.chartLabel({
          isMobile: isSmallScreen,
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
        }}
      />
    </div>
  )
}

ChartDonut.defaultProps = {
  centerText: undefined,
  style: {},
  className: undefined,
}

export default React.memo(ChartDonut)
