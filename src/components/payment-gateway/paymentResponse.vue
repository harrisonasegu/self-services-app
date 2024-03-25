<script setup lang="ts">
import { ref } from 'vue';
import {
  NButton,
  NForm,
  NFormItem,
  NResult
} from 'naive-ui'

import { useTransactionStore } from '@/stores/modules/transaction'

import type { TransactionResponse_Interface } from '@/interface/walletTransaction'

import { useNumberToCurrencyConverter } from '@/composables/numberToCurrencyConverter'

import Logo from "@/assets/logo.png";

const props = defineProps<{
  transactionResponse: TransactionResponse_Interface
}>()

const transactionStore = useTransactionStore()

const loading = ref(false)

const handleCompleteTransactionButtonClick = async () => {
  loading.value = true

  // update transaction status for collection
  transactionStore.CompleteTransaction({
    merchantId: Number(props.transactionResponse.param1),
    paymentReference: props.transactionResponse.paymentRef,
    transactionReference: props.transactionResponse.transactionReference,
    amount: props.transactionResponse.amount,
    debitReference:  props.transactionResponse.paymentRef,
    statuscode:  props.transactionResponse.responseCode,
    statusMessage: props.transactionResponse.responseMessage
  })
    .finally(() => {
      loading.value = false

      // route to callback URL
      const transactionResponseJson_ = JSON.stringify(props.transactionResponse)
      location.replace(`${props.transactionResponse.callBackUrl}/?trxResponse=${transactionResponseJson_}`)
    })
}
</script>

<template>
  <div class="form-container">
    <section class="form-header">
      <div class="img-container">
        <img :src="Logo" alt="logo">
      </div>

      <h3>Payment Status</h3>
    </section>

    <section class="form-body">
      <div class="onboarding-form">
        <n-form>
          <n-form-item>
            <div class="payment-details-container">
              <div class="payment-details">
                <n-result
                  size="small"
                  :status="transactionResponse?.responseCode === '00' ? 'success' : 'error'"
                  title=" "
                  description=""
                ></n-result>
              </div>

              <div class="payment-details">
                <span
                  :class="[
                    'caption',
                    transactionResponse?.responseCode === '00' ? '' : 'failed'
                  ]"
                >{{ transactionResponse?.responseMessage }}</span>
                <span
                  :class="[
                    'value',
                    transactionResponse?.responseCode === '00' ? '' : 'failed'
                  ]"
                >{{ useNumberToCurrencyConverter(Number(transactionResponse?.amount), 'en-ng', 'ngn') }}</span>
              </div>
            </div>
          </n-form-item>

          <div class="btn-container">
            <n-button
              size="large"
              type="primary"
              :loading="loading"
              :disabled="loading"
              @click="handleCompleteTransactionButtonClick"
            >
              Click To Proceed
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
              width: 100%;
              padding-bottom: 20px;
              display: flex;
              flex-direction: column;

              // payment details
              &>div.payment-details {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                text-align: center;
                row-gap: 10px;

                &>span {
                  color: $approved;

                  &.failed {
                    color: $declined;
                  }

                  &.caption {
                    font-size: 15px;
                    font-weight: bold;
                  }
                  &.value {
                    font-size: 15px;
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
