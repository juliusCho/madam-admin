import React from 'react'
import { ButtonBasic } from '~/components/buttons/basic'
import { Confirm } from '~/components/modals/confirm'
import { BorderCSS, TailwindColorPalette } from '~/types'
import GridCudButtonsStyle from './cud-buttons.style'

export interface GridCudButtonsProps {
  modifiable?: boolean
  savable?: boolean
  onSave?: () => void
  onCancel?: () => void
  onAdd?: () => void
  onDelete?: () => void
  borderCSS?: BorderCSS
  style?: React.CSSProperties
  className?: string
}

function GridCudButtons({
  modifiable,
  savable,
  onSave,
  onCancel,
  onAdd,
  onDelete,
  borderCSS,
  style,
  className,
}: GridCudButtonsProps) {
  const [confirm, setConfirm] = React.useState(false)

  const getDisable = React.useCallback(
    (icon: 'renew' | 'plus' | 'trash-o' | 'save') => {
      switch (icon) {
        case 'plus':
          return false
        case 'save':
          return !savable
        default:
          return !modifiable
      }
    },
    [savable, modifiable],
  )

  const getButton = React.useCallback(
    (
      label: string,
      icon: 'renew' | 'plus' | 'trash-o' | 'save',
      color: TailwindColorPalette,
      onClick: () => void,
      classNameButton?: string,
    ) => (
      <ButtonBasic
        {...GridCudButtonsStyle.button({
          ...borderCSS,
          disabled: getDisable(icon),
          icon,
          color,
          className: classNameButton,
        })}
        disabled={getDisable(icon)}
        onClick={onClick}>
        {label}
      </ButtonBasic>
    ),
    [borderCSS, getDisable],
  )

  return (
    <>
      <Confirm
        show={confirm}
        title="확인"
        msg="저장하시겠습니까?"
        icon="info"
        confirmButtonText="저장"
        cancelButtonText="취소"
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          setConfirm(false)
          if (onSave) {
            onSave()
          }
        }}
      />
      <div {...GridCudButtonsStyle.container({ style, className })}>
        <div {...GridCudButtonsStyle.leftContainer}>
          {onCancel &&
            getButton('취소', 'renew', 'mono-lightGray', onCancel, 'mr-2')}
          {onAdd && getButton('추가', 'plus', 'sub-lightBlue', onAdd, 'mr-2')}
          {onDelete && getButton('삭제', 'trash-o', 'sub-pink', onDelete)}
        </div>
        {onSave &&
          getButton('적용', 'save', 'sub-green', () => setConfirm(true))}
      </div>
    </>
  )
}

GridCudButtons.defaultProps = {
  modifiable: false,
  savable: false,
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
