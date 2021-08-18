import React from 'react'
import { useHistory } from 'react-router'
import Recoil from 'recoil'
import * as api from '../../../api'
import { ROUTER_PATH } from '../../../constants'
import userGlobalStates from '../../../recoil/user'
import helpers from '../../../utils/helpers'
import customHooks from '../../../utils/hooks'
import { ButtonRoundWithIcon } from '../../buttons/round-with-icon'
import { InputTextLine } from '../../inputs/text-line'
import { LabelMadam } from '../../labels/madam'
import { Alert } from '../../modals/alert'
import Confirm from '../../modals/confirm/confirm.component'
import { ModalContent } from '../../modals/content'
import LayoutHeaderStyle from './header.style'

export interface LayoutHeaderProps {}

function LayoutHeader({}: LayoutHeaderProps) {
  const [admin, setAdmin] = Recoil.useRecoilState(userGlobalStates.userState)

  const [adminName, setAdminName] = React.useState('')
  const [confirmLogoutShow, setConfirmLogoutShow] = React.useState(false)
  const [confirmChangeNameShow, setConfirmChangeNameShow] =
    React.useState(false)
  const [modalShow, setModalShow] = React.useState(false)
  const [alertMsg, setAlertMsg] = React.useState('')
  const [showAlert, setShowAlert] = React.useState(false)
  const [infoMsg, setInfoMsg] = React.useState('')
  const [showInfo, setShowInfo] = React.useState(false)
  const [infoType, setInfoType] = React.useState<'info' | 'success'>('info')
  const [isMobile, setIsMobile] = React.useState(helpers.isMobile())

  const isMounted = customHooks.useIsMounted()

  const history = useHistory()

  const maxLength = 50

  const resizeEvent = React.useCallback(() => {
    if (window.innerWidth >= 767) {
      setIsMobile(false)
    } else {
      setIsMobile(true)
    }
  }, [])

  React.useEffect(() => {
    if (typeof window === 'undefined') return () => {}

    if (isMounted()) {
      resizeEvent()

      window.addEventListener('load', resizeEvent)
      window.addEventListener('resize', resizeEvent)
    }
    return () => {
      window.removeEventListener('load', resizeEvent)
      window.removeEventListener('resize', resizeEvent)
    }
  }, [isMounted, window, resizeEvent])

  React.useEffect(() => {
    if (isMounted()) {
      setAdminName(() => admin?.name ?? '')
    }
  }, [isMounted, admin])

  const changeName = () => {
    setConfirmChangeNameShow(false)
    setModalShow(false)

    if (!admin) return

    setInfoType('success')
    setInfoMsg('이름이 변경되었습니다.')
    setShowInfo(true)

    const newAdmin = { ...admin, name: adminName }
    api.apiChangeName(newAdmin)
    setAdmin(newAdmin)
  }

  const logout = () => {
    setInfoType('info')
    setInfoMsg('로그아웃 되었습니다.')
    setShowInfo(true)

    setConfirmLogoutShow(false)
    history.push(ROUTER_PATH.LOGIN)
  }

  const onSubmitModal = () => {
    if (!adminName) {
      setAlertMsg('입력된 텍스트가 없습니다.')
      setShowAlert(true)
      return
    }

    if (adminName.length > maxLength) {
      setAlertMsg(`최대 ${maxLength}자 까지 입력 가능합니다.`)
      setShowAlert(true)
      return
    }

    setConfirmChangeNameShow(true)
  }

  const onAlertEnds = () => {
    setShowAlert(false)
  }

  const onInfoEnds = () => {
    setShowInfo(false)
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
      <Alert
        show={showAlert}
        msg={alertMsg}
        type="warning"
        onHide={onAlertEnds}
        showTime={1000}
      />
      <Alert
        show={showInfo}
        msg={infoMsg}
        type={infoType}
        onHide={onInfoEnds}
        showTime={1000}
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
