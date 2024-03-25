export const useDialogModal = (
    dialog: any,
    type: string,
    title: any,
    positiveText: string,
    onNegativeClick: () => void,
    onPositiveClick: () => void
) => dialog[type]({
  closable: false,
  showIcon: false,
  title: title,
  positiveText,
  onNegativeClick,
  onPositiveClick,
  onEsc: onNegativeClick,
  onMaskClick: onNegativeClick
})
