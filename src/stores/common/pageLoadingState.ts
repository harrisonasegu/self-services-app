import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePageLoadingState = defineStore('pageLoadingState', () => {
  // state
  const isLoading = ref<boolean>(false)
  const hasPageLoadError = ref<boolean>(false)

  // getters
  const getLoadingState = computed(() => isLoading)
  const getPageLoadErrorState = computed(() => hasPageLoadError)

  // actions
  function setLoadingState(value: boolean) {
    isLoading.value = value
  }
  function setPageLoadErrorState(value: boolean) {
    hasPageLoadError.value = value
  }

  return {
    isLoading,
    getLoadingState,
    getPageLoadErrorState,
    setLoadingState,
    setPageLoadErrorState
  }
})
