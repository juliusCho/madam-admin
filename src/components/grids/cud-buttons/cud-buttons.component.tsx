import React from 'react'
import { ButtonBasic } from '~/components/buttons/basic'
import { BorderCSS, TailwindColorPalette } from '~/types'
import GridCudButtonsStyle from './cud-buttons.style'

export interface GridCudButtonsProps {
  onSave?: () => void
  onCancel?: () => void
  onAdd?: () => void
  onDelete?: () => void
  borderCSS?: BorderCSS
  style?: React.CSSProperties
  className?: string
}

function GridCudButtons({
  onSave,
  onCancel,
  onAdd,
  onDelete,
  borderCSS,
  style,
  className,
}: GridCudButtonsProps) {
  const getButton = React.useCallback(
    (
      label: string,
      icon: string,
      color: TailwindColorPalette,
      onClick: () => void,
      classNameButton?: string,
    ) => (
      <ButtonBasic
        {...GridCudButtonsStyle.button({
          ...borderCSS,
          icon,
          color,
          className: classNameButton,
        })}
        onClick={onClick}>
        {label}
      </ButtonBasic>
    ),
    [borderCSS],
  )

  return (
    <div {...GridCudButtonsStyle.container({ style, className })}>
      <div {...GridCudButtonsStyle.leftContainer}>
        {onCancel &&
          getButton('취소', 'renew', 'mono-lightGray', onCancel, 'mr-2')}
        {onAdd && getButton('추가', 'plus', 'sub-lightBlue', onAdd, 'mr-2')}
        {onDelete && getButton('삭제', 'trash-o', 'sub-pink', onDelete)}
      </div>
      {onSave && getButton('적용', 'save', 'sub-green', onSave)}
    </div>
  )
}

GridCudButtons.defaultProps = {
  onSave: undefined,
  onCancel: undefined,
  onAdd: undefined,
  onDelete: undefined,
  borderCSS: {
    borderStyle: 'solid',
    borderBold: false,
    borderRadius: 'full',
    borderColor: 'mono-black',
  },
  style: undefined,
  className: undefined,
}

export default React.memo(GridCudButtons)
