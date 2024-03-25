<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

import { NButton,  NDatePicker, NInput, useNotification } from 'naive-ui'

import type { TransactionItem_Interface } from '@/interface/transaction'

import { useResponseNotification } from '@/composables/responseNotification'
import { jsonToExcel } from '@/composables/xlsxExports'

import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useDataTableButtonClickStore } from '@/stores/common/dataTableButtonClick'
import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useTransactionStore } from '@/stores/modules/transaction'

import GlobalDataTable from '@/components/tables/globalDataTable.vue'
import GlobalModal from '@/components/modal/globalModal.vue'
import ViewPaymentDetails from '@/components/tables/reports/transactionDetails.vue'

// data table columns
import { reportDataTableColumn as dataTableColumns } from '@/table-columns/report/report'
import { useNumberToCurrency } from '@/composables/formatNumber'

const notification = useNotification()

const responseMessageStore = useResponseMessageStore()
const dataTableButtonClickStore = useDataTableButtonClickStore()
const authenticationStore = useAuthenticationStore()
const transactionStore = useTransactionStore()

const isDataTableButtonClicked = dataTableButtonClickStore.getIsButtonClicked
const dataTableClickedButtonProp = dataTableButtonClickStore.getClickedButtonProp

const rowData_ = computed((): TransactionItem_Interface => dataTableClickedButtonProp.data as any)
const dataSource = transactionStore.getTransactions

const user = authenticationStore.getUser.value

const loading = ref<boolean>(false)
const isDownloading = ref<boolean>(false)

const showMainModal = ref<boolean>(false)
const showConfirmModal = ref<boolean>(false)

const searchQuery = ref('')

const modalAttrs = reactive({
  modalTitle: '',
  maskClosable: true,
  negativeText: '',
  positiveText: ''
})

const model = reactive({
  dateFormat: 'MM/dd/yyyy',
  startDate: null,
  endDate: null,
  paymentReference: null,
  transactionReference: null,
  name: null
})

