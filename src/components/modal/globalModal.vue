<script setup lang="ts">
import { NModal } from 'naive-ui'
import type { PropType } from 'vue'

defineProps({
  modalTitle: String,
  maskClosable: Boolean as PropType<boolean>
})

const emit = defineEmits(['closeModal', 'onPositiveClick', 'onNegativeClick'])

const onPositiveClick = () => emit('onPositiveClick')
const onNegativeClick = () => emit('onNegativeClick')
const closeModal = () => emit('closeModal')
</script>

<template>
  <n-modal
    preset="card"
    :mask-closable="maskClosable"
    :title="modalTitle"
    @negative-click="onNegativeClick"
    @positive-click="onPositiveClick"
    @after-leave="closeModal"
    @esc="closeModal"
  >
    <div class="modal-content-container">
      <slot name="modalContent"></slot>
    </div>
  </n-modal>
</template>

<style lang="scss">
.n-modal {
  width: fit-content !important;
}

@media (min-width: 576px) {
  .n-modal {
    width: fit-content !important;
    border-radius: 12px;
  }
}
</style>
