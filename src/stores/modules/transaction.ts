import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { request } from '@/app-config/http-request/axios-config'

import { useRequestHashKey } from '@/composables/userRequestHashKey'
import { useStringToSentence } from '@/composables/camelCaseToTitle'

import type { CompleteTransaction_Interface, InitiateTransaction_Interface, PaidItem_Interface, TransactionItem_Interface, TransactionReportPayload_Interface } from '@/interface/transaction'

// import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useNumberToCurrency } from '@/composables/formatNumber'
import { useFormatDateTime } from '@/composables/formatDateString'

interface DashboardTransaction_Interface {
  name: string
  date: string
  amount: string
  status: string
}

// const { getUser } = useAuthenticationStore()
const { updateResponse } = useResponseMessageStore()

// const user = getUser.value

export const useTransactionStore = defineStore('transaction', () => {
  // state
  const transactions = ref<TransactionItem_Interface[]>([])
  const dashboardTransactions = reactive<{
    newestTransactions: DashboardTransaction_Interface[]
    yesterdayTransactions: DashboardTransaction_Interface[]
    previousTransactions: DashboardTransaction_Interface[]
  }>({
    newestTransactions: [],
    yesterdayTransactions: [],
    previousTransactions: []
  })
  const paidItems = ref<PaidItem_Interface[]>([])

  // getters
  const getTransactions = computed(() => transactions)
  const getDashboardTransactions = computed(() => dashboardTransactions)
  const getPaidItems = computed(() => paidItems)

  // actions
  function updateDashboardTransactionInfo() {
    const today = new Date().getDate()
    const yesterday = today - 1

    transactions.value.forEach((transaction, index) => {
      // filter transaction items by transaction date(today and yesterday)
      const date = transaction.transactionDate
      const transactionDate_ = new Date(date).getDate()

      const formattedTrxdate = useFormatDateTime(transaction.transactionDate).split(' ')
      
      const item_ = {
        name: transaction.narration,
        amount: useNumberToCurrency(transaction.amount, 'ngn'),
        status: transaction.statusCode === '00' ? 'successful'
          : transaction.statusCode === '01' ? 'failed'
          : 'pending',
        date: `${formattedTrxdate[0]}, at ${formattedTrxdate[1]}`
      }

      // update dashboard transactions
      transactionDate_ === today
        ? dashboardTransactions.newestTransactions[index] = item_
      : transactionDate_ === yesterday
        ? dashboardTransactions.yesterdayTransactions[index] = item_
        : dashboardTransactions.previousTransactions[index] = item_
    })
  }

  async function InitiateTransaction(payload: InitiateTransaction_Interface) {
    return await request(
      'selfService',
      useRequestHashKey('selfService', [
        payload.customerReference,
        payload.email,
        payload.merchantId,
        payload.transactionReferenceNo,
        payload.sessionManager,
        useStringToSentence(`${ payload.isLogedin }`),
        payload.firstName,
        payload.totalamount
      ])
    )
      .post('Transaction/InitiateTransaction', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful initialization
          case '77':
            // update notification
            updateResponse('Initiate Transaction', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Initiate Transaction', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // update notification
        updateResponse('Initiate Transaction', 'error', error.message)
      })
  }

  async function CompleteTransaction(payload: CompleteTransaction_Interface) {
    return await request(
      'selfService',
      useRequestHashKey('selfService', [
        payload.merchantId,
        payload.paymentReference,
        payload.debitReference,
        payload.transactionReference,
        payload.amount
      ])
    )
      .post('Transaction/CompleteTransaction', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful activation
          case '00':
            // update notification
            updateResponse('Complete Transaction', 'error', responseMessage)
            break

          default:
            // update notification
            updateResponse('Complete Transaction', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // update notification
        updateResponse('Complete Transaction', 'error', error.message)
      })
  }

  async function TransactionReport(payload: TransactionReportPayload_Interface) {
    return await request(
      'selfService',
      useRequestHashKey('selfService', [
        payload.customerReference,
        payload.paymentReference,
        payload.transactionReference,
        payload.name
      ])
    )
      .post('Transaction/TransactionReport', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            // update list
            transactions.value = responseData.data

            // update notification
            updateResponse('Complete Transaction', 'error', responseMessage)
            break

          // no items available
          case '01':
            // update list
            transactions.value = []

            // update notification
            updateResponse('Complete Transaction', 'error', responseMessage)
            break

          default:
            // update notification
            updateResponse('Complete Transaction', 'error', responseMessage)
            break
        }

        // update dashbard transaction info
        updateDashboardTransactionInfo()

        return responseData
      })
      .catch(error => {
        // update notification
        updateResponse('Complete Transaction', 'error', error.message)
      })
  }

  async function GetPaidItemsDetails(payload: {
    transactionId:  number
    customerReference: string
  }) {
    return await request(
      'selfService',
      useRequestHashKey('selfService', [
        payload.customerReference,
        payload.transactionId
      ])
    )
      .post('Transaction/GetPaidItemsDetails', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          case '00':
            // update list
            paidItems.value = responseData.data

            // update notification
            updateResponse('Transaction Items', 'error', responseMessage)
            break

          // no items available
          case '01':
            // update list
            transactions.value = []

            // update notification
            updateResponse('Transaction Items', 'error', responseMessage)
            break

          default:
            // update notification
            updateResponse('Transaction Items', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // update notification
        updateResponse('Transaction Items', 'error', error.message)
      })
  }

  return {
    getTransactions,
    getDashboardTransactions,
    getPaidItems,
    // -----------------------------------------------------
    InitiateTransaction,
    CompleteTransaction,
    TransactionReport,
    GetPaidItemsDetails
  }
})
