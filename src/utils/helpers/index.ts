export default {
  convertTextToTailwind(text?: string) {
    if (!text) return ''

    const tc = text.split('.')
    return `text-${tc[0]}-${tc[1]} font-${tc[0]}-${tc[1]}`
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
    } ${type === 'border' ? 'border border-solid' : ''}`
  },
}
