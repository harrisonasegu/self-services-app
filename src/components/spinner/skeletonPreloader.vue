<script lang="ts" setup>
import { NSkeleton, NSpace } from 'naive-ui';
</script>

<template>
  <div class="skeleton-container">
    <n-space :size="20" :justify="'center'">
      <n-skeleton
        v-for="(item, index) in 12"
        :key="index"
        :width="300"
        height="100px"
        :sharp="false"
        size="medium"
      />
    </n-space>
  </div>
</template>
