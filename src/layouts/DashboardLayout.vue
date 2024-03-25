<script setup lang="ts">
import { onBeforeMount, watch } from 'vue'
// import { NLayout, NLayoutContent, useNotification } from 'naive-ui'
import { NLayout, NLayoutContent } from 'naive-ui'

import DashboardSidebar from '@/components/sidebars/dashboardSidebar.vue'
import DashboardHeader from '@/components/headers/dashboardHeader.vue'

// import { useResponseNotification } from '@/composables/responseNotification'
// import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useGlobalSpinnerStore } from '@/stores/common/globalSpinner'
import { useAuthenticationStore } from '@/stores/modules/authentication'

// const notification = useNotification()
// const responseMessageStore = useResponseMessageStore()
const globalSpinner = useGlobalSpinnerStore()
const authStore = useAuthenticationStore()

const isLogoutMenuClicked = authStore.getIsLogoutMenuClicked

// const showNotification = (duration: number) => {
//   useResponseNotification(
//     notification,
//     responseMessageStore.response.status,
//     responseMessageStore.response.title,
//     responseMessageStore.response.message,
//     duration
//   )
// }

const handleLogout = async () => {
  // toggle global spinner
  globalSpinner.setSpinnerState(true)

  await authStore.Logout()
    .finally(() => location.assign('/'))
}

const updateUserCredentials = () => authStore.updateUserDataRef()

onBeforeMount(() => updateUserCredentials())

watch(isLogoutMenuClicked, (value: boolean) => {
  if (value) handleLogout()
})
</script>

<template>
  <n-layout position="absolute" has-sider class="dashboard-layout">
    <DashboardSidebar />

    <n-layout class="dashboard-content">
      <DashboardHeader />
      
      <n-layout-content>
        <RouterView />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard-layout {
  background: $dashboard-bg;

  .dashboard-content {
    min-height: 100vh;
    background: transparent;

    .n-layout-content {
      padding: 0 50px;
      background: transparent;
    }
  }
}
// MEDIA QUERY

// XX-SM - MD (<992)
@media (max-width: 1200.9px) {
  .dashboard-layout {
    .dashboard-content {
      .n-layout-content {
        padding: 0;
      }
    }
  }
}

// LG
@media (min-width: 992px) and (max-width: 1200.9px) {
  .dashboard-layout {
    .dashboard-content {
      .n-layout-content {
        padding: 0 25px;
      }
    }
  }
}
</style>
