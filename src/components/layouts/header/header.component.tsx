import React from 'react'
import { useHistory } from 'react-router'
import Recoil from 'recoil'
import * as api from '../../../api'
import { apiLogout } from '../../../api'
import { ROUTER_PATH } from '../../../constants'
import adminGlobalStates from '../../../recoil/admin'
import etcGlobalStates from '../../../recoil/etc'
import helpers from '../../../utils/helpers'
import customHooks from '../../../utils/hooks'
import { ButtonRoundWithIcon } from '../../buttons/round-with-icon'
import { InputTextLine } from '../../inputs/text-line'
import { LabelMadam } from '../../labels/madam'
import Confirm from '../../modals/confirm/confirm.component'
import { ModalContent } from '../../modals/content'
import LayoutHeaderStyle from './header.style'

export interface LayoutHeaderProps {}

function LayoutHeader({}: LayoutHeaderProps) {
  const [admin, setAdmin] = Recoil.useRecoilState(adminGlobalStates.adminState)
  const setAlert = Recoil.useSetRecoilState(etcGlobalStates.alertState)

  const [adminName, setAdminName] = React.useState('')
  const [confirmLogoutShow, setConfirmLogoutShow] = React.useState(false)
  const [confirmChangeNameShow, setConfirmChangeNameShow] =
    React.useState(false)
  const [modalShow, setModalShow] = React.useState(false)

  const [isMobile, setIsMobile] = React.useState(helpers.isMobile())

  const isMounted = customHooks.useIsMounted()

  const history = useHistory()

  customHooks.useCheckMobile(setIsMobile)

  const maxLength = 50

  React.useEffect(() => {
    if (isMounted()) {
      if (!admin) return

      setAdminName(() => admin?.name ?? '')
    }
  }, [isMounted, admin?.name])

  const changeName = async () => {
    setConfirmChangeNameShow(false)
    setModalShow(false)

    if (!admin) return

    setAlert((old) => ({
      ...old,
      show: true,
      type: 'success',
      msg: '이름이 변경되었습니다.',
      time: 1000,
    }))

    const newAdmin = { ...admin, name: adminName }

    setAdmin(newAdmin)
    const boo = await api.apiChangeName(newAdmin)

    if (!boo) {
      setAdmin(null)
    }
  }

  const logout = () => {
    apiLogout()

    setAlert((old) => ({
      ...old,
      show: true,
      type: 'info',
      msg: '로그아웃 되었습니다.',
      time: 1000,
    }))

    setConfirmLogoutShow(false)
    setAdmin(null)
  }

  const onSubmitModal = () => {
    if (!adminName) {
      setAlert((old) => ({
        ...old,
        show: true,
        type: 'warning',
        msg: '입력된 텍스트가 없습니다.',
        time: 1000,
      }))
      return
    }

    if (adminName.length > maxLength) {
      setAlert((old) => ({
        ...old,
        show: true,
        type: 'warning',
        msg: `최대 ${maxLength}자 까지 입력 가능합니다.`,
        time: 1000,
      }))
      return
    }

    setConfirmChangeNameShow(true)
  }

  return (
    <div className={LayoutHeaderStyle.container}>
      <Confirm
        show={confirmLogoutShow}
        title="확인"
        msg="로그아웃 하시겠습니까?"
        icon="info"
        confirmButtonText="진행"
        cancelButtonText="취소"
        onConfirm={logout}
        onCancel={() => setConfirmLogoutShow(false)}
      />
      <Confirm
        show={confirmChangeNameShow}
        title="확인"
        msg="이름을 변경 하시겠습니까?"
        icon="info"
        confirmButtonText="진행"
        cancelButtonText="취소"
        onConfirm={changeName}
        onCancel={() => setConfirmChangeNameShow(false)}
      />
      <ModalContent
        isOpen={modalShow}
        onCancel={() => {
          setAdminName(admin?.name ?? '')
          setModalShow(false)
        }}
        title="관리자 명 변경"
        contentClassName={LayoutHeaderStyle.modalContent}
        submitText="변경"
        cancelText="취소"
        onSubmit={onSubmitModal}>
        <InputTextLine
          value={adminName}
          onChange={(text) => setAdminName(text)}
          onSubmit={() => setConfirmChangeNameShow(true)}
          maxLength={maxLength}
          type="text"
          placeholder="이름을 입력해 주세요."
          data-testid="components.layouts.header.changeName.input"
        />
      </ModalContent>
      <button
        type="button"
        onClick={() => history.push(ROUTER_PATH.DASHBOARD.APP_USE)}>
        <LabelMadam
          size="titleBig"
          style={
            isMobile
              ? {
                  marginLeft: '1rem',
                  fontSize: '2rem',
                }
              : {
                  marginLeft: '2rem',
                  fontSize: '3rem',
                }
          }
          className="cursor-pointer hover:text-mono-blackHover active:text-mono-blackActive"
        />
      </button>
      <div
        className={LayoutHeaderStyle.buttonArea}
        style={{
          width: `calc(100% - ${isMobile ? '0px' : '23.5rem'})`,
        }}>
        <span className={LayoutHeaderStyle.welcome}>접속 관리자:</span>
        <span className={LayoutHeaderStyle.adminName}>{admin?.name || ''}</span>
        <ButtonRoundWithIcon
          icon="border-color"
          iconSize="0.85rem"
          colorInactive="bg-mono-white hover:bg-mono-whiteHover active:bg-mono-whiteActive"
          onClick={() => setModalShow(true)}
          className={LayoutHeaderStyle.button}>
          사용자 명 변경
        </ButtonRoundWithIcon>
      </div>
      <ButtonRoundWithIcon
        icon="log-out"
        onClick={() => setConfirmLogoutShow(true)}
        colorInactive="bg-mono-white hover:bg-mono-whiteHover active:bg-mono-whiteActive"
        style={{
          marginRight: '2rem',
          width: isMobile ? '7.8rem' : '8.5rem',
        }}
        className={LayoutHeaderStyle.button}>
        로그아웃
      </ButtonRoundWithIcon>
    </div>
  )
}

export default React.memo(LayoutHeader)
