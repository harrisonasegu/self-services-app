import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

import type { ResponseMessage_Interface } from '@/interface/common/responseMessage'

export const useResponseMessageStore = defineStore('responseMessage', () => {
  // state
  const response = reactive<ResponseMessage_Interface>({
    title: '',
    status: '',
    message: ''
  })

  // getters
  const getResponse = computed(() => response)

  // actions
  function SetResponse(data: ResponseMessage_Interface) {
    response.title = data.title
    response.status = data.status
    response.message = data.message
  }

  function updateResponse(title: string, status: string, message: string) {
    SetResponse({ title, status, message })
  }

  return { response, getResponse, updateResponse }
})
