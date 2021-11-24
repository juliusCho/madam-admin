import { CSSObjectWithLabel } from 'react-select'

interface StyleProps {
  width?: string | number
  fontSize?: string | number
}

const InputMultiSelectStyle = ({ width, fontSize }: StyleProps) => ({
  container: (provided: CSSObjectWithLabel) => ({
    ...provided,
    width,
  }),
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    borderColor: 'gray',
    cursor: 'pointer',
    borderWidth: '2px',
    borderRadius: '99999px',
  }),
  singleValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    fontSize,
    fontWeight: 700,
  }),
  option: (provided: CSSObjectWithLabel) => ({
    ...provided,
    fontSize,
    borderRadius: '99999px',
    cursor: 'pointer',
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    borderRadius: '20px',
    padding: '2px',
  }),
  menuList: (provided: CSSObjectWithLabel) => ({
    ...provided,
    borderRadius: '10px',
    maxHeight: '200px',
  }),
})

export default InputMultiSelectStyle
