<script setup lang="ts">
import { NLayout, NLayoutContent } from 'naive-ui'
</script>

<template>
  <n-layout class="open-layout">
    <n-layout class="open-layout-content">
      <n-layout-content>
        <RouterView />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
