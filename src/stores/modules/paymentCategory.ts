import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { request } from '@/app-config/http-request/axios-config'

import { useRequestHashKey } from '@/composables/userRequestHashKey'

import type { PaymentCategory_Interface, RevenueItem_Interface } from '@/interface/paymentCategory'

// import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useResponseMessageStore } from '@/stores/common/responseMessage'

// const { getUser } = useAuthenticationStore()
const { updateResponse } = useResponseMessageStore()

// const user = getUser.value

export const usePaymentCategoryStore = defineStore('payment category', () => {
  // state
  const paymentCategories = ref<PaymentCategory_Interface[]>([])
  const paymentItems = ref<RevenueItem_Interface[]>([])
  const selectedPaymentCategory = ref<PaymentCategory_Interface | null>(null)

  // getters
  const getPaymentCategories = computed(() => paymentCategories)
  const getPaymentItems = computed(() => paymentItems)
  const getSelectedPaymentCategory = computed(() => selectedPaymentCategory)

  // actions
  function updateSelectedPaymentCategory(category: PaymentCategory_Interface|null) {
    // update selected category
    selectedPaymentCategory.value = category
  }

  async function GetPaymentItemCategoryList(payload: { merchantId: string }) {
    return await request(
      'selfService',
      useRequestHashKey('selfService', [
        payload.merchantId
      ])
    )
      .post('PaymentItems/GetPaymentItemCategoryList', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful
          case '00':
            // update list
            paymentCategories.value = responseData.data
            break

          // no data
          case '01':
            // update list
            paymentCategories.value = []

            // update notification
            updateResponse('Payment Category', 'error', responseMessage)
            break

          default:
            // update notification
            updateResponse('Payment Category', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // update notification
        updateResponse('Payment Category', 'error', error.message)
      })
  }

  async function GetPaymentItemList(payload: {
    merchantId: string
    paymentItemCategoryId: string
  }) {
    return await request(
      'selfService',
      useRequestHashKey('selfService', [
        payload.paymentItemCategoryId,
        payload.merchantId
      ])
    )
      .post('PaymentItems/GetPaymentItemList', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful
          case '00':
            // update list
            paymentItems.value = responseData.data
            break

          // no data
          case '01':
            // update list
            paymentItems.value = []

            // update notification
            updateResponse('Payment Item', 'error', responseMessage)
            break

          default:
            // update notification
            updateResponse('Payment Item', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // update notification
        updateResponse('Payment Item', 'error', error.message)
      })
  }

  return {
    getPaymentCategories,
    getPaymentItems,
    getSelectedPaymentCategory,
    // -----------------------------------------------------
    updateSelectedPaymentCategory,
    GetPaymentItemCategoryList,
    GetPaymentItemList
  }
})
