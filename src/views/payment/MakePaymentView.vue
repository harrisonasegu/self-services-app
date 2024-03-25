<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import type { InitiateWalletTransaction_Interface } from '@/interface/walletTransaction';

import WalletPaymentGateway from '@/components/payment-gateway/walletPaymentGateway.vue'

const route = useRoute()
const routeParams = route.params

const transactionParams = reactive<InitiateWalletTransaction_Interface>({
  merchantName: '',
  customerName: '',
  accountNo: '',
  phoneNo: '',
  emailAddress: '',
  address: '',
  transactionReference: '',
  amount: 0,
  narration: '',
  billingCode: '',
  productCode: '',
  transactionDate: '',
  responseUrl: '',
  param1: ''
})

async function updateUserActivationParams() {
  const walletTransactionParams_ = routeParams.paymentParams as string
  const walletTransactionParamsDecrypted_ = atob(walletTransactionParams_)
  const walletTransactionData = JSON.parse(walletTransactionParamsDecrypted_) as any

  // update user transaction params
  transactionParams.merchantName = walletTransactionData.merchantName
  transactionParams.customerName = walletTransactionData.customerName
  transactionParams.accountNo = walletTransactionData.accountNo
  transactionParams.phoneNo = walletTransactionData.phoneNo
  transactionParams.emailAddress = walletTransactionData.emailAddress
  transactionParams.address = walletTransactionData.address
  transactionParams.transactionReference = walletTransactionData.transactionReference
  transactionParams.amount = walletTransactionData.amount
  transactionParams.narration = walletTransactionData.narration
  transactionParams.billingCode = walletTransactionData.billingCode
  transactionParams.productCode = walletTransactionData.productCode
  transactionParams.transactionDate = walletTransactionData.transactionDate
  transactionParams.responseUrl = walletTransactionData.responseUrl
  transactionParams.param1 = walletTransactionData.merchantId
}

onMounted(() => updateUserActivationParams())
</script>

<template>
  <div class="page-view">
    <section class="overlay">
      <!-- defult password reset form for valid reset password url -->
      <section class="form-container">
        <WalletPaymentGateway
          :transactionParams="transactionParams"
        />
      </section>
    </section>
  </div>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

div.page-view {
  &>section {

    // overlay
    &.overlay {
      width: 100%;
      min-height: 100vh;
      padding: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(to bottom, $base-color-3, #d9d9d9c6), url("@/assets/images/onboarding-bg-image/money-man.png");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: left;

      &>section.form-container {
        width: fit-content;
      }
    }
  }
}

// MEDIA QUERY

// XX-SM (<351px)
@media (max-width: 350.9px) {
  div.page-view {
    &>section {

      // overlay
      &.overlay {
        width: 100%;
        min-height: 100vh;
        padding: 50px 5px;

        &>section.form-container {
          width: 100%;
          padding: 50px 0 0;
        }
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.page-view {
    &>section {

      // overlay
      &.overlay {
        width: 100%;
        min-height: 100vh;
        padding: 50px 20px;

        &>section.form-container {
          width: 100%;
        }
      }
    }
  }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  div.page-view {
    &>section {

      // overlay
      &.overlay {
        width: 100%;
        min-height: 100vh;
        padding: 50px 20px;

        // &>section.form-container {}
      }
    }
  }
}

// MD
// @media (min-width: 768px) and (max-width: 991.9px) {}

// LG
// @media (min-width: 992px) and (max-width: 1200.9px) {}

// XL
// @media (min-width: 1201px) and (max-width: 1499.9px) {}

// XXL
// @media (min-width: 1500px) {}
</style>
