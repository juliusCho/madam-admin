import endpointsConfig from '../../endpoints.config'

export default {
  convertTextToTailwind(text?: string) {
    if (!text) return ''

    return `text-${text} font-${text}`
  },
  convertColorToTailwind(
    type: 'bg' | 'text' | 'border' | 'placeholder',
    color?: string,
    isButtonOrDisabled?: boolean,
  ) {
    if (!color) {
      return `${type}-transparent`
    }

    const tc = color.split('.')

    return `${type}-${tc[0]}-${tc[1]} ${
      isButtonOrDisabled
        ? ''
        : `hover:${type}-${tc[0]}-${tc[1]}Hover active:${type}-${tc[0]}-${tc[1]}Active`
    } ${type === 'border' ? 'border-solid' : ''}`
  },
  encode(input: string | number) {
    return btoa(
      `${String(input)}-${endpointsConfig.snsKeySecret}-${String(input)}`,
    )
  },
  decode(input: string) {
    const key = atob(input).split(`-${endpointsConfig.snsKeySecret}-`)
    return key[0]
  },
}
