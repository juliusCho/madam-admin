import React from 'react'
import Recoil from 'recoil'
import XEIcon from '~/components/etc/xeicon/xeicon.component'
import etcGlobalState from '~/states/etc'
import { TailwindColorPalette } from '~/types'
import customHooks from '~/utils/hooks'
import InputTextLineStyle from './text-line.style'

const seperateMeasurement = (num: string | number) => {
  const len = Number(String(num).replace(/em|rem|ex|ch|vw|vh|%|vmin|vmax/g, ''))
  return {
    len,
    measurement: String(num).substr(String(len).length, String(num).length),
  }
}

const preventInput = (e: KeyboardEvent) => {
  if (['-', '+', 'e'].includes(e.key) || !/^[0-9]*$/g.test(e.key)) {
    e.preventDefault()
  }
}

export interface InputTextLineProps {
  value?: string
  onSubmit?: (text: string) => void
  onChange?: (text: string) => void
  onFocus?: () => void
  onBlur?: () => void
  style?: React.CSSProperties
  className?: string
  inputStyle?: React.CSSProperties
  inputClassName?: string
  inputColor?: TailwindColorPalette // eg) mono.black, main.red, ...
  inputBorderColor?: TailwindColorPalette // eg) mono.black, main.red, ...
  inputTextColor?: TailwindColorPalette // eg) mono.black, main.red, ...
  inputPlaceholderColor?: TailwindColorPalette // eg) mono.black, main.red, ...
  inputResetColor?: TailwindColorPalette // eg) mono.black, main.red, ...
  placeholder?: string
  locale?: 'kr' | 'en'
  type?: 'text' | 'email' | 'number' | 'password' | 'tel' | 'url'
  disabled?: boolean
  disabledInputColor?: TailwindColorPalette // eg) mono.black, main.red, ...
  disabledPlaceholderColor?: TailwindColorPalette // eg) mono.black, main.red, ...
  maxLength?: number
}

function InputTextLine({
  value,
  onSubmit,
  onChange,
  onFocus,
  onBlur,
  style,
  className,
  inputStyle,
  inputClassName,
  inputColor,
  inputBorderColor,
  inputTextColor,
  inputPlaceholderColor,
  inputResetColor,
  placeholder,
  locale,
  type,
  disabled,
  disabledPlaceholderColor,
  disabledInputColor,
  maxLength,
}: InputTextLineProps) {
  const [text, setText] = React.useState('')
  const [isInput, setIsInput] = React.useState(false)

  const setAlert = Recoil.useSetRecoilState(etcGlobalState.alertState)

  const isMounted = customHooks.useIsMounted()

  const { len: fontSize } = seperateMeasurement(inputStyle?.fontSize || 14)

  const inputRef = React.createRef<HTMLInputElement>()

  React.useEffect(() => {
    if (!isMounted() || !inputRef?.current || type !== 'number') return () => {}

    inputRef.current.addEventListener('keydown', preventInput)

    return () => {
      inputRef?.current?.removeEventListener('keydown', preventInput)
    }
  }, [isMounted, inputRef, type])

  React.useEffect(() => {
    if (isMounted()) {
      setText(() => value || '')
    }
  }, [isMounted, value])

  React.useEffect(() => {
    if (!isMounted()) return

    if (text.length === 0) {
      setIsInput(() => false)
    } else {
      setIsInput(() => true)
    }
  }, [isMounted, text])

  React.useEffect(() => {
    if (!isMounted()) return
    if (!disabled) return

    setText(() => '')
  }, [isMounted, disabled])

  const onAdd = () => {
    if (text === '') {
      setAlert((old) => ({
        ...old,
        show: true,
        type: 'warning',
        msg:
          locale === 'kr'
            ? '입력된 텍스트가 없습니다.'
            : 'No text has been added.',
        time: 1000,
      }))
      return
    }
    if (text.length > Number(maxLength)) {
      setAlert((old) => ({
        ...old,
        show: true,
        type: 'warning',
        msg:
          locale === 'kr'
            ? `최대 ${maxLength}자 까지 입력 가능합니다.`
            : `Maximum input text length must be less than or equal to ${maxLength}.`,
        time: 1500,
      }))
      return
    }

    if (onSubmit) {
      onSubmit(text)
    }
  }

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onAdd()
    }
  }

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target

    if (inputValue.length > Number(maxLength)) {
      setAlert((old) => ({
        ...old,
        show: true,
        type: 'warning',
        msg:
          locale === 'kr'
            ? `최대 ${maxLength}자 까지 입력 가능합니다.`
            : `Maximum input text length must be less than or equal to ${maxLength}.`,
        time: 1500,
      }))

      setText(inputValue.substr(0, maxLength))
      return
    }

    setText(inputValue)

    if (onChange) {
      onChange(inputValue)
    }
  }

  const onCancel = () => {
    setText('')

    if (onChange) {
      onChange('')
    }
  }

  return (
    <div
      className={`${InputTextLineStyle.container} ${className}`}
      style={style}>
      <div
        className={`${InputTextLineStyle.inputContainer({
          color: inputColor,
          borderColor: inputBorderColor,
          disabled,
          disabledColor: disabledInputColor,
        })} ${inputClassName}`}
        style={inputStyle}>
        <input
          type={type}
          ref={inputRef}
          data-testid="input.textLine.input"
          className={`${InputTextLineStyle.input({
            color: inputTextColor ?? 'mono-black',
            placeholderColor: inputPlaceholderColor ?? 'mono-gray',
            disabled,
            disabledColor: disabledInputColor,
            disabledPlaceholderColor,
          })} ${InputTextLineStyle.text({ input: !!text })}`}
          disabled={disabled}
          value={text}
          onChange={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          style={{
            fontSize: inputStyle?.fontSize,
            cursor: disabled ? 'not-allowed' : 'text',
          }}
          onKeyUp={onKeyUp}
          placeholder={placeholder || ''}
        />
        {isInput && (
          <XEIcon
            name="close"
            size={fontSize}
            color={inputResetColor ?? 'mono-black'}
            style={{ backgroundColor: 'transparent' }}
            className={InputTextLineStyle.axe}
            onClick={onCancel}
            testID="input.textLine.close"
          />
        )}
      </div>
    </div>
  )
}

InputTextLine.defaultProps = {
  value: '',
  onSubmit: undefined,
  onChange: undefined,
  onFocus: undefined,
  onBlur: undefined,
  style: {},
  className: '',
  inputStyle: {},
  inputClassName: '',
  inputColor: undefined,
  inputBorderColor: 'mono-pale',
  inputTextColor: 'mono-black`',
  inputPlaceholderColor: 'mono-gray',
  inputResetColor: 'mono-black',
  placeholder: '',
  locale: 'kr',
  type: 'text',
  disabled: false,
  disabledInputColor: 'mono-lightGray',
  disabledPlaceholderColor: 'mono-darkGray',
  maxLength: 200,
}

export default React.memo(InputTextLine)
