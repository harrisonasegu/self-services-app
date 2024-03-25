<script setup lang="ts">
import { NResult } from 'naive-ui'
</script>

<template>
  <n-result>
    <template #footer>
      <slot />
    </template>
  </n-result>
</template>
