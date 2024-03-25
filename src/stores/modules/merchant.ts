import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { request } from '@/app-config/http-request/axios-config'

import { useRequestHashKey } from '@/composables/userRequestHashKey'

import type { Merchant_Interface } from '@/interface/merchant'

// import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useResponseMessageStore } from '@/stores/common/responseMessage'

// const { getUser } = useAuthenticationStore()
const { updateResponse } = useResponseMessageStore()

// const user = getUser.value

export const useMerchantStore = defineStore('merchant', () => {
  // state
  const merchants = ref<Merchant_Interface[]>([])
  const selectedMerchant = ref<Merchant_Interface | null>(null)

  // getters
  const getMerchants = computed(() => merchants)
  const getSelectedMerchant = computed(() => selectedMerchant)

  // actions
  function updateSelectedMerchant(merchant: Merchant_Interface | null) {
    // update selected merchant
    selectedMerchant.value = merchant
  }

  async function GetMerchantList(payload: { merchantCategoryId: string }) {
    return await request(
      'selfService',
      useRequestHashKey('selfService', [
        payload.merchantCategoryId
      ])
    )
      .post('Merchant/GetMerchantList', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful
          case '00':
            // update list
            merchants.value = responseData.data
            break

          // no data
          case '01':
            // update list
            merchants.value = []

            // update notification
            updateResponse('Merchants', 'error', responseMessage)
            break

          default:
            // update notification
            updateResponse('Merchants', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // update notification
        updateResponse('Merchants', 'error', error.message)
      })
  }

  return {
    getMerchants,
    getSelectedMerchant,
    // -----------------------------------------------------
    updateSelectedMerchant,
    GetMerchantList
  }
})
