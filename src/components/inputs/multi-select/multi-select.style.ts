import { CSSObjectWithLabel } from 'react-select'
import { TailwindColorPalette, TailwindFontSize } from '~/types'
import { convertColorToHex, convertFontSizeToCSSSize } from '~/utils/helpers'

interface StyleProps {
  width?: string | number
  fontSize?: TailwindFontSize
  fontColor?: TailwindColorPalette
}

const InputMultiSelectStyle = ({ width, fontSize, fontColor }: StyleProps) => ({
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
    fontSize: convertFontSizeToCSSSize(fontSize),
    fontColor: convertColorToHex(fontColor),
    fontWeight: 700,
  }),
  option: (provided: CSSObjectWithLabel) => ({
    ...provided,
    fontSize: convertFontSizeToCSSSize(fontSize),
    fontColor: convertColorToHex(fontColor),
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
