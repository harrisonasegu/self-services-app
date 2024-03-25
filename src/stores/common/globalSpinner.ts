import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalSpinnerStore = defineStore('global_modal', () => {
  // state
  const spinnerState = ref<boolean>(false)

  // getters
  const getSpinnerState = computed(() => spinnerState)

  // actions
  const setSpinnerState = (data: boolean) => {
    spinnerState.value = data
  }

  return {
    getSpinnerState,
    setSpinnerState
  }
})
