import React from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select'
import makeAnimated from 'react-select/animated'
import { ScreenOptionType, SelectOptionType } from '~/types'
import customHooks from '~/utils/hooks'
import InputSingleSelectStyle from './single-select.style'

const animatedComponents = makeAnimated()

export interface InputSingleSelectProps {
  options: SelectOptionType<string | number>[]
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
  const [selected, setSelected] = React.useState<
    SelectOptionType<string | number> | undefined
  >(options.find((option) => option.value === value))

  const isMounted = customHooks.useIsMounted()

  React.useEffect(() => {
    if (!isMounted()) return
    if (value === selected?.value) return

    onChange(selected?.value)
  }, [isMounted, selected, onChange, value])

  const onChangeOption = (
    selectedOption: SingleValue<SelectOptionType<string | number>>,
    actionMeta: ActionMeta<SelectOptionType<string | number>>,
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
    <Select<SelectOptionType<string | number>>
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
