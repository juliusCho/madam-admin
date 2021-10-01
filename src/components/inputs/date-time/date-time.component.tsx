import moment from 'moment'
import * as React from 'react'
import { XEIcon } from '~/components/etc/xeicon'
import { ModalDateTimePicker } from '~/components/modals/date-picker'
import customHooks from '~/utils/hooks'
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
      <ModalDateTimePicker
        date={dateValue}
        changeDate={onUpdate}
        isOpen={showPicker}
        timeDisplay={timeSelect}
        selectRange={range}
        timeRange={timeRange}
        minDate={minDate}
        maxDate={maxDate}
        viewType={datePick ? 'month' : 'year'}
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
            color={resetColor ?? ''}
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
  backgroundColor: 'mono-white',
  borderColor: 'mono-lightGray',
  textColor: 'main-blue',
  placeholderColor: 'mono-darkGray',
  resetColor: 'mono-black',
  disabled: false,
  disabledBackgroundColor: 'mono-lightGray',
  disabledBorderColor: 'mono-lightGray',
  disabledTextColor: 'mono-darkGray',
}

export default React.memo(InputDateTime)
