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
