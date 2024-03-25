<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import {
  useNotification,
  NButton,
  NForm,
  NFormItem,
  NInput
} from 'naive-ui'

import type { InitiateWalletTransaction_Interface } from '@/interface/walletTransaction'

import { useResponseNotification } from '@/composables/responseNotification'
import { useNumberToCurrencyConverter } from '@/composables/numberToCurrencyConverter'

import { InputRegex } from '@/utils/regex/validations';

import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useWalletTransactionStore } from '@/stores/modules/walletTransaction'
// import { useTransactionStore } from '@/stores/modules/transaction'

import OTPCode from '@/components/otp/otpCode.vue'

import Logo from "@/assets/logo.png";

const props = defineProps<{
  transactionParams: InitiateWalletTransaction_Interface
}>()

const router = useRouter()
const notification = useNotification()
const responseMessageStore = useResponseMessageStore()
const walletTransactionStore = useWalletTransactionStore()
// const transactionStore = useTransactionStore()

const isLoading = ref<boolean>(false)

const model = reactive<any>({
  accountNumber: null,
  hasOTP: false,
  otp: null
})

const otpRequestPayload = computed((): InitiateWalletTransaction_Interface => ({
  merchantName: props.transactionParams.merchantName,
  customerName: props.transactionParams.customerName,
  accountNo: model.accountNumber,
  phoneNo: props.transactionParams.phoneNo,
  emailAddress: props.transactionParams.emailAddress,
  address: props.transactionParams.address,
  transactionReference: props.transactionParams.transactionReference,
  amount: props.transactionParams.amount,
  narration: props.transactionParams.narration,
  billingCode: props.transactionParams.billingCode,
  productCode: props.transactionParams.productCode,
  transactionDate: new Date(new Date().getTime() + (1 * 60 * 60 * 24 * 1000)).toISOString(),
  responseUrl: props.transactionParams.responseUrl,
  param1: `${props.transactionParams.param1}`
}))

const isAccountNumberRequired = computed(() => model.accountNumber?.length !== 10)
const isOTPRequired = computed(() => model.otp?.length !== 6)

const allowedAccountNumberInput = (val: string) => !val || InputRegex.accountNumber.test(val)

const showNotification = (duration: number) => {
  useResponseNotification(
    notification,
    responseMessageStore.response.status,
    responseMessageStore.response.title,
    responseMessageStore.response.message,
    duration
  )
}

const loadingState = (state: boolean) =>  {
  isLoading.value = state
}

const clearInputFields = () => {
  model.accountNumber = null
  model.hasOTP = false
  model.otp = null
}

const handleCancelBtnClick = () => router.back()

const generatePaymentOTP = async () => {
  // loading state
  loadingState(true)

  // proceed to geenerate payment otp
  await walletTransactionStore.InitiateWalletTransaction(otpRequestPayload.value)
    .then(response => {
      // show notification for login error
      if (response.responseCode !== '00') {
        // loading state
        loadingState(false)
        // notification
        showNotification(5000)
      } else {
        // update otp status
        model.hasOTP = true

        // loading state
        loadingState(false)
      }
    })
    .catch(() => {
      // loading state
      loadingState(false)
      // notification
      showNotification(5000)
    })
}

const updateOTP = async (otp: string) => { 
  model.otp = otp
}

const handleResendOTP = () => {
  // model.hasOTP = false
}

const handleCompleteTransactionButtonClick = async () => {
  // loading state
  loadingState(true)

  const payload = {
    transactionRef: props.transactionParams.transactionReference,
    otp: btoa(model.otp)
  }

  // proceed to sign in
  await walletTransactionStore.CompleteWalletTransaction(payload)
    .then(response => {
      // show notification for login error
      if (response.responseCode !== '00') {
        // loading state
        loadingState(false)
        // notification
        showNotification(5000)

        // route to transaction response page
        const responseJson_ = JSON.stringify(response)
        const responseBase64_ = btoa(responseJson_)
        router.replace(`/payment-status/${responseBase64_}`)
      } else {        
        // clear input fields
        clearInputFields()
        
        // route to transaction response page
        const responseJson_ = JSON.stringify(response)
        const responseBase64_ = btoa(responseJson_)
        router.replace(`/payment-status/${responseBase64_}`)
      }
    })
    .catch(() => {
      // loading state
      loadingState(false)
      // notification
      showNotification(5000)
    })
}
</script>

