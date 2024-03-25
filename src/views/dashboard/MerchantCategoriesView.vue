<script setup lang="ts">
import { onBeforeMount, ref,  } from 'vue'

import { usePageLoadingState } from '@/stores/common/pageLoadingState';
import { useMerchantCategoryStore } from '@/stores/modules/merchantCategory';

import SkeletonPreloader from '@/components/spinner/skeletonPreloader.vue'
import ErrorContainer from '@/components/error-result/errorContainer.vue'
import MerchantCategoryContainer from '@/components/categories/merchant-category/merchantCategoryContainer.vue'

const pageLoadingStore = usePageLoadingState()
const merchantCategoryStore = useMerchantCategoryStore()

const merchantCategories = merchantCategoryStore.getMerchantCategories

const isPageLoading = pageLoadingStore.getLoadingState
const hasPageLoadError = pageLoadingStore.getPageLoadErrorState

const currentView = ref('payment categories')

const updateCurrentView = (view: string) => {
  currentView.value = view
}

onBeforeMount(async () => {
  // if (merchantCategories.value.length) return
  // ------------------------------------------

  pageLoadingStore.isLoading = (true)

  await merchantCategoryStore.GetMerchantCategoryList()
    .then((response) => {
      if (
        response.responseCode !== '00'
      ) {
        pageLoadingStore.setPageLoadErrorState(true)
      }

      pageLoadingStore.setLoadingState(false)
    })
    .catch(() => {
      pageLoadingStore.setLoadingState(false)
      pageLoadingStore.setPageLoadErrorState(true)
    })
})
</script>

<template>
  <div class="page-view">
    <section v-if="isPageLoading">
      <SkeletonPreloader />
    </section>

    <section v-else-if="hasPageLoadError">
      <ErrorContainer />
    </section>

    <section v-else  class="main-page-content">
      <!-- categories available -->
      <div
        v-if="merchantCategories?.length"
        class="categories-and-payment-container"
      >
        <MerchantCategoryContainer
          @payment-category:selected="updateCurrentView"
        />
      </div>

      <!-- no categories available -->
      <div v-else>
        <ErrorContainer
          :status="'info'"
          :title="' '"
          :description="'Merchant Categories Unavailable'"
          :show-button="false"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables/_fonts.scss';

.page-view {
  min-height: 85vh;
  border-top: 1px solid $grey-1;
  padding: 30px 0 50px;

  // main page content
  &>section.main-page-content {
    display: flex;
    flex-direction: column;
    row-gap: 40px;

    &>div.categories-and-payment-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      row-gap: 40px;
      align-items: center;
      
      &>div {
        width: 100%;
        display: flex;
        justify-content: center;
        transition: all 0.2s;
        animation-name: payment-and-category-container;

        // payment category container
        &.categories-container {
          animation-duration: 1.5s;
        }

        // payment container
        &.payment-container {
          animation-name: payment-container;
          animation-duration: 0.5s;
        }

        // animation for payment views
        @keyframes payment-container {
          from {
            transform: translateX(-200px);
          }
        }
      }

      @keyframes payment-and-category-container {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }
    }
  }
}

// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  .page-view {
    border: unset;
    padding: 0 5px;
    
    section {      
      // main page content
      &.main-page-content {
        padding: 20px 0 30px;
        row-gap: 40px;
      }
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  .page-view {
    border: unset;
    padding: 0 5px;

    section {
      // main page content
      &.main-page-content {
        padding: 20px 0 30px;
        row-gap: 40px;
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  .page-view {
    padding: 0 5px;

    section {
      // main page content
      &.main-page-content {
        padding: 20px 0 30px;
        row-gap: 40px;
      }
    }
  }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  .page-view {
    padding: 0 5px;

    section {
      // main page content
      &.main-page-content {
        padding: 20px 0 30px;
        row-gap: 40px;
      }
    }
  }
}

// MD
@media (min-width: 768px) and (max-width: 991.9px) {
  .page-view {
    padding: 0 10px;
    
    section {
      // main page content
      &.main-page-content {
        padding: 20px 0 30px;
        row-gap: 40px;
      }
    }
  }
}

// LG
@media (min-width: 992px) and (max-width: 1200.9px) {
  .page-view {
    // padding: 0 10px;
    
    section {
      // main page content
      &.main-page-content {
        padding: 20px 0 30px;
        row-gap: 40px;
      }
    }
  }
}
</style>
