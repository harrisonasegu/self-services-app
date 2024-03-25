import { h, ref } from 'vue'
import { NDropdown, NTag, NText } from 'naive-ui'
import {
  EllipsisVerticalOutline as Ellipse
} from '@vicons/ionicons5'

import type { DataTablebuttonClickProp_Interface } from '@/interface/common/dataTableButtonClickProp'
import type { TransactionItem_Interface } from '@/interface/transaction'

import { useDataTableButtonClickStore } from '@/stores/common/dataTableButtonClick'

import { useCamelCaseToTitle } from '@/composables/camelCaseToTitle'
import { useRenderIcon } from '@/composables/renderIcon'
import { useStringToSentence } from '@/composables/camelCaseToTitle'
import { useNumberToCurrency } from '@/composables/formatNumber'
import { useFormatDateTime } from '@/composables/formatDateString'

const dataTableButtonClickStore = useDataTableButtonClickStore()

const requiredColumns = [
  'sn',
  'paymentRef.',
  'transactionRef.',
  'transactionDate',
  'fullName',
  'amount',
  'narration',
  'status',
  'actions'
]

// device width
const deviceWidth = ref(null ?? window.innerWidth)

const updateDeviceWidth = (event: any) => {
  deviceWidth.value = event?.target?.innerWidth
}

window.addEventListener('resize', updateDeviceWidth)
// -------------------------------------------------

const dropdownOptions = (row: TransactionItem_Interface) => [
  {
    label: "View Paid Items",
    key: "view details"
  }
]

const dropdownSlot = (row: TransactionItem_Interface) => h(
  NDropdown,
  {
    // dropdown options
    options: dropdownOptions(row),
    // dropdown option selected
    'on-select': (key: string) => handleClick(row, key)
  },
  // slots for dropdown vnode icon
  () => h(
    NTag,
    {
      size: 'medium',
    },
    useRenderIcon(Ellipse)
  )
)

function handleClick(row: TransactionItem_Interface, buttonClicked: string) {
  const payload: DataTablebuttonClickProp_Interface<TransactionItem_Interface> = {
    buttonClicked,
    data: row
  }

  // update modal prop
  dataTableButtonClickStore.setClickedButtonProp(payload)
  dataTableButtonClickStore.setIsButtonClicked(true)
}

export const reportDataTableColumn = (): object[] => {
  const tableColumns: object[] = []

  requiredColumns.map((column: string, index: number) => {
    const columnItem: any = {}

    columnItem['title'] = h('b', useCamelCaseToTitle(column))
    columnItem['key'] = column

    if (column === 'sn') {
      columnItem['render'] = (row: TransactionItem_Interface, index: number): number => index + 1
      columnItem['fixed'] = 'left'
    }

    if (column === 'transactionDate') {
      columnItem['render'] = (row: TransactionItem_Interface) => useFormatDateTime(row.transactionDate)
    }

    if (column === 'paymentRef.') {
      columnItem['render'] = (row: TransactionItem_Interface) => row.paymentReference
    }

    if (column === 'transactionRef.') {
      columnItem['render'] = (row: TransactionItem_Interface) => row.transactionReference
    }

    if (column === 'amount') {
      columnItem['render'] = (row: TransactionItem_Interface) => useNumberToCurrency(row.amount, 'ngn')
    }

    if (column === 'narration') {
      columnItem['render'] = (row: TransactionItem_Interface) => useStringToSentence(row.narration)
    }

    if (column === 'status') {
      columnItem['render'] = (row: TransactionItem_Interface) => h(
        NText,
        {
          type: row.statusCode === '00' ? 'success'
            : row.statusCode === '77' ? 'warning'
            : 'error'
        },
        () => row.status
      )
    }

    if (column === 'actions') {
      columnItem.fixed = deviceWidth.value > 1200 ? 'right' : ''
      columnItem['render'] = (row: TransactionItem_Interface) => dropdownSlot(row)
    }

    tableColumns[index] = columnItem
  })

  return tableColumns
}
