import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { request } from '@/app-config/http-request/axios-config'

import { useRequestHashKey } from '@/composables/userRequestHashKey'

import type { InitiateWalletTransaction_Interface } from '@/interface/walletTransaction'

// import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useResponseMessageStore } from '@/stores/common/responseMessage'

// const { getUser } = useAuthenticationStore()
const { updateResponse } = useResponseMessageStore()

// const user = getUser.value

export const useWalletTransactionStore = defineStore('wallet transaction', () => {
  // state
  const transactions = ref([])

  // getters
  const getTransaction = computed(() => transactions)

  // actions
  async function InitiateWalletTransaction(payload: InitiateWalletTransaction_Interface) {
    return await request(
      'wallet',
      useRequestHashKey('wallet', [
        payload.accountNo,
        payload.transactionReference,
        payload.amount
      ])
    )
      .post('WalletMiddleware/InitiateTransaction', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful initialization
          case '00':
            // update notification
            updateResponse('Make Payment', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Make Payment', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // update notification
        updateResponse('Make Payment', 'error', error.message)
      })
  }

  async function CompleteWalletTransaction(payload: { transactionRef: string, otp: string }) {
    return await request(
      'wallet',
      useRequestHashKey('wallet', [
        payload.transactionRef,
        payload.otp
      ])
    )
      .post('WalletMiddleware/CompleteTransaction', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful activation
          case '00':
            // update notification
            updateResponse('Complete Payment', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Complete Payment', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // update notification
        updateResponse('Complete Payment', 'error', error.message)
      })
  }

  return {
    getTransaction,
    // -----------------------------------------------------
    InitiateWalletTransaction,
    CompleteWalletTransaction
  }
})
