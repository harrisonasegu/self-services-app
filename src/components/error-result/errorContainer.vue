<script setup lang="ts">
import { NButton } from 'naive-ui'
import ErrorResult from '@/components/error-result/errorResult.vue'

defineProps({
  status: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  showButton: {
    type: Boolean,
    required: false,
    default: () => true
  },
  showButtonIcon: {
    type: Boolean,
    required: false
  },
  buttonText: {
    type: String,
    required: false
  }
})

function handleClickedButton() {
  location.reload()
}
</script>

<template>
  <div class="no-product">
    <ErrorResult 
      :status="status ?? '500'"
      :title="title ?? 'Oops! An error occured'"
      :description="description ?? 'Refresh Page'"
      size="small"
    >
      <n-button 
        v-if="showButton"
        type="primary"
        @click="handleClickedButton">
        <span v-if="showButtonIcon">
          <Icon icon="ci:arrow-reload-02" />
          &nbsp; 
        </span>
        {{ buttonText ?? 'Refesh' }}
      </n-button>
    </ErrorResult>
  </div>
</template>

<style lang="scss" scoped>
div.no-product {
  padding: 100px 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
</style>
