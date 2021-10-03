import React from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select'
import makeAnimated from 'react-select/animated'
import customHooks from '~/utils/hooks'
import InputMultiSelectStyle from './multi-select.style'

const animatedComponents = makeAnimated()

type OptionType = {
  value: string | number
  label: string
  isDisabled?: boolean
  isSelected?: boolean
}

export interface InputMultiSelectProps {
  options: OptionType[]
  onChange: (value?: Array<string | number>) => void
  value?: Array<string | number>
  disabled?: boolean
  placeholder?: string
  isClearable?: boolean
  width?: string | number
  fontSize?: string | number
}

function InputMultiSelect({
  options,
  onChange,
  value,
  disabled,
  placeholder,
  isClearable,
  width,
  fontSize,
}: InputMultiSelectProps) {
  const [selected, setSelected] = React.useState<OptionType[] | undefined>(
    options.filter((option) => value?.some((val) => val === option.value)),
  )

  const isMounted = customHooks.useIsMounted()

  React.useEffect(() => {
    if (!isMounted()) return
    if (selected?.some((sel) => !value?.some((val) => sel.value === val)))
      return

    onChange(selected?.map((sel) => sel.value))
  }, [isMounted, selected, onChange, value])

  const onChangeOption = (
    selectedOption: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>,
  ) => {
    switch (actionMeta.action) {
      case 'select-option':
        if (selectedOption) {
          setSelected((oldList) =>
            oldList ? oldList?.concat(selectedOption) : [selectedOption],
          )
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
      onChange={onChangeOption}
      isDisabled={disabled}
      placeholder={placeholder}
      isClearable={isClearable}
      isSearchable
      components={animatedComponents}
      styles={InputMultiSelectStyle({ width, fontSize })}
    />
  )
}

InputMultiSelect.defaultProps = {
  value: undefined,
  disabled: false,
  placeholder: undefined,
  isClearable: false,
  width: undefined,
  fontSize: undefined,
}

export default React.memo(InputMultiSelect)
