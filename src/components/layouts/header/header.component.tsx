import React from 'react'
import { ButtonRoundWithIcon } from '../../buttons/round-with-icon'
import { LabelMadam } from '../../labels/madam'
import LayoutHeaderStyle from './header.style'

export interface LayoutHeaderProps {}

function LayoutHeader({}: LayoutHeaderProps) {
  const onClickChangeName = () => {}

  const onClickLogout = () => {}

  return (
    <div className={LayoutHeaderStyle.container}>
      <LabelMadam
        size="titleBig"
        style={{ marginLeft: '2rem', fontSize: '3rem' }}
      />
      <div
        className={LayoutHeaderStyle.buttonArea}
        style={{ width: 'calc(100% - 23.5rem)' }}>
        <ButtonRoundWithIcon
          active
          icon="border-color"
          onClick={onClickChangeName}
          className={LayoutHeaderStyle.button}>
          사용자 명 변경
        </ButtonRoundWithIcon>
      </div>
      <ButtonRoundWithIcon
        active
        icon="log-out"
        onClick={onClickLogout}
        style={{ marginRight: '2rem', width: '8rem' }}
        className={LayoutHeaderStyle.button}>
        로그아웃
      </ButtonRoundWithIcon>
    </div>
  )
}

export default React.memo(LayoutHeader)
