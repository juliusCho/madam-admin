import moment from 'moment'
import * as React from 'react'
import customHooks from '../../../utils/hooks'
import { XEIcon } from '../../etc/xeicon'
import { DateTimePicker } from '../../modals/date-picker'
import InputDateTimeStyle from './date-time.style'

export interface InputDateTimeProps {
  onChange: (date?: Date | Array<Date | undefined>) => void
  date?: Date | Array<Date | undefined>
  format?: string
  range?: boolean
  timeSelect?: boolean
  timeRange?: boolean
  datePick?: boolean
  locale?: 'kr' | 'en'
  minDate?: Date
  maxDate?: Date
  disabledText?: string
  style?: React.CSSProperties
  className?: string
  backgroundColor?: string // eg) mono.black, main.red, ...
  borderColor?: string // eg) mono.black, main.red, ...
  textColor?: string // eg) mono.black, main.red, ...
  placeholderColor?: string // eg) mono.black, main.red, ...
  resetColor?: string // eg) mono.black, main.red, ...
  disabled?: boolean
  disabledBackgroundColor?: string // eg) mono.black, main.red, ...
  disabledBorderColor?: string // eg) mono.black, main.red, ...
  disabledTextColor?: string // eg) mono.black, main.red, ...
}

function InputDateTime({
  onChange,
  format,
  range,
  timeSelect,
  timeRange,
  date,
  locale,
  minDate,
  maxDate,
  datePick,
  disabledText,
  style,
  className,
  backgroundColor,
  borderColor,
  textColor,
  placeholderColor,
  resetColor,
  disabled,
  disabledBackgroundColor,
  disabledBorderColor,
  disabledTextColor,
}: InputDateTimeProps) {
  const [showPicker, setShowPicker] = React.useState(false)
  const [dateValue, setDateValue] = React.useState<
    undefined | Date | Array<Date | undefined>
  >()

  const isMounted = customHooks.useIsMounted()

  React.useEffect(() => {
    if (!isMounted()) return

    setDateValue(() => date)
  }, [isMounted, date])

  React.useEffect(() => {
    if (!isMounted()) return
    if (!disabled) return

    setDateValue(() => undefined)
  }, [isMounted, disabled])

  const onClick = () => {
    setShowPicker(true)
  }

  const onUpdate = (inputDate?: Date | Array<Date | undefined>) => {
    setShowPicker(false)

    if (!inputDate) {
      return
    }

    setDateValue(inputDate)
    onChange(inputDate)
  }

  const onCancel = () => {
    setDateValue(undefined)
    onChange()
  }

  const text = React.useCallback(() => {
    if (!isMounted()) {
      return ''
    }

    if (disabled && disabledText) {
      return disabledText
    }

    let msg = ''

    if (dateValue) {
      if ((range || timeRange) && Array.isArray(dateValue)) {
        msg =
          dateValue.length > 1
            ? `${moment(dateValue[0]).format(format)} ~ ${moment(
                dateValue[1],
              ).format(format)}`
            : ''
      } else if (!Array.isArray(dateValue)) {
        msg = moment(dateValue).format(format)
      }
    }

    if (msg) {
      return msg
    }

    return locale === 'en'
      ? `Click & select date${timeSelect ? ' & time' : ''}`
      : `클릭하여 일${timeSelect ? '시' : '자'}를 선택하세요`
  }, [isMounted, dateValue, range, timeSelect, locale, disabled, disabledText])

  return (
    <>
      <DateTimePicker
        date={dateValue}
        changeDate={onUpdate}
        isOpen={showPicker}
        timeDisplay={timeSelect}
        selectRange={range}
        timeRange={timeRange}
        datePick={datePick}
        minDate={minDate}
        maxDate={maxDate}
      />
      <button
        type="button"
        data-testid="input.dateTime.button"
        onClick={onClick}
        disabled={disabled}
        className={`${InputDateTimeStyle.container({
          color: backgroundColor || '',
          disabled,
          disabledColor: disabledBackgroundColor,
          borderColor: borderColor || '',
          disabledBorderColor: disabledBorderColor || '',
        })} ${className}`}
        style={{
          justifyContent: disabled || !dateValue ? 'center' : 'space-between',
          ...style,
        }}>
        {dateValue && (
          <div
            style={{ width: '0.875rem' }}
            className={InputDateTimeStyle.axe}
          />
        )}
        <p
          data-testid="input.dateTime.input"
          className={InputDateTimeStyle.text({
            active: !!dateValue,
            disabled: !!disabled,
            activeColor: textColor || '',
            color: placeholderColor || '',
            disabledColor: disabledTextColor || '',
          })}>
          {text()}
        </p>
        {dateValue && (
          <XEIcon
            name="close"
            size="0.875rem"
            color={resetColor || ''}
            className={InputDateTimeStyle.axe}
            onClick={onCancel}
            testID="input.dateTime.close"
          />
        )}
      </button>
    </>
  )
}

InputDateTime.defaultProps = {
  format: 'YYYY-MM-DD',
  range: false,
  timeSelect: false,
  timeRange: false,
  date: undefined,
  locale: 'kr',
  datePick: true,
  disabledText: undefined,
  style: {},
  className: '',
  backgroundColor:
    'bg-mono-white hover:bg-mono-whiteHover active:bg-mono-whiteActive',
  borderColor:
    'border-mono-lightGray hover:border-mono-lightGrayHover active:border-mono-lightGrayActive',
  textColor:
    'text-main-blue hover:text-main-blueHover active:text-main-blueActive',
  placeholderColor:
    'placeholder-mono-darkGray hover:placeholder-mono-darkGrayHover active:placeholder-mono-darkGrayActive',
  resetColor:
    'text-mono-black hover:text-mono-blackHover active:text-mono-blackActive',
  disabled: false,
  disabledBackgroundColor:
    'bg-mono-lightGray hover:bg-mono-lightGrayHover active:bg-mono-lightGrayActive',
  disabledBorderColor:
    'border-mono-lightGray hover:border-mono-lightGrayHover active:border-mono-lightGrayActive',
  disabledTextColor:
    'text-mono-darkGray hover:text-mono-darkGrayHover active:text-mono-darkGrayActive',
}

export default React.memo(InputDateTime)
