<script lang="ts" setup>
import { NSelect } from 'naive-ui'
import { common } from '@/app-config/theme-config/common';
</script>
  
<template>
  <n-select>
    <template #arrow>
      <Icon icon="fluent:caret-down-20-filled" :color="common.primaryColor" />
    </template>
  </n-select>
</template>
