<script setup lang="ts">
import { onBeforeMount } from 'vue'
import {
  NSpace,
  NGrid,
  NGi
} from 'naive-ui'

import { usePageLoadingState } from '@/stores/common/pageLoadingState'
import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useTransactionStore } from '@/stores/modules/transaction'

import SkeletonPreloader from '@/components/spinner/skeletonPreloader.vue'
import ErrorContainer from '@/components/error-result/errorContainer.vue'
import GlobalAtmCard from '@/components/dashboard/debit-credit-cards/globalAtmCard.vue'
import Salary from '@/components/dashboard/salary-cards/globalCard.vue'
import Invoice from '@/components/dashboard/invoice/invoiceContainer.vue'
import PaymentMethod from '@/components/dashboard/payment-method/paymentMethodContainer.vue'
import BillingInformation from '@/components/dashboard/billing-information/billingInformationContainer.vue'
import Transactions from '@/components/dashboard/transactions/transactionsContainer.vue'

const pageLoadingStore = usePageLoadingState()
const authenticationStore = useAuthenticationStore()
const transactionStore = useTransactionStore()

const isPageLoading = pageLoadingStore.getLoadingState
const hasPageLoadError = pageLoadingStore.getPageLoadErrorState

const user = authenticationStore.getUser.value
const transactions = transactionStore.getTransactions

const getDashboardInformation = async () => {
  // check if transactions exist in store
  if (transactions.value.length) return

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
}

onBeforeMount(() => getDashboardInformation())
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
      <n-space
        vertical
        :size="20"
      >
      <!-- payment method and invoices -->
        <n-grid
          cols="12"
          item-responsive
          responsive="screen"
          :x-gap="20" 
          :y-gap="25"
        >
          <!-- atm card, (salary and paypal) and payment method -->
          <n-gi span="12 m:7 l:6 xl:8">
            <n-space
              vertical
              :size="25"
            >
              <!-- atm card, (salary and paypal) -->
              <n-grid
                cols="12"
                item-responsive
                responsive="screen"
                :x-gap="10" 
                :y-gap="25"
              >
                <!-- atm card -->
                <n-gi span="12 m:6 l:12 xl:6">
                  <div>
                    <GlobalAtmCard />
                  </div>
                </n-gi>

                <!-- (salary and paypal) container -->
                <n-gi span="12 m:6 l:12 xl:6">
                  <div>
                    <n-grid
                      cols="12"
                      item-responsive
                      responsive="screen"
                      :x-gap="10" 
                      :y-gap="25"
                    >
                      <!-- (salary and paypal) -->
                      <n-gi span="12 s:6">
                        <div>
                          <Salary
                            transaction-type="successful"
                            :total-transaction-amount="user?.pendingTranxValue ?? 0"
                            />
                        </div>
                      </n-gi>
                      <n-gi span="12 s:6">
                        <div>
                          <Salary
                            transaction-type="pending"
                            :total-transaction-amount="user?.successfulTranxValue ?? 0"
                            />
                        </div>
                      </n-gi>
                    </n-grid>
                  </div>
                </n-gi>
              </n-grid>

              <!--  payment method -->
              <n-gi span="12 m:5 l:6 xl:4">
                <div>
                  <PaymentMethod />
                </div>
              </n-gi>
            </n-space>
          </n-gi>

          <!-- invoices -->
          <n-gi span="12 m:5 l:6 xl:4">
            <div>
              <Invoice />
            </div>
          </n-gi>
        </n-grid>
        
        <!-- billing information and transactions -->
        <n-grid
          cols="12"
          item-responsive
          responsive="screen"
          :x-gap="20" 
          :y-gap="25"
        >
          <n-gi span="12 s:6 m:7 l:6 xl:7">
            <div>
              <BillingInformation />
            </div>
          </n-gi>
          <n-gi span="12 s:6 m:5 l:6 xl:5">
            <div>
              <Transactions />
            </div>
          </n-gi>
        </n-grid>
      </n-space>
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

    // .n-grid {}

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
