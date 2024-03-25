<script setup lang="ts">
import type { PropType } from 'vue';
import { NDataTable } from 'naive-ui'
import type { RowData } from 'naive-ui/es/data-table/src/interface';

import TableLoader from '@/components/spinner/tableLoader.vue'

defineProps({
  columns: {
    type: Array as PropType<any>,
    required: true
  },
  data: {
    type: Array as PropType<any>,
    required: true
  },
  count: {
    type: Number as PropType<number>,
    required: true
  },
  hasRowProps: {
    type: Boolean,
    required: false
  },
  rowKey: [Function, String, Number] as PropType<any>,
  remote: Boolean,
  loading: Boolean,
  pagination: Object,
  scrollX: Number
})

const emit = defineEmits([
  'tableRowClicked',
  'getCurrentPage',
  'getCurrentPageSize'
])

const rowProps = (row: RowData) => ({
  style: 'cursor: pointer;',
  onClick: () => emit('tableRowClicked', row)
})

const getCurrentPage = (page: number|string) => emit('getCurrentPage', page)
const getCurrentPageSize = (pageSize: number | string) => emit('getCurrentPageSize', pageSize)
</script>

<template>
  <n-data-table
    :remote="remote"
    :loading="loading"
    :columns="columns"
    :data="data"
    :row-key="rowKey"
    :row-props="hasRowProps ? rowProps : undefined"
    :pagination="count < 10 ? false : {
      ...pagination,
      showSizePicker: true,
      pageSizes: [10, 20, 50, 100],
      itemCount: count,
      displayOrder: ['size-picker', 'pages']
    }"
    :scroll-x="scrollX"
    :on-update:page="getCurrentPage"
    :on-update:page-size="getCurrentPageSize"
  >
    <template #loading>
      <TableLoader />
    </template>
  </n-data-table>
</template>
