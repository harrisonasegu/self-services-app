<script setup lang="ts">
import { onMounted } from 'vue'

import { usePageLoadingState } from '@/stores/common/pageLoadingState'
import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useTransactionStore } from '@/stores/modules/transaction'

import Preloader from '@/components/spinner/preloader.vue'
import ErrorContainer from '@/components/error-result/errorContainer.vue'
import AllTransactions from '@/components/tables/reports/allTransactions.vue'

const pageLoadingStore = usePageLoadingState()
const authenticationStore = useAuthenticationStore()
const transactionStore = useTransactionStore()

const isPageLoading = pageLoadingStore.getLoadingState
const hasPageLoadError = pageLoadingStore.getPageLoadErrorState

const user = authenticationStore.getUser.value

onMounted(async () => {
  pageLoadingStore.isLoading = (true)

  await transactionStore.TransactionReport({
    customerReference: user?.customerReference as string,
    paymentReference: '',
    transactionReference: '',
    name: ''
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
      <Preloader />
    </section>

    <section v-else-if="hasPageLoadError">
      <ErrorContainer />
    </section>

    <section v-else class="main-page-content">
      <AllTransactions />
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
