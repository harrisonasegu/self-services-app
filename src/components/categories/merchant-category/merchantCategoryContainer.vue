<script setup lang="ts">
import { useRouter } from 'vue-router'

import type { MerchantCategory_Interface } from '@/interface/merchantCategory'

import { useMerchantCategoryStore } from '@/stores/modules/merchantCategory';

import card from './merchantCategoryItem.vue'

const router = useRouter()

const merchantCategoryStore = useMerchantCategoryStore()

const categories = merchantCategoryStore.getMerchantCategories

const handleCategoryClick = (category: MerchantCategory_Interface) => {
  // update selected category
  merchantCategoryStore.updateSelectedMerchantCategory(category)

  const merchantCategoryId = btoa(JSON.stringify(category))
  // route merchants page
  router.push(`/self-services/merchant-categories/merchants/${merchantCategoryId}`)
}
</script>

<template>
  <!-- cards container -->
  <div class="cards-container">
    <div class="cards-wrap">
      <!-- category -->
      <card
        v-for="(merchantCategory, index) in categories"
        :key="index"  
        :merchantCategory="merchantCategory"
        @click="handleCategoryClick(merchantCategory)"
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
  width: calc((100% / 2) - 20px);
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
