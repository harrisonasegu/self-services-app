import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { request } from '@/app-config/http-request/axios-config'

import { useRequestHashKey } from '@/composables/userRequestHashKey'

import type { MerchantCategory_Interface } from '@/interface/merchantCategory'

// import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useResponseMessageStore } from '@/stores/common/responseMessage'

// const { getUser } = useAuthenticationStore()
const { updateResponse } = useResponseMessageStore()

// const user = getUser.value

export const useMerchantCategoryStore = defineStore('merchant category', () => {
  // state
  const merchantCategories = ref<MerchantCategory_Interface[]>([])
  const businessTypes = ref<MerchantCategory_Interface[]>([])
  const selectedMerchantCategory = ref<MerchantCategory_Interface | null>(null)

  // getters
  const getMerchantCategories = computed(() => merchantCategories)
  const getBusinessTypes = computed(() => businessTypes)
  const getSelectedMerchantCategory = computed(() => selectedMerchantCategory)

  // actions
  function updateSelectedMerchantCategory(category: MerchantCategory_Interface|null) {
    // update selected category
    selectedMerchantCategory.value = category
  }

  async function GetMerchantCategoryList() {
    return await request(
      'selfService',
      useRequestHashKey('selfService')
    )
      .get('MerchantCategory/GetMerchantCategoryList')
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful activation
          case '00':
            // update list
            merchantCategories.value = responseData.data
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

  async function GetBusinessType() {
    return await request(
      'selfService',
      useRequestHashKey('selfService')
    )
      .get('MerchantCategory/GetBusinessType')
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful activation
          case '00':
            // update list
            businessTypes.value = responseData.data

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
    getMerchantCategories,
    getBusinessTypes,
    getSelectedMerchantCategory,
    // -----------------------------------------------------
    updateSelectedMerchantCategory,
    GetMerchantCategoryList,
    GetBusinessType
  }
})
