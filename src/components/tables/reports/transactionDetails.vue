<script setup lang="ts">
import { computed, h, ref } from 'vue'

import type { PaidItem_Interface } from '@/interface/transaction'

import { useCamelCaseToTitle } from '@/composables/camelCaseToTitle'
import { useStringToSentence } from '@/composables/camelCaseToTitle'
import { useNumberToCurrency } from '@/composables/formatNumber'

import { useTransactionStore } from '@/stores/modules/transaction'

import GlobalDataTable from '@/components/tables/globalDataTable.vue'

const transactionStore = useTransactionStore()

const dataSource = transactionStore.getPaidItems

const requiredColumns = [
  'sn',
  'paymentReference',
  'itemName',
  'amount'
]

// device width
const deviceWidth = ref(null ?? window.innerWidth)

const updateDeviceWidth = (event: any) => {
  deviceWidth.value = event?.target?.innerWidth
}

window.addEventListener('resize', updateDeviceWidth)
// -------------------------------------------------

const dataTableColumns = (): object[] => {
  const tableColumns: object[] = []

  requiredColumns.map((column: string, index: number) => {
    const columnItem: any = {}

    columnItem['title'] = h('b', useCamelCaseToTitle(column))
    columnItem['key'] = column

    if (column === 'sn') {
      columnItem['render'] = (row: any, index: number): number => index + 1
      columnItem['fixed'] = 'left'
    }

    if (column === 'itemName') {
      columnItem['render'] = (row: PaidItem_Interface) => useStringToSentence(row.paymentItem)
    }

    if (column === 'amount') {
      columnItem['render'] = (row: PaidItem_Interface) => useNumberToCurrency(Number(row.amount), 'ngn')
    }

    tableColumns[index] = columnItem
  })

  return tableColumns
}

const loading = ref<boolean>(false)

const searchQuery = ref('')

const filterCB = (record: PaidItem_Interface) =>
  (record?.paymentReference ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (record?.paymentItem ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
  (record?.amount ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1

const filteredDataSource = computed(() => dataSource.value?.filter(filterCB))
// --------------------------------------------------------
</script>

<template>
  <div class="search-and-table-container">
    <div class="btn-and-search-container"></div>

    <div class="global-data-table-container">
      <GlobalDataTable
        :loading="loading"
        :columns="dataTableColumns()"
        :data="filteredDataSource"
        :count="dataSource?.length"
        :scrollX="900"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.search-and-table-container {
  display: flex;
  flex-direction: column;
  row-gap: 20px;

  // button and search container
  &>div.btn-and-search-container {
    display: flex;
    row-gap: 10px;
    column-gap: 30px;

    &>div.search-input-container {
      width: 100%;
    }

    &>div.btn-container {
      display: flex;
      flex-wrap: wrap;
      row-gap: 5px;
      column-gap: 10px;
      // justify-content: flex-end;

      button {
        height: 35px;
        display: flex;
        flex-direction: row;
        column-gap: 3px;
        align-items: center;
        box-sizing: border-box;
        border-radius: 5px;
        padding: 10px;
        font-weight: 500;
        line-height: 19px;
        transition: all 0.4s;

        // &:hover {
        //   box-shadow: 0 0 5px #519151;
        // }

        &:active {
          box-shadow: 0 0 5px transparent;
        }

        &:disabled {
          border-color: #C4C4C4;
          box-shadow: none;
          color: #C4C4C4;
          background-color: #FFFFFF;
        }

        // button icon
        &>*:first-child {
          font-size: 20px;
        }

        // button text
        &>*:last-child {
          font-size: 16px;
        }
      }
    }
  }
}

// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  div.search-and-table-container {
    // button and search container
    &>div.btn-and-search-container {
      flex-direction: column-reverse;

      &>div.btn-container {
        button {
          width: 100%;
          padding: 5px 10px;
          font-size: 14px;
        }
      }
    }
  }
}
// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  div.search-and-table-container {
    // button and search container
    &>div.btn-and-search-container {
      flex-direction: column-reverse;

      &>div.btn-container {
        button {
          width: 100%;
          // height: 30px;
          border-radius: 5px;
          padding: 5px 10px;
          font-size: 14px;
        }
      }
    }
  }
}
// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.search-and-table-container {
    // button and search container
    &>div.btn-and-search-container {
      &>div.btn-container {
        button {
          padding: 5px 10px;
        }
      }
    }
  }
}
// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  div.search-and-table-container {
    // button and search container
    &>div.btn-and-search-container {
      &>div.btn-container {
        button {
          padding: 5px 10px;
        }
      }
    }
  }
}
// MD
// @media (min-width: 768px) and (max-width: 991.9px) {}
// LG
// @media (min-width: 992px) and (max-width: 1200.9px) {}
// XL
</style>
