import { CRUD } from '~/enums'

export type ScreenOptionType =
  | 'mobile'
  | 'smallScreen'
  | 'mediumScreen'
  | 'screen'

export type ChartDatePickerOptionType =
  | 'day'
  | 'week'
  | 'month'
  | '3-months'
  | '6-months'
  | 'year'

export type GeocodeResultType = {
  address_components: { long_name: string; short_name: string }[]
  types: string[]
}

export type SelectOptionType<T> = {
  value: T
  label: string
  isDisabled?: boolean
  isSelected?: boolean
}

export type TailwindColorPalette =
  | 'mono-black'
  | 'mono-paleBlack'
  | 'mono-darkGray'
  | 'mono-gray'
  | 'mono-lightGray'
  | 'mono-pale'
  | 'mono-paleWhite'
  | 'mono-white'
  | 'main-red'
  | 'main-blue'
  | 'main-navy'
  | 'main-darkNavy'
  | 'main-yellow'
  | 'main-turquoise'
  | 'main-pink'
  | 'sub-babyPink'
  | 'sub-green'
  | 'sub-sky'
  | 'sub-darkPurple'
  | 'sub-paleYellow'
  | 'sub-purple'
  | 'sub-lightGreen'
  | 'sub-paleBlue'
  | 'sub-ocean'
  | 'sub-pink'
  | 'sub-darkNavy'
  | 'sub-lightBlue'
  | 'sub-paleSky'
  | 'sub-lightYellow'
  | 'sns-naver'
  | 'sns-facebook'
  | 'sns-kakao'
  | 'sns-google'
  | 'sns-apple'
  | 'sns-other'

export type TailwindFontSize =
  | 'titleMassive'
  | 'titleBig'
  | 'titleMedium'
  | 'titleSmall'
  | 'subTitleBig'
  | 'subTitleMedium'
  | 'subTitleSmall'
  | 'textBig'
  | 'textMedium'
  | 'textSmall'
  | 'subBig'
  | 'subMedium'
  | 'subSmall'

export type BorderRadius =
  | 'full'
  | '3xl'
  | '2xl'
  | 'xl'
  | 'lg'
  | 'md'
  | 'basic'
  | 'sm'
  | 'none'

export type BorderRadiusDirection =
  | 'top'
  | 'left'
  | 'bottom'
  | 'right'
  | 'top-left'
  | 'bottom-left'
  | 'top-right'
  | 'bottom-right'

export type BorderStyle = 'dotted' | 'dashed' | 'solid' | 'none'

export type BorderDirection = 'top' | 'left' | 'bottom' | 'right'

export type BorderCSS = {
  borderStyle?: BorderStyle
  borderBold?: boolean
  borderRadius?: BorderRadius
  borderColor?: TailwindColorPalette
}

export type GridData<T> = T & {
  check: boolean
  crud: CRUD
  no: number
  adminName?: string
}
