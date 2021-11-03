import { CSSObjectWithLabel } from 'react-select'
import { ScreenOptionType } from '~/types'

interface StyleProps {
  width?: string | number
  fontSize?: string | number
  device?: ScreenOptionType
}

const InputSingleSelectStyle = ({ width, fontSize, device }: StyleProps) => ({
  container: (provided: CSSObjectWithLabel) => ({
    ...provided,
    width,
  }),
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    borderColor: 'gray',
    borderWidth:
      device === 'mobile' || device === 'smallScreen' ? '1px' : '2px',
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
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    borderRadius: '20px',
    padding: device === 'mobile' || device === 'smallScreen' ? '0px' : '2px',
  }),
  menuList: (provided: CSSObjectWithLabel) => ({
    ...provided,
    borderRadius: '10px',
    maxHeight: '200px',
  }),
})

export default InputSingleSelectStyle
