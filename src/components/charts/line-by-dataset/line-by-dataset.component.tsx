import React from 'react'
import Chart from 'react-google-charts'
import Recoil from 'recoil'
import { ButtonPrevNext } from '~/components/buttons/prev-next'
import { InputSingleSelect } from '~/components/inputs/single-select'
import deviceGlobalStates from '~/states/device'
import ChartLineByDatasetStyle from './line-by-dataset.style'

export interface ChartLineByDatasetProps {
  title: string
  data: Array<Array<Record<string, string>> | Array<string | number>>
  displayCounts: number[]
  onChangeDisplayDataCount: (count: number) => void
  prev: {
    onClick: () => void
    disabled?: boolean
  }
  next: {
    onClick: () => void
    disabled?: boolean
  }
  colors?: string[]
  style?: React.CSSProperties
  className?: string
}

function ChartLineByDataset({
  title,
  data,
  displayCounts,
  onChangeDisplayDataCount,
  prev,
  next,
  colors,
  style,
  className,
}: ChartLineByDatasetProps) {
  const device = Recoil.useRecoilValue(deviceGlobalStates.getDevice)

  const [displayCount, setDisplayCount] = React.useState(
    Number(displayCounts[0]),
  )

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

  const options = React.useMemo(() => {
    return displayCounts.map((value) => ({
      value,
      label: String(value),
      isSelected: value === displayCount,
    }))
  }, [displayCounts, displayCount])

  const onChangeDisplayCount = (value?: number | string) => {
    if (Number.isNaN(value)) return

    onChangeDisplayDataCount(Number(value))
    setDisplayCount(Number(value))
  }

  return (
    <div
      className={`${ChartLineByDatasetStyle.chart({
        isMobile: device === 'mobile' || device === 'smallScreen',
      })} ${className}`}
      style={style}>
      <span
        className={ChartLineByDatasetStyle.chartLabel({
          isMobile: device === 'mobile' || device === 'smallScreen',
        })}>
        {title}
      </span>
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
              fontSize:
                device === 'mobile' || device === 'smallScreen' ? 8 : 13,
            },
          },
          animation: {
            startup: true,
            duration: 200,
            easing: 'inAndOut',
          },
          pointSize: 6,
          lineWidth: 3,
          colors,
          hAxis: {
            textStyle: {
              fontSize: 12,
            },
          },
        }}
      />
      <div className={ChartLineByDatasetStyle.selectContainer}>
        <div className={ChartLineByDatasetStyle.comboBoxContainer}>
          <p className={ChartLineByDatasetStyle.comboBoxLabel}>
            필드 표시 개수
          </p>
          <InputSingleSelect
            value={displayCount}
            options={options}
            onChange={onChangeDisplayCount}
            width={
              device === 'mobile' || device === 'smallScreen'
                ? '100px'
                : '150px'
            }
            fontSize="15px"
          />
        </div>
        <ButtonPrevNext
          prev={{
            onClick: prev.onClick,
            disabled: prev.disabled,
            icon: ChartLineByDatasetStyle.icon(
              'angle-left',
              device,
              'mono-white',
              prev.disabled,
            ),
            borderColor: 'main-navy',
            backgroundColor: 'main-blue',
            disabledColor: 'mono-lightGray',
            fontSize:
              device === 'mobile' || device === 'smallScreen'
                ? 'textBig'
                : 'subTitleBig',
            extraClassName: prev.disabled
              ? undefined
              : ChartLineByDatasetStyle.prevNextClassName({ device }),
          }}
          next={{
            onClick: next.onClick,
            disabled: next.disabled,
            icon: ChartLineByDatasetStyle.icon(
              'angle-right',
              device,
              'mono-white',
              next.disabled,
            ),
            borderColor: 'main-navy',
            backgroundColor: 'main-blue',
            disabledColor: 'mono-lightGray',
            fontSize:
              device === 'mobile' || device === 'smallScreen'
                ? 'textBig'
                : 'subTitleBig',
            extraClassName: next.disabled
              ? undefined
              : ChartLineByDatasetStyle.prevNextClassName({ device }),
          }}
          dividerClassName={ChartLineByDatasetStyle.dividerClassName}
        />
      </div>
    </div>
  )
}

ChartLineByDataset.defaultProps = {
  colors: undefined,
  dateSearch: undefined,
  style: {},
  className: undefined,
}

export default React.memo(ChartLineByDataset)
