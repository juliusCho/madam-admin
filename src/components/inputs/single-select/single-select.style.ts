import { CSSObjectWithLabel } from 'react-select'
import {
  ScreenOptionType,
  TailwindColorPalette,
  TailwindFontSize,
} from '~/types'
import { convertColorToHex, convertFontSizeToCSSSize } from '~/utils/helpers'

interface StyleProps {
  width?: string | number
  fontSize?: TailwindFontSize
  fontColor?: TailwindColorPalette
  device?: ScreenOptionType
}

const InputSingleSelectStyle = ({
  width,
  fontSize,
  fontColor,
  device,
}: StyleProps) => ({
  container: (provided: CSSObjectWithLabel) => ({
    ...provided,
    width,
  }),
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    borderColor: 'gray',
    cursor: 'pointer',
    borderWidth:
      device === 'mobile' || device === 'smallScreen' ? '1px' : '2px',
    borderRadius: '99999px',
  }),
  singleValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    fontSize: convertFontSizeToCSSSize(fontSize),
    fontColor: convertColorToHex(fontColor),
    fontWeight: 700,
  }),
  option: (provided: CSSObjectWithLabel) => ({
    ...provided,
    fontSize: convertFontSizeToCSSSize(fontSize),
    fontColor: convertColorToHex(fontColor),
    cursor: 'pointer',
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