<template>
  <div class="form-container">
    <section class="form-header">
      <div class="img-container">
        <img :src="Logo" alt="logo">
      </div>

        <h3>Make Payment</h3>
      </section>

    <section class="form-body">
      <div class="onboarding-form">
        <n-form
          ref="formRef"
          :model="model"
        >
          <n-form-item v-if="transactionParams">
          <div class="payment-details-container">
            <div class="payment-details">
              <span class="caption">Transaction Reference</span>
              <span class="value">{{ transactionParams?.transactionReference }}</span>
            </div>
            <div class="payment-details">
              <span class="caption">Amount</span>
              <span class="value">{{ useNumberToCurrencyConverter(Number(transactionParams?.amount), 'en-ng', 'ngn') }}</span>
            </div>
          </div>
          </n-form-item>

          <n-form-item>
            <n-input
              class="input"
              size="large"
              placeholder="Account Number"
              clearable
              :allow-input="allowedAccountNumberInput"
              v-model:value="model.accountNumber"
              :disabled="isLoading || model.hasOTP"
            />
          </n-form-item>

          <n-form-item
            v-if="model.hasOTP"
          >
            <OTPCode
              :isLoading="isLoading"
              :otp-length="6"
              :otp-expiration="600"
              :otp-request-payload="otpRequestPayload"
              @otp-input="updateOTP"
              @otp-expired="updateOTP"
              @resend-otp="handleResendOTP"
            />
          </n-form-item>

          <div class="btn-container">
            <n-button
              v-if="!model.hasOTP"
              size="large"
              type="primary"
              :loading="isLoading"
              :disabled="isAccountNumberRequired || isLoading"
              @click="generatePaymentOTP"
            >
              Make Payment
            </n-button>

            <n-button
              v-else
              size="large"
              type="success"
              :loading="isLoading"
              :disabled="isOTPRequired || isLoading"
              @click="handleCompleteTransactionButtonClick"
            >
              Complete Payment
            </n-button>
            <n-button
              size="large"
              type="error"
              :disabled="isLoading"
              @click="handleCancelBtnClick"
            >
              Cancel Payment
            </n-button>
          </div>
        </n-form>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

div.form-container {
  width: 360px;
  height: fit-content;
  border-radius: 0.75rem;
  margin-top: 50px;
  padding: 0 20px 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  align-items: center;
  background-color: rgb(255, 255, 255, 0.55);

  &>section {
    width: 100%;

    // form header
    &.form-header {
      border-radius: 0.5rem;
      box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px $base-color-3;
      padding: 30px 20px;
      position: relative;
      top: -50px;
      display: flex;
      flex-direction: column;
      row-gap: 15px;
      align-items: center;
      background-image: linear-gradient(195deg, $base-color 0%, $base-color 100%);

      // image container
      div.img-container {
        display: flex;
        justify-content: center;

        &>img {
          height: 3.2rem;
        }
      }

      // caption
      &>h3 {
        text-align: center;
        // font-size: 1.18rem;
        font-size: 1rem;
        color: #ffffff;
      }
    }

    // form body
    &.form-body {
      margin-top: -50px;
      padding-left: 5px;
      padding-right: 5px;
      display: flex;
      flex-direction: column;
      row-gap: 25px;

      // onboarding form
      &>div.onboarding-form {
        .n-form {
          &>.n-form-item {
            display: block;
            word-break: break-all;
            
            // payment details container
            div.payment-details-container {
              // border: 2px solid red;
              width: 100%;
              display: flex;
              flex-direction: column;

              // payment details
              &>div.payment-details {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                text-align: center;

                &>span.caption {
                  font-size: 15px;
                  font-weight: bold;
                }
                &>span.value {
                  &:first-child {
                    font-size: 11px;
                  }

                  &:last-child {
                    font-size: 13px;
                  }
                }
              }

              // nav link
              a {
                // text-decoration: none;
                font-weight: 600;
                color: $base-color;
              }
            }

            // check box container
            .n-space {
              // terms and conditions
              .t-and-c-container {
                a {
                  text-decoration: none;
                  font-weight: bold;
                  color: $base-color;
                }
              }

              // nav link
              a {
                // text-decoration: none;
                font-weight: 600;
                color: $base-color;
              }
            }

            // item collection container
            div.item-collection-container {
              // border: 3px solid red;
              width: 100%;
              display: flex;
              flex-direction: column;
              row-gap: 10px;

              // collapse heder styles
              .n-collapse {
                  // border: 1px solid red;
                .n-collapse-item {
                  // border: 1px solid greenyellow;
                  // collapsed item header
                  .collapsed-item-header {
                    // border: 1px solid red;
                    font-size: 0.94rem;
                    color: $base-color;
                  }

                  // header extra container
                  .header-extra-container {
                    // border: 1px solid red;
                    display: flex;
                    column-gap: 2px;
                    align-items: center;
                    font-size: 1.2rem;
                    color: $base-color;

                    &>small {
                      font-size: 12px;
                      font-weight: bold;
                    }
                  }
                }
              }

              // payment computation container
              section.payment-computation-container {
                // border: 1px solid red;
                display: flex;
                flex-direction: column;
                row-gap: 10px;

                // selected items container {
                &>div.selected-items-container {
                  // border: 2px solid blue;
                  display: flex;
                  flex-direction: column;
                  row-gap: 5px;

                  // label
                  &>label {
                    font-size: 13px;
                    font-weight: bold;
                    color: $base-color;

                    .asterisk {
                      color:#ff0000;
                    }
                  }

                  // input and remove button container
                  &>div.input-and-rmv-btn-container {
                    width: 100%;
                    display: flex;
                    column-gap: 10px;
                    justify-content: space-between;
                    align-items: center;

                    // form group
                    &>div.form-group {
                      width: 100%;
                      display: flex;
                      flex-direction: column;
                      row-gap: 2px;

                      &>.n-input-group {
                        .input-group-label {
                          padding: 2px 5px;
                          font-size: 14px;
                        }

                        // .n-input {}
                      }
                    }

                    // remove button container
                    &>div.rmv-btn-container {
                      .n-button {
                        width: 26px;
                      }
                    }
                  }
                }

                // selected items total
                &>div.selected-items-total-container {
                  // border: 2px solid blue;
                row-gap: 50px;
                  margin-top: 10px;
                  padding: 20px 5px;
                  font-size: 1.5rem;
                  font-weight: 800;
                  text-align: center;
                  background-color: #f1f1f1;
                  color: $base-color;

                  // span {}
                }
              }

            }
          }

          &>.btn-container {
            display: flex;
            flex-direction: column;
            row-gap: 8px;

            .n-button {
              width: 100%;
            }
          }
        }
      }

      // onboarding form footer
      &>div.onboarding-form-footer {
        display: flex;
        flex-direction: row;
        column-gap: 5px;
        justify-content: center;
        word-break: break-all;

        // &>span {}

        a {
          text-decoration: none;
          font-weight: bold;
          color: $base-color;
        }
      }
    }
  }
}

