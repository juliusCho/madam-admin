import Swal, { SweetAlertResult } from 'sweetalert2'

export type AlertOrConfirmIconType = 'error' | 'warning' | 'info' | 'success'

export function AlertOrConfirm(
  confirm: boolean,
  titleText: string,
  icon: AlertOrConfirmIconType,
  text?: string,
  confirmButtonText?: string,
  cancelButtonText?: string,
  timer?: number,
): Promise<SweetAlertResult> {
  let fireOptions = {}
  if (confirm) {
    fireOptions = {
      focusConfirm: false,
      focusCancel: true,
      text,
      confirmButtonText,
      showCancelButton: confirm,
      cancelButtonText,
      confirmButtonColor: '#3067A8',
      reverseButtons: true,
      showCloseButton: true,
    }
  }

  const ConfirmAlert = Swal.mixin({
    showConfirmButton: confirm,
    toast: !confirm,
    timer: confirm ? undefined : timer,
    timerProgressBar: !confirm,
    position: confirm ? 'center' : 'top-end',
    didOpen: confirm
      ? undefined
      : (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
  })

  return ConfirmAlert.fire({
    ...fireOptions,
    titleText,
    icon,
  })
}
