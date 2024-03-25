<script setup lang="ts">
import type { MerchantCategory_Interface } from '@/interface/merchantCategory';
import type { Merchant_Interface } from '@/interface/merchant';

import { useMerchantStore } from '@/stores/modules/merchant';

import card from './merchantItem.vue'

defineProps<{
  merchantCategory: MerchantCategory_Interface
}>()

const emit = defineEmits(['merchant:selected'])

const merchantStore = useMerchantStore()

const merchants = merchantStore.getMerchants

const handleCategoryClick = (merchant: Merchant_Interface) => {
  // update selected merchant
  merchantStore.updateSelectedMerchant(merchant)

  emit('merchant:selected', 'initiate payment')
}
</script>

<template>
  <!-- cards container -->
  <div class="cards-container">
    <div class="cards-wrap">
      <!-- category -->
      <card
        v-for="(merchant, index) in merchants"
        :key="index"  
        :merchantCategory="merchantCategory"
        :merchant="merchant"
        @click="handleCategoryClick(merchant)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

// cards container
div.cards-container {
  width: 100%;
  display: flex;

  div.cards-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    row-gap: 25px;
    column-gap: 25px;
  }
}


// MEDIA QUERY

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  // cards container
  div.cards-container {
    div.cards-wrap {
      row-gap: 10px;
      column-gap: 10px;
    }
  }
}

// MD
@media (min-width: 768px) and (max-width: 991.9px) {
  // cards container
  div.cards-container {
    div.cards-wrap {
      row-gap: 10px;
      column-gap: 10px;
    }
  }
}

// LG
@media (min-width: 992px) and (max-width: 1200.9px) {
  // cards container
  div.cards-container {
    div.cards-wrap {
      row-gap: 10px;
      column-gap: 10px;
    }
  }
}
</style>
