import React from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select'
import customHooks from '~/utils/hooks'

type OptionType = {
  value: string | number
  label: string
  disabled?: boolean
  selected?: boolean
}

export interface InputSingleSelectProps {
  options: OptionType[]
  onChange: (value?: string | number) => void
  value?: string | number
  disabled?: boolean
  placeholder?: string
}

function InputSingleSelect({
  options,
  onChange,
  value,
  disabled,
  placeholder,
}: InputSingleSelectProps) {
  const [selected, setSelected] = React.useState<OptionType | undefined>()

  const isMounted = customHooks.useIsMounted()

  React.useEffect(() => {
    if (!isMounted()) return
    if (options.length === 0) return
    if (value === selected?.value) return

    setSelected(() => options.find((option) => option.value === value))
  }, [isMounted, value, selected, options])

  const onChangeOption = (
    selectedOption: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>,
  ) => {
    switch (actionMeta.action) {
      case 'select-option':
        onChange(selectedOption?.value)
        break
      default:
        onChange()
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
    />
  )
}

InputSingleSelect.defaultProps = {
  value: undefined,
  disabled: false,
  placeholder: undefined,
}

export default React.memo(InputSingleSelect)