// MEDIA QUERY

// XX-SM (<351px)
@media (max-width: 350.9px) {
  div.form-container {
    width: 100%;
    border-radius: 0.3rem;
    padding: 0 10px 40px;
    row-gap: 30px;

    &>section {
      width: 100%;

      // form header
      &.form-header {
        border-radius: 0.25rem;
        padding: 22px 20px;

        // image container
        div.img-container {
          &>img {
            width: 50%;
            height: auto;
          }
        }

        // caption
        &>h3 {
          font-size: 1rem;
        }
      }

      // form body
      &.form-body {
        padding-left: unset;
        padding-right: unset;

        // onboarding form
        // &>div.onboarding-form {}

        // onboarding form footer
        &>div.onboarding-form-footer {
          flex-direction: column;
          row-gap: 5px;
          text-align: center;
        }
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.form-container {
    width: 100%;
    border-radius: 0.5rem;
    row-gap: 30px;

    &>section {
      width: 100%;

      // form header
      &.form-header {
        border-radius: 0.3rem;
        padding: 22px 20px;

        // image container
        div.img-container {
          &>img {
            height: 3rem;
          }
        }

        // caption
        &>h3 {
          font-size: 1.1rem;
        }
      }

      // form body
      &.form-body {
        padding-left: unset;
        padding-right: unset;

        // onboarding form
        // &>div.onboarding-form {}

        // onboarding form footer
        // &>div.onboarding-form-footer {}
      }
    }
  }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  div.form-container {
    border-radius: 0.5rem;
    row-gap: 30px;

    &>section {
      width: 100%;

      // form header
      &.form-header {
        border-radius: 0.3rem;
        padding: 22px 20px;

        // image container
        div.img-container {
          &>img {
            height: 3rem;
          }
        }

        // caption
        &>h3 {
          font-size: 1.1rem;
        }
      }

      // form body
      &.form-body {
        padding-left: unset;
        padding-right: unset;

        // onboarding form
        // &>div.onboarding-form {}

        // onboarding form footer
        // &>div.onboarding-form-footer {}
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
