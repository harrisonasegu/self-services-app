<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import type { TransactionResponse_Interface } from '@/interface/walletTransaction'

import PaymentResponse from '@/components/payment-gateway/paymentResponse.vue'

const route = useRoute()
const routeParams = route.params

const transactionResponse = reactive<TransactionResponse_Interface>({
  paymentRef: '',
  transactionReference: '',
  responseCode: '',
  responseMessage: '',
  amount: 0,
  accountNo: '',
  hashKey: '',
  hashKeyResponse: '',
  callBackUrl: '',
  param1: '',
  param2: '',
  param3: ''
})

async function updateUserActivationParams() {
  const transactionResponse_ = routeParams.paymentResponse as string
  const transactionResponseDecrypted_ = atob(transactionResponse_)
  const transactionResponseData = JSON.parse(transactionResponseDecrypted_) as TransactionResponse_Interface

  // update user transaction params
  transactionResponse.paymentRef = transactionResponseData.paymentRef
  transactionResponse.transactionReference = transactionResponseData.transactionReference
  transactionResponse.responseCode = transactionResponseData.responseCode
  transactionResponse.responseMessage = transactionResponseData.responseMessage
  transactionResponse.amount = transactionResponseData.amount
  transactionResponse.accountNo = transactionResponseData.accountNo
  transactionResponse.hashKey = transactionResponseData.hashKey
  transactionResponse.hashKeyResponse = transactionResponseData.hashKeyResponse
  transactionResponse.amount = transactionResponseData.amount
  transactionResponse.callBackUrl = transactionResponseData.callBackUrl
  transactionResponse.param1 = transactionResponseData.param1 ?? ''
  transactionResponse.param2 = transactionResponseData.param2 ?? ''
  transactionResponse.param3 = transactionResponseData.param2 ?? ''
}

onMounted(() => updateUserActivationParams())
</script>

<template>
  <div class="page-view">
    <section class="overlay">
      <!-- defult password reset form for valid reset password url -->
      <section class="form-container">
        <PaymentResponse
          :transactionResponse="transactionResponse"
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
