<script setup lang="ts">
import { onMounted, reactive, ref,  } from 'vue'
import { useRoute, useRouter } from 'vue-router';

import { NButton } from 'naive-ui'

import type { MerchantCategory_Interface } from '@/interface/merchantCategory';

import { usePageLoadingState } from '@/stores/common/pageLoadingState';
import { useMerchantStore } from '@/stores/modules/merchant';

import SkeletonPreloader from '@/components/spinner/skeletonPreloader.vue'
import ErrorContainer from '@/components/error-result/errorContainer.vue'
import MerchantListContainer from '@/components/categories/merchant-category/merchantListContainer.vue'
import InitiatePayment from '@/components/categories/payment-category/initiatePayment.vue'

const router = useRouter()
const route = useRoute()
const routeParams = route.params

const pageLoadingStore = usePageLoadingState()
const merchantStore = useMerchantStore()

const merchants = merchantStore.getMerchants

const isPageLoading = pageLoadingStore.getLoadingState
const hasPageLoadError = pageLoadingStore.getPageLoadErrorState

const currentView = ref('merchants')
const merchantCategory = reactive({
  id: 0,
  typeName: ''
})

const updateCurrentView = (view: string) => {
  currentView.value = view
}

const handleBackButtonClick = () => {  
  if (currentView.value === 'merchants') {
    router.back()
  } else {
    currentView.value = 'merchants'
  }
}

const handleCancelPaymentButtonClick = (view: string) => {
  // update selected category
  merchantStore.updateSelectedMerchant(null)
  // ----------------------------------------
  updateCurrentView(view)
}

onMounted(async () => {
  const merchantCategory_ = routeParams.merchantCategory as string
  const merchantCategoryData = JSON.parse(atob(merchantCategory_)) as MerchantCategory_Interface
  // ------------------------------------------
  merchantCategory.id = merchantCategoryData.id
  merchantCategory.typeName = merchantCategoryData.typeName

  pageLoadingStore.isLoading = (true)

  await merchantStore.GetMerchantList({
    merchantCategoryId: `${merchantCategoryData.id}`
  })
    .then((response) => {
      if (!['00', '01'].includes(response.responseCode)) {
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

    <section v-else class="main-page-content">
      <!-- back button -->
      <div
        v-if="(
          currentView === 'merchants' ||
          !merchants?.length
        )"
        class="nav-btn-container"
      >
        <div class="btn-container">
          <n-button
            round
            type="primary"
            @click="handleBackButtonClick"
          >
            <icon icon="icon-park-outline:back" height="20" />
            &nbsp;
            <span>Back</span>
          </n-button>
        </div>
      </div>

      <!-- categories available -->
      <div
        v-if="merchants?.length"
        class="categories-and-payment-container"
      >
        <div
          v-if="currentView === 'merchants'"
          class="categories-container"
        >
          <MerchantListContainer
            :merchantCategory="merchantCategory"
            @merchant:selected="updateCurrentView"
          />
        </div>

        <div
          v-if="currentView === 'initiate payment'"
          class="payment-container"
        >
          <InitiatePayment
            @initiate-payment:cancelled="handleCancelPaymentButtonClick"
          />
        </div>
      </div>

      <!-- no categories available -->
      <div v-else>
        <ErrorContainer
          :status="'info'"
          :title="' '"
          :description="'Merchants Unavailable'"
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
