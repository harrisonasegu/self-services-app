import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMobileSidebarMenu = defineStore('mobileSidebarMenu', () => {
  // state
  const showMenu = ref<boolean>(false)

  // getters
  const getSideMenuState = computed(() => showMenu.value)

  // actions
  function setSideMenuState(boolVal: boolean) {
    showMenu.value = boolVal
  }

  return { showMenu, getSideMenuState, setSideMenuState }
})