const filterCB = (record: TransactionItem_Interface) =>
(record?.paymentReference ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
(record?.transactionReference ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
(record?.transactionDate ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
(record?.fullName ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
(useNumberToCurrency((record?.amount) ?? 0, 'ngn') ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
(record?.narration ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1 ||
(record?.status ?? '')?.toString().toLowerCase().indexOf(searchQuery.value.toLowerCase()) !== -1

const filteredDataSource = computed(() => dataSource.value?.filter(filterCB))
// --------------------------------------------------------

class DataTable {
  startDateDisabled = (ts: number) => {
    const date = new Date().getTime()
    return ts > date
  }

  endDateDisabled = (ts: number) => {
    const date = new Date().getTime()
    return (ts > date || ts < Number(model.startDate))
  }

  showNotification = (duration: number) => {
    useResponseNotification(
      notification,
      responseMessageStore.response.status,
      responseMessageStore.response.title,
      responseMessageStore.response.message,
      duration
    )
  }

  loadingState = (state: boolean) => {
    loading.value = state
  }

  downloadingState = (state: boolean) => {
    isDownloading.value = state
  }

  updateSearchQuery = (searchText: string) => {
    searchQuery.value = searchText
  }

  clearModalProps = () => {
    modalAttrs.modalTitle = ''
    modalAttrs.maskClosable = true
    modalAttrs.negativeText = ''
    modalAttrs.positiveText = ''
  }

  toggleModalState = (modal: string, state: boolean) => {
    switch (modal) {
      case 'main modal':
        showMainModal.value = state
        break;

      case 'confirm modal':
        showConfirmModal.value = state
        break;
    }
  }

  handleSearchButtonClick = async () => {
    const payload = {
      customerReference: user?.customerReference as string,
      paymentReference: model.paymentReference ?? '' as string,
      transactionReference: model.transactionReference ?? '' as string,
      name: model.name ?? '' as string,
      dateFrom: model.startDate ? new Date(model.startDate + (1 * 60 * 60 * 24 * 1000)).toISOString() : '',
      dateTo: model.endDate ? new Date(model.endDate + (1 * 60 * 60 * 24 * 1000)).toISOString() : '',
    }

    loading.value = true

    // fetch data
    await transactionStore.TransactionReport(payload)
      .finally(() => {
        loading.value = false
      })
  }

  handleDownloadButtonClicked = async () => {
    // start spinner
    this.downloadingState(true)

    const sheetColumns = ['applicationId'] // first column to be created from sheetRow(data)

    // const sheetRows = dataSource.value
    const sheetRows = dataSource.value
    const sheetName = 'QuotationReport'
    const fileName = 'Quotation Report'

    // download record in excel format
    jsonToExcel(sheetColumns, sheetRows, sheetName, fileName)

    // stop spinner
    this.downloadingState(false)
  }

  handleDataTableButtonClick = (isButtonClicked: boolean) => {
    if (!isButtonClicked) return

    // check specific button clicked
    switch (dataTableClickedButtonProp.buttonClicked) {
      case 'view details':
        // loading state
        this.loadingState(true)

        transactionStore.GetPaidItemsDetails({
          transactionId: rowData_.value.transactionId as number,
          customerReference: rowData_.value.customerReference
        })
          .then(response => {
            // loading state
            this.loadingState(false)

            if (response.responseCode === '00') {
              // update modal prop
              modalAttrs.modalTitle = `Payment ${rowData_.value?.paymentReference} Details`
              modalAttrs.maskClosable = false
              modalAttrs.negativeText = 'Close'

              // show modal
              this.toggleModalState('main modal', true)
            } else {
              // notification
              this.showNotification(5000)
            }
          })
          .catch(() => {
            // loading state
            this.loadingState(false)
            // notification
            this.showNotification(5000)
          })
        break
    }
  }

  closeModal = () => {
    // clear modal attributes
    this.clearModalProps()

    // clear modal prop
    dataTableButtonClickStore.clearButtonProp()
    // // update modal state
    this.toggleModalState('main modal', false)
    this.toggleModalState('confirm modal', false)
  }

  handleModalResponse = () => {
    // close modal
    this.closeModal()
    // notification
    this.showNotification(5000)
  }
}
const dataTable = new DataTable()

watch(isDataTableButtonClicked, (isBtnClicked) => dataTable.handleDataTableButtonClick(isBtnClicked))
</script>

<template>
  <div class="search-and-table-container">
    <div class="search-filter-container">
      <div class="filter-container">
        <div class="dropdown-container">
          <div class="dropdown-item">
            <n-date-picker
              type="date"
              v-model:value="model.startDate"
              :format="model.dateFormat"
              :default-value="Date.now()"
              :is-date-disabled="dataTable.startDateDisabled"
              :placeholder="'Start Date'"
              clearable
              :disabled="loading"
            />
          </div>
          <div class="dropdown-item">
            <n-date-picker
              type="date"
              v-model:value="model.endDate"
              :format="model.dateFormat"
              :default-value="Date.now()"
              :is-date-disabled="dataTable.endDateDisabled"
              :placeholder="'End Date'"
              clearable
              :disabled="loading"
            />
          </div>
          <div class="dropdown-item">
            <n-input
              v-model:value="model.paymentReference"
              :placeholder="'Payment Ref.'"
              clearable
              :disabled="loading"
            />
          </div>
          <div class="dropdown-item">
            <n-input
              v-model:value="model.transactionReference"
              :placeholder="'Transaction Ref.'"
              clearable
              :disabled="loading"
            />
          </div>
          <div class="dropdown-item">
            <n-input
              v-model:value="model.name"
              :placeholder="'Name'"
              clearable
              :disabled="loading"
            />
          </div>
        </div>
      </div>

      <div class="btn-container">
        <n-button
          type="primary"
          :disabled="loading"
          @click="dataTable.handleSearchButtonClick"
        >
          Search
          &nbsp;
          <Icon icon="material-symbols:arrow-right-alt-rounded" height="25" />
        </n-button>
      </div>
    </div>

    <div
      v-if="dataSource?.length"
      class="search-and-download-btn-container d-none"
    >
      <div class="search-input-container">
        <!-- search bar -->
        <n-input
          type="text"
          v-model:value="searchQuery"
          placeholder="filter transactions"
          :disabled="loading"
        />
      </div>

      <div class="btn-container">
        <n-button
          type="primary"
          :disabled="loading || isDownloading"
          @click="dataTable.handleDownloadButtonClicked"
        >
          <icon icon="basil:download-outline" height="25" />
          &nbsp;
          <span>Download</span>
        </n-button>
      </div>
    </div>

    <div class="global-data-table-container">
      <GlobalDataTable
        :loading="loading"
        :columns="dataTableColumns()"
        :data="filteredDataSource"
        :count="dataSource?.length"
        :scrollX="1800"
      />
    </div>
  </div>

  <!-- modal -->
  <GlobalModal
    v-model:show="showMainModal"
    :modal-title="modalAttrs.modalTitle"
    :modal-prop="dataTableClickedButtonProp"
    :show-icon="false"
    :mask-closable="modalAttrs.maskClosable"
    :negative-text="modalAttrs.negativeText"
    :positive-text="modalAttrs.positiveText"
    @onNegativeClick="dataTable.closeModal"
    @closeModal="dataTable.closeModal"
  >
    <template #modalContent>
      <ViewPaymentDetails
        v-if="modalAttrs.modalTitle === `Payment ${rowData_?.paymentReference} Details`"
      />
    </template>
  </GlobalModal>
</template>

<style lang="scss" scoped>
div.search-and-table-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  // button and search container
  &>div.search-filter-container {
    margin-bottom: 10px;
    display: flex;
    row-gap: 10px;
    column-gap: 15px;
    justify-content: space-between;

    &>div.filter-container {
      width: fit-content;
      display: flex;
      row-gap: 10px;
      column-gap: 16px;
      align-items: center;

      // dropdown
      &>div.dropdown-container {
        // width: 100%;
        width: fit-content;
        display: flex;
        row-gap: 10px;
        column-gap: 16px;
        align-items: center;

        &>div.dropdown-item {
          width: 165px;
          padding: unset;
        }
      }
    }

    &>div.btn-container {
      display: flex;
      flex-wrap: wrap;
      row-gap: 5px;
      column-gap: 10px;
      justify-content: flex-end;
      align-items: center;

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

        &:active {
          box-shadow: 0 0 5px transparent;
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

  // search and download button container
  &>div.search-and-download-btn-container {
    display: flex;
    row-gap: 10px;
    column-gap: 15px;

    &>div.search-input-container {
      width: 100%;
      display: flex;
      row-gap: 10px;
      column-gap: 16px;
      align-items: center;

      // search
      &>div.search-container {
        // width: 100%;
        width: 400px;
        display: flex;
        row-gap: 10px;
        column-gap: 150px;
      }

      // dropdown
      &>div.dropdown-container {
        width: fit-content;
        display: flex;
        row-gap: 10px;
        column-gap: 16px;
        align-items: center;

        &>div.dropdown-item {
          width: 165px;
          padding: unset;
        }
      }
    }

    &>div.btn-container {
      display: flex;
      flex-wrap: wrap;
      row-gap: 5px;
      column-gap: 10px;
      justify-content: flex-end;
      align-items: center;

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

        &:active {
          box-shadow: 0 0 5px transparent;
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
    &>div.search-filter-container {
      flex-direction: column;
      row-gap: 20px;

      &>div.filter-container {
        width: 100%;
        flex-direction: column;
        align-items: flex-start;

        // dropdown
        &>div.dropdown-container {
          width: 100% !important;
          flex-direction: column;
          align-items: flex-start;

          &>div.dropdown-item {
            width: 100% !important;
          }
        }
      }

      &>div.btn-container {
        width: 100%;

        button {
          width: 100%;
        }
      }
    }

    // search and download button container
    &>div.search-and-download-btn-container {
      display: none;
      // flex-direction: column;

      &>div.search-input-container {
        width: 100%;

        // search
        &>div.search-container {
          width: 100%;
          display: flex;
          row-gap: 10px;
          column-gap: 150px;
        }
      }

      &>div.btn-container {
        width: 100%;

        button {
          width: 100%;
          height: 35px;
        }
      }
    }
  }
}
// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  div.search-and-table-container {
    // button and search container
    &>div.search-filter-container {
      flex-direction: column;
      row-gap: 20px;

      &>div.filter-container {
        width: 100%;
        flex-direction: column;
        align-items: flex-start;

        // dropdown
        &>div.dropdown-container {
          width: 100% !important;
          flex-direction: column;
          align-items: flex-start;

          &>div.dropdown-item {
            width: 100% !important;
          }
        }
      }

      &>div.btn-container {
        width: 100%;

        button {
          width: 100%;
        }
      }
    }

    // search and download button container
    &>div.search-and-download-btn-container {
      display: none;
      // flex-direction: column;

      &>div.search-input-container {
        width: 100%;

        // search
        &>div.search-container {
          width: 100%;
          display: flex;
          row-gap: 10px;
          column-gap: 150px;
        }
      }

      &>div.btn-container {
        width: 100%;

        button {
          width: 100%;
          height: 35px;
        }
      }
    }
  }
}
// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.search-and-table-container {
    // button and search container
    &>div.search-filter-container {
      flex-direction: column;
      row-gap: 20px;

      &>div.filter-container {
        width: 100%;
        align-items: center;

        // dropdown
        &>div.dropdown-container {
          width: 100%;
          flex-direction: column;

          &>div.dropdown-item {
            width: 100%;
          }
        }
      }

      &>div.btn-container {
        justify-content: flex-start;
        // button {}
      }
    }

    // search and download button container
    &>div.search-and-download-btn-container {
      &>div.search-input-container {
        width: 100%;

        // search
        &>div.search-container {
          width: 100%;
          display: flex;
          row-gap: 10px;
          column-gap: 150px;
        }
      }

      &>div.btn-container {
        button {
          width: 100%;
          height: 35px;
        }
      }
    }
  }
}
// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  div.search-and-table-container {
    // button and search container
    &>div.search-filter-container {
      flex-direction: column;
      row-gap: 20px;

      &>div.filter-container {
        width: 100%;

        // dropdown
        &>div.dropdown-container {
          &>div.dropdown-item {
            width: 100%;
          }
        }
      }

      &>div.btn-container {
        width: 100%;
        justify-content: flex-start;

        // button {}
      }
    }
  }
}
// MD
@media (min-width: 768px) and (max-width: 991.9px) {
  div.search-and-table-container {
    // button and search container
    &>div.search-filter-container {
      gap: 20px;

      &>div.filter-container {
        width: 100%;

        // dropdown
        &>div.dropdown-container {
          &>div.dropdown-item {
            width: 100%;
          }
        }
      }

      // &>div.btn-container {}
    }
  }
}
// LG
@media (min-width: 992px) and (max-width: 1200.9px) {
  div.search-and-table-container {
    // button and search container
    &>div.search-filter-container {
      gap: 20px;

      &>div.filter-container {
        width: 100%;

        // dropdown
        &>div.dropdown-container {
          &>div.dropdown-item {
            width: 100%;
          }
        }
      }

      // &>div.btn-container {}
    }
  }
}
// XL
</style>
