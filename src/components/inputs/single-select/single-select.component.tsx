import React from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select'
import makeAnimated from 'react-select/animated'
import { ScreenOptionType } from '~/enums'
import customHooks from '~/utils/hooks'
import InputSingleSelectStyle from './single-select.style'

const animatedComponents = makeAnimated()

type OptionType = {
  value: string | number
  label: string
  isDisabled?: boolean
  isSelected?: boolean
}

export interface InputSingleSelectProps {
  options: OptionType[]
  onChange: (value?: string | number) => void
  value?: string | number
  disabled?: boolean
  placeholder?: string
  isClearable?: boolean
  width?: string | number
  fontSize?: string | number
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
  device,
}: InputSingleSelectProps) {
  const [selected, setSelected] = React.useState<OptionType | undefined>(
    options.find((option) => option.value === value),
  )

  const isMounted = customHooks.useIsMounted()

  React.useEffect(() => {
    if (!isMounted()) return
    if (value === selected?.value) return

    onChange(selected?.value)
  }, [isMounted, selected, onChange, value])

  const onChangeOption = (
    selectedOption: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>,
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
    <Select<OptionType>
      value={selected}
      options={options}
      isMulti={false}
      onChange={onChangeOption}
      isDisabled={disabled}
      placeholder={placeholder}
      isClearable={isClearable}
      isSearchable
      components={animatedComponents}
      styles={InputSingleSelectStyle({ width, fontSize, device })}
    />
  )
}

InputSingleSelect.defaultProps = {
  value: undefined,
  disabled: false,
  placeholder: undefined,
  isClearable: false,
  width: undefined,
  fontSize: undefined,
  device: undefined,
}

export default React.memo(InputSingleSelect)
