import {
  PersonAddOutline as ApproveIcon,
  PersonRemoveOutline as DisapproveeIcon,
  PersonOutline as ActivateIcon,
  LockOpenOutline as UnlockIcon
} from '@vicons/ionicons5'

import { useRenderIcon } from "@/composables/renderIcon"

const pendingEmployeesDropdown = [
  {
    title: 'Approve employee',
    key: 'approve',
    icon: useRenderIcon(ApproveIcon)
  },
  {
    title: 'Disapprove employee',
    key: 'disapprove',
    icon: useRenderIcon(DisapproveeIcon)
  }
]

const approvedEmployeesDropdown = [
  {
    title: 'Deactivate employee',
    key: 'deactivate',
    icon: useRenderIcon(ApproveIcon)
  },
  {
    title: 'Suspend employee',
    key: 'suspend',
    icon: useRenderIcon(DisapproveeIcon)
  }
]

const deactivatedEmployeesDropdown = [
  {
    title: 'Reactivated employee',
    key: 'reactivated',
    icon: useRenderIcon(ActivateIcon)
  },
  {
    title: 'Suspend employee',
    key: 'suspend',
    icon: useRenderIcon(DisapproveeIcon)
  }
]

const blockedEmployeesDropdown = [
  {
    title: 'Unblock employee',
    key: 'unblock',
    icon: useRenderIcon(UnlockIcon)
  },
  {
    title: 'Deactivate employee',
    key: 'deactivate',
    icon: useRenderIcon(ApproveIcon)
  }
]

const dropdownOptions: any = {
  pending: pendingEmployeesDropdown,
  approved: approvedEmployeesDropdown,
  deactivated: deactivatedEmployeesDropdown,
  blocked: blockedEmployeesDropdown
}
  
export const employeeActionsDropdown = (status: string): any => {
  return dropdownOptions[status]
}
