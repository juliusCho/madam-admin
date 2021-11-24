import helpers from '~/utils/helpers'

const TimePickerStyle = {
  container(id?: 'start' | 'end') {
    return {
      className: `
        flex
        justify-start
        items-center
        flex-col
        absolute
        z-max
        left-${id === 'end' ? '1/2' : '0'}
        w-1/2
        px-2
      `,
      style: {
        left: id ? undefined : '4.4rem',
        bottom: '4.375rem',
      },
    }
  },
  dateLabel: {
    className: `
      text-textMedium
      font-textMedium
      text-mono-black
      mb-2
    `,
  },
  inputButton(disabled?: boolean) {
    return {
      className: `
        relative
        w-full
        flex
        justify-center
        items-center
        text-textMedium
        font-textMedium
        rounded-full
        bg-mono-lightGray
        ${helpers.convertFontToTailwindClass('textMedium')}
        ${
          disabled
            ? 'text-mono-darkGray cursor-not-allowed'
            : 'text-mono-black cursor-pointer'
        }
      `,
      style: {
        height: '1.813rem',
      },
    }
  },
  toggleIcon(disabled?: boolean) {
    return {
      color: disabled ? 'mono-darkGray' : 'main-blue',
      size: '0.875rem',
      className: `
        absolute
        z-10
        left-2
        top-2
      `,
    }
  },
  listExterior(id?: 'start' | 'end') {
    let left = '-10rem'

    if (id === 'start') {
      left = '-21.5rem'
    } else if (id === 'end') {
      left = '-0.5rem'
    }

    return {
      className: `
        absolute
        z-20
        bg-transparent
      `,
      style: {
        width: '30rem',
        height: '20rem',
        top: '-4rem',
        left,
      },
    }
  },
  listContainer: {
    className: `
      absolute
      z-30
      shadow-glow
      rounded
      border
      border-solid
      border-mono-lightGray
      flex
      flex-col
      left-0
      top-0
      w-full
      justify-start
      items-center
      bg-mono-white
    `,
  },
  listTitle: {
    className: `
      flex
      justify-center
      items-center
      border-b
      border-solid
      border-mono-lightGray
      rounded-t
      p-2
      w-full
      h-9
      text-textMedium
      font-textMedium
      ${helpers.convertColorToTailwind('text', 'mono-paleBlack')}
    `,
  },
  listBottom: {
    className: `
      flex
      justify-center
      items-center
      h-40
      w-full
      rounded-b
    `,
  },
  list(isRight?: boolean) {
    return {
      className: `
        overflow-y-auto
        flex
        flex-col
        justify-start
        items-center
        bg-mono-white
        rounded-b
        ${
          isRight
            ? 'w-1/2 h-full border-l border-solid border-mono-lightGray'
            : 'w-full'
        }
      `,
      style: {
        height: isRight ? undefined : 'calc(100% - 1.688rem)',
      },
    }
  },
  item(active?: boolean) {
    return {
      className: `
        flex
        justify-center
        items-center
        p-2
        w-full
        text-subMedium
        font-subMedium
        cursor-pointer
        ${
          active
            ? `${helpers.convertColorToTailwind(
                'bg',
                'mono-pale',
              )} ${helpers.convertColorToTailwind('text', 'mono-black')}`
            : `bg-transparent ${helpers.convertColorToTailwind(
                'text',
                'mono-gray',
              )}`
        }
      `,
    }
  },
}

export default TimePickerStyle
