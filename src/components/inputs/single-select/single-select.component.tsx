import React from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select'
import makeAnimated from 'react-select/animated'
import {
  ScreenOptionType,
  SelectOptionType,
  TailwindColorPalette,
  TailwindFontSize,
} from '~/types'
import customHooks from '~/utils/hooks'
import InputSingleSelectStyle from './single-select.style'

const animatedComponents = makeAnimated()

export interface InputSingleSelectProps {
  options: SelectOptionType<string | number | null>[]
  onChange: (value?: string | number | null) => void
  value?: string | number
  disabled?: boolean
  placeholder?: string
  isClearable?: boolean
  width?: string | number
  fontSize?: TailwindFontSize
  fontColor?: TailwindColorPalette
  device?: ScreenOptionType
}

function InputSingleSelect({
  options,
  onChange,
  value,
  disabled,
  placeholder,
  isClearable,
  width,
  fontSize,
  fontColor,
  device,
}: InputSingleSelectProps) {
  const [selected, setSelected] = React.useState<
    SelectOptionType<string | number | null> | undefined
  >(options.find((option) => option.value === value))

  const isMounted = customHooks.useIsMounted()

  React.useEffect(() => {
    if (!isMounted()) return
    if (value === selected?.value) return

    onChange(selected?.value)
  }, [isMounted, selected, onChange, value])

  const onChangeOption = (
    selectedOption: SingleValue<SelectOptionType<string | number | null>>,
    actionMeta: ActionMeta<SelectOptionType<string | number | null>>,
  ) => {
    switch (actionMeta.action) {
      case 'select-option':
        if (selectedOption) {
          setSelected(selectedOption)
        } else {
          setSelected(undefined)
        }
        break
      default:
        setSelected(undefined)
        break
    }
  }

  return (
    <Select<SelectOptionType<string | number | null>>
      value={selected}
      options={options}
      isMulti={false}
      onChange={onChangeOption}
      isDisabled={disabled}
      placeholder={placeholder}
      isClearable={isClearable}
      isSearchable
      components={animatedComponents}
      styles={InputSingleSelectStyle({ width, fontSize, fontColor, device })}
    />
  )
}

InputSingleSelect.defaultProps = {
  value: undefined,
  disabled: false,
  placeholder: undefined,
  isClearable: false,
  width: undefined,
  fontSize: 'textMedium',
  fontColor: 'mono-black',
  device: undefined,
}

export default React.memo(InputSingleSelect)
