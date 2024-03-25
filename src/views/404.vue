<script setup lang="ts">
import { ref } from 'vue'
import { NButton } from 'naive-ui'
import { useRouter } from 'vue-router'

import ErrorResult from '@/components/error-result/errorResult.vue'

const router = useRouter()

const btnText = ref('')

function handleClickedButton () {
  router.replace('/')
}
</script>

<template>
  <div class="page-view">
    <ErrorResult 
      status="404"
      title="Page Not Found!"
      description="_________"
      size="huge"
      :btnText="btnText"
      @handleClickedButton="handleClickedButton" 
    >
      <n-button
        @click="handleClickedButton"
      >Go To Home</n-button>
    </ErrorResult>
  </div>
</template>

<style lang="scss" scoped>
.page-view {
  padding: 100px 20px;
  display: flex;
  justify-content: center;
}
</style>
