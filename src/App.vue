<script setup lang="ts">
import { NLoadingBarProvider } from 'naive-ui'

import { useGlobalSpinnerStore } from '@/stores/common/globalSpinner'

import PageSpinner from '@/components/spinner/pageSpinner.vue'
import AppProvider from '@/components/application/appProvider.vue'

const store = useGlobalSpinnerStore()

const isLoading = store.getSpinnerState
</script>

<template>
  <n-loading-bar-provider>
    <AppProvider>
      <PageSpinner v-if="isLoading" />
      <RouterView />
    </AppProvider>
  </n-loading-bar-provider>
</template>

<style lang="scss" scoped>
@import './assets/styles/style.scss';

* {
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
}
</style>
