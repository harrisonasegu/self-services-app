<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import {
  useNotification,
  NButton,
  NForm,
  NFormItem,
  NInputGroup,
  NInputGroupLabel,
  NInput,
  NCollapseItem,
  NCollapse,
  type FormInst,
  type FormItemRule,
  type FormRules,
  type FormValidationError,
  type CollapseProps
} from 'naive-ui'

import type { PaymentCategory_Interface, RevenueItem_Interface } from '@/interface/paymentCategory'

import { useResponseNotification } from '@/composables/responseNotification'
import { useStringToSentence } from '@/composables/camelCaseToTitle'
import { useFormatNumberToNumberStr, useNumberToCurrencyConverter } from '@/composables/numberToCurrencyConverter'

import { InputRegex } from '@/utils/regex/validations';
import { generateGUID} from '@/utils/guid/guid';

import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useMerchantStore } from '@/stores/modules/merchant';
import { usePaymentCategoryStore } from '@/stores/modules/paymentCategory'
import { useTransactionStore } from '@/stores/modules/transaction'

import GlobalSelect from '@/components/global-inputs/globalSelect.vue'

const emit = defineEmits(['initiate-payment:cancelled'])

const notification = useNotification()

const router = useRouter()
const responseMessageStore = useResponseMessageStore()
const userStore = useAuthenticationStore()
const merchantStore = useMerchantStore()
const paymentCategoryStore = usePaymentCategoryStore()
const transactionStore = useTransactionStore()

const selectedMerchant = merchantStore.getSelectedMerchant.value
const paymentCategories = paymentCategoryStore.getPaymentCategories
const paymentItems = paymentCategoryStore.getPaymentItems

const user = userStore.getUser.value

interface RevenueSelection_Interface {
  paymentItem: string
  paymentItemId: number
  paymentItemAmount: string
}

const paymentMethods = [
  {
    label: 'Wallet',
    value: '5',
  },
  {
    label: 'Card',
    value: '6',
    disabled: true
  }
]

const isPaymentCategoriesLoading = ref<boolean>(false)
const isPaymentItemsLoading = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const formRef = ref<FormInst | null>(null)

const expandedItem = reactive({
  name: 'collection',
  expanded: true
})
const paymentdetailsexpandedItem = reactive({
  name: 'payment details',
  expanded: true
})

const model = reactive<any>({
  paymentCategoryId: 0,
  paymentCategoryName: null,
  paymentCategoryItemId: 0,
  paymentCategoryItemName: null,
  paymentComputations: [],
  totalAmount: '',
  firstName: null,
  lastName: null,
  email: null,
  phoneNumber: null,
  address: null,
  otherInfo: null,
  paymentMethod: null,
  transactionParams: null
})

const rules: FormRules = {
  email: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('email is required')
        } else if (!InputRegex.email.test(value)) {
          return new Error('email is invalid')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  password: [
    {
      required: true,
      message: 'password is required',
      trigger: ['input', 'blur']
    }
  ]
}

const revenueAmountRequired = computed(() => {
  const computationArr = model.paymentComputations.map((item: { paymentItemAmount: string }) => item.paymentItemAmount)

  return (computationArr.includes('') || computationArr.includes('0')) ? true : false
})

const inputRequired = computed(() => (
  // !model.paymentCategoryName ||
  // !model.paymentCategoryItemName ||
  revenueAmountRequired.value ||
  !model.firstName ||
  !model.lastName ||
  !model.email ||
  !model.phoneNumber ||
  !model.address ||
  !model.paymentMethod
))

const totalAmount = computed((): string => {
  const computations = model.paymentComputations

  const computationAmount = computations.length
    ? computations.map((item: { paymentItemAmount: string }) => item ? item.paymentItemAmount?.replace(/[^0-9]/g, '') : '0')
    : []

  const totalAmount = computationAmount.length
    ? computationAmount?.reduce(
      (prevVal: string, currVal: string) => `${Number(prevVal) + Number(currVal)}`
    )
    : ''

  return totalAmount
})

const totalAmountFormatted = computed(() => useNumberToCurrencyConverter(Number(totalAmount.value), 'ng', 'ngn'))

const handleItemHeaderClick: CollapseProps['onItemHeaderClick'] = ({ name, expanded }) => {
 switch (name) {
  case 'collection':
      expandedItem.name = name
      expandedItem.expanded = expanded
    break;
 
   default:
      paymentdetailsexpandedItem.name = name
      paymentdetailsexpandedItem.expanded = expanded
    break;
 }
}

const allowedPhoneNumberInput = (val: string) => !val || InputRegex.phoneNumber.test(val)

const fromJsonStr = (jsonStr: string) => JSON.parse(jsonStr)

const showNotification = (duration: number) => {
  useResponseNotification(
    notification,
    responseMessageStore.response.status,
    responseMessageStore.response.title,
    responseMessageStore.response.message,
    duration
  )
}

const paymentCategoriesLoadingState = (state: boolean) => {
  isPaymentCategoriesLoading.value = state
}
const paymentItemsLoadingState = (state: boolean) => {
  isPaymentItemsLoading.value = state
}
const loadingState = (state: boolean) =>  {
  isLoading.value = state
}

const clearInputFields = () => {
  model.paymentItem = null
  model.paymentComputations = []
  model.paymentCategoryId = 0
  model.paymentCategoryName = null
  model.paymentCategoryItemId = 0
  model.paymentCategoryItemName = null
  model.paymentComputations = []
  model.totalAmount = ''
  model.paymentMethod = null
  model.phoneNumber = null
  model.address = null
  model.otherInfo = null
  model.transactionParams = null
}

const handleCancelBtnClick = () => {
  emit('initiate-payment:cancelled', 'merchants')
}

const handlePaymentCategorySelect = async (item: string) => {
  const item_: PaymentCategory_Interface = fromJsonStr(item)

  // update params
  model.paymentCategoryId = item_.id
  model.paymentCategoryName = useStringToSentence(item_.categoryName)

  // reset selected payment category item
  if (model.paymentCategoryItemName) {
    model.paymentCategoryItemName = null
    model.paymentComputations = []
  }

  // fetch payment category items
  await getPaymentItemList(item_.id)
}

const handlePaymentItemSelect = (item: string) => {
  const itemArr: RevenueSelection_Interface[] = model.paymentComputations
  const item_: RevenueItem_Interface = fromJsonStr(item)

  const paymentItem_ = {
    paymentItem: useStringToSentence(item_.revenueItemName),
    paymentItemId: item_.id,
    paymentItemAmount: '',
    narration: '',
  }

  if (itemArr.length) {
    itemArr?.splice((itemArr?.length + 1), 0, paymentItem_)
  } else {
    itemArr?.splice((itemArr?.length), 0, paymentItem_)
  }
}

const handlePaymentItemClear = () => {
  model.paymentComputations = []
  // reset collapse state
  expandedItem.name = 'collection'
  expandedItem.expanded = true
}

const handleAmountInput = (index: number) => {
  const numStr = model.paymentComputations[index].paymentItemAmount.replace(/[^0-9]/g, '')

  const numStrFormatted = Number(numStr)
  const result = useFormatNumberToNumberStr(numStrFormatted)

  // update amount list
  model.paymentComputations[index].paymentItemAmount = result
}

const handleDeletetButtonClick = (index: number) => {
  const itemArr: RevenueSelection_Interface[] = model.paymentComputations

  // remove from amount list
  model.paymentComputations?.splice(index, 1)

  // reset selected payment category item
  if (!itemArr.length) {
    model.paymentCategoryItemName = null
  }
}

const getPaymentCategoryItems = async () => {
  // loading state
  paymentCategoriesLoadingState(true)

  // fetch items
  await paymentCategoryStore.GetPaymentItemCategoryList({
    merchantId: `${selectedMerchant?.id}`
  })
    .then(response => {
      // show notification fetching error
      if (response.responseCode !== '00') {
        showNotification(5000)
      }

      // loading state
      paymentCategoriesLoadingState(false)
    })
    .catch(() => {
      // loading state
      paymentCategoriesLoadingState(false)
      // notification
      showNotification(5000)
    })
}

const getPaymentItemList = async (paymentItemCategoryId: number) => {
  // loading state
  paymentItemsLoadingState(true)

  // fetch items
  await paymentCategoryStore.GetPaymentItemList({
    merchantId: `${selectedMerchant?.id}`,
    paymentItemCategoryId: `${paymentItemCategoryId}`
  })
    .then(response => {
      // show notification fetching error
      if (response.responseCode !== '00') {
        showNotification(5000)
      }

      // loading state
      paymentItemsLoadingState(false)
    })
    .catch(() => {
      // loading state
      paymentItemsLoadingState(false)
      // notification
      showNotification(5000)
    })
}

const handleInitiatePaymentButtonClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate(
    (errors: Array<FormValidationError> | undefined) => {
      if (errors) return
        
      // loading state
      loadingState(true)

      const payload = {
        merchantId: Number(selectedMerchant?.id),
        merchantName: selectedMerchant?.merchantName,
        customerReference: user ? `${user?.customerReference}` : '',
        totalamount: Number(totalAmount.value),
        paymentMethod: model.paymentMethod,
        asseessmentReference: model.assessmentReference ?? 'N/A',
        paymentPeriod: model.paymentPeriod,
        narration: `${selectedMerchant?.merchantName} Payment(s)`,
        email: model.email,
        firstName: model.firstName,
        middleName: '',
        lastName: model.lastName,
        address: model.address,
        otherInfo: model.otherInfo ?? 'N/A',
        sessionManager: user ? user?.logginSession : '',
        isLogedin: (user && user?.logginSession) ? true : false,
        transactionReferenceNo: generateGUID(),
        mobileNo: model.phoneNumber,
        paymentItemDetails: model.paymentComputations.map((item: RevenueSelection_Interface) => ({
          amount: Number(item.paymentItemAmount?.replace(/[^0-9]/g, '')),
          paymentItemId: `${item.paymentItemId}`,
          paymentItem: item.paymentItem
        }))
      }

      // proceed to sign in
      transactionStore.InitiateTransaction(payload)
        .then(response => {
          // show notification for error
          if (response.responseCode !== '77') {
            // loading state
            loadingState(false)
            // notification
            showNotification(5000)
          } else {
            // loading state
            loadingState(false)

            // clear inputs
            clearInputFields()

            // route to payment page
            const walletTransactionPayload = {
              merchantId: payload.merchantId,
              merchantName: payload.merchantName,
              customerName: `${payload.firstName} ${payload.lastName}`,
              accountNo: '',
              phoneNo: payload.mobileNo,
              emailAddress: payload.email,
              address: payload.address,
              transactionReference: payload.transactionReferenceNo,
              amount: payload.totalamount,
              narration: payload.narration,
              billingCode: '',
              productCode: '',
              transactionDate: '',
              responseUrl: `${window.location.origin}/self-services`
            }

            const paramsJson_ = JSON.stringify(walletTransactionPayload)
            const paramsBase64_ = btoa(paramsJson_)

            router.push(`/make-payment/${paramsBase64_}`)
          }
        })
        .catch(() => {
          // loading state
          loadingState(false)
          // notification
          showNotification(5000)
        })
    }
  )
}

onBeforeMount(() => getPaymentCategoryItems())
</script>

<template>
  <div class="form-container">
    <section class="form-header">
      <!-- <div class="img-container">
        <img :src="Logo" alt="logo">
      </div> -->

      <h3>{{ selectedMerchant?.merchantName }}</h3>
    </section>

    <section class="form-body">
      <div class="onboarding-form">
        <n-form
          ref="formRef"
          :model="model"
          :rules="rules"
        >
          <n-form-item>
            <GlobalSelect
              class="input"
              size="large"
              placeholder="Select Payment Category"
              filterable
              :options="paymentCategories?.map(paymentCategory => (
                {
                  label: useStringToSentence(paymentCategory?.categoryName),
                  value: JSON.stringify(paymentCategory)
                }
              ))"
              v-model:value="model.paymentCategoryName"
              :loading="isPaymentCategoriesLoading"
              :disabled="isPaymentCategoriesLoading || isLoading"
              @update:value="handlePaymentCategorySelect"
            />
          </n-form-item>

          <n-form-item v-if="model.paymentCategoryName">
            <GlobalSelect
              class="input"
              size="large"
              placeholder="Select Payment Item"
              filterable
              clearable
              :options="paymentItems?.map(paymentItem => (
                {
                  label: useStringToSentence(paymentItem?.revenueItemName),
                  value: JSON.stringify(paymentItem),
                  disabled: model.paymentComputations.map((item: RevenueSelection_Interface) => item.paymentItemId)?.includes(paymentItem?.id)
                }
              ))"
              v-model:value="model.paymentCategoryItemName"
              :show-checkmark="false"
              :loading="isPaymentItemsLoading"
              :disabled="isPaymentItemsLoading || isLoading"
              @update:value="handlePaymentItemSelect"
              @clear="handlePaymentItemClear"
            />
          </n-form-item>


          <div
            class="items-and-payment-details-container"
          >
            <div
              v-if="model.paymentComputations.length"
              class="item-collection-container"
            >
                <n-collapse
                  accordion arrow-placement="right"
                  :default-expanded-names="expandedItem.name"
                  @item-header-click="handleItemHeaderClick"
                >
                  <template #arrow>&VeryThinSpace;</template>

                  <n-collapse-item name="collection">
                    <template #header>
                      <h2 class="collapsed-item-header">Selected Items</h2>
                    </template>

                    <template #header-extra>
                      <div class="header-extra-container">
                        <small>{{ (expandedItem.expanded) ? 'Collapse' : 'Expand' }}</small>
                        <Icon
                          :icon="(expandedItem.expanded) ? 'ic:baseline-minus' : 'ic:baseline-plus'"
                        />
                      </div>
                    </template>

                    <section class="payment-computation-container">
                      <div
                        v-for="(paymentItem, index) in model.paymentComputations"
                        :key="index"
                        class="selected-items-container"
                      >
                        <label><span class="asterisk">*</span> {{ paymentItem.paymentItem }}</label>
                        <div class="input-and-rmv-btn-container">
                          <div class="form-group">
                            <!-- amout -->
                            <n-input-group class="input">
                              <n-input-group-label size="medium">
                                <span class="input-group-label">NGN</span>
                              </n-input-group-label>

                              <n-input
                                size="medium"
                                placeholder="amount"
                                clearable
                                v-model:value="paymentItem.paymentItemAmount"
                                :disabled="isLoading"
                                @input="handleAmountInput(index)"
                              />
                            </n-input-group>
                          </div>

                          <div class="rmv-btn-container">
                            <n-button
                              ghost
                              size="small"
                              type="error"
                              :disabled="isLoading"
                              @click="handleDeletetButtonClick(index)"
                            >
                              <Icon icon="material-symbols:delete-outline" width="20" />
                            </n-button>
                          </div>
                        </div>
                      </div>

                      <div
                        v-if="totalAmount"
                        class="selected-items-total-container"
                      >
                        <span>{{ totalAmountFormatted }}</span>
                      </div>
                    </section>
                  </n-collapse-item>
                </n-collapse>
            </div>
            
            <div
              v-if="model.paymentComputations.length && !revenueAmountRequired"
              class="payment-detail-container"
            >
              <n-collapse
                accordion arrow-placement="right"
                :default-expanded-names="paymentdetailsexpandedItem.name"
                @item-header-click="handleItemHeaderClick"
              >
                <template #arrow>&VeryThinSpace;</template>

                <n-collapse-item name="payment details">
                  <template #header>
                    <h2 class="collapsed-item-header">Payment Details</h2>
                  </template>

                  <template #header-extra>
                    <div class="header-extra-container">
                      <small>{{ (paymentdetailsexpandedItem.expanded) ? 'Collapse' : 'Expand' }}</small>
                      <Icon
                        :icon="(paymentdetailsexpandedItem.expanded) ? 'ic:baseline-minus' : 'ic:baseline-plus'"
                      />
                    </div>
                  </template>

                  <section class="payment-computation-container">
                    <div class="selected-items-container">
                      <label><span class="asterisk">*</span> First Name</label>
                      <div class="input-and-rmv-btn-container">
                        <div class="form-group">
                          <n-input
                            class="input"
                            size="large"
                            placeholder=""
                            clearable
                            v-model:value="model.firstName"
                            :disabled="isLoading"
                          />
                        </div>
                      </div>
                    </div>

                    <div class="selected-items-container">
                      <label><span class="asterisk">*</span> Last Name</label>
                      <div class="input-and-rmv-btn-container">
                        <div class="form-group">
                          <n-input
                            class="input"
                            size="large"
                            placeholder=""
                            clearable
                            v-model:value="model.lastName"
                            :disabled="isLoading"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div class="selected-items-container">
                      <label><span class="asterisk">*</span> Email</label>
                      <div class="input-and-rmv-btn-container">
                        <div class="form-group">
                          <n-input
                            class="input"
                            size="large"
                            placeholder=""
                            clearable
                            v-model:value="model.email"
                            :disabled="isLoading"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div class="selected-items-container">
                      <label><span class="asterisk">*</span> Phone Number</label>
                      <div class="input-and-rmv-btn-container">
                        <div class="form-group">
                          <n-input
                            class="input"
                            size="large"
                            placeholder=""
                            clearable
                            :allow-input="allowedPhoneNumberInput"
                            v-model:value="model.phoneNumber"
                            :disabled="isLoading"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div class="selected-items-container">
                      <label><span class="asterisk">*</span> Address</label>
                      <div class="input-and-rmv-btn-container">
                        <div class="form-group">
                          <n-input
                            type="textarea"
                            class="input"
                            size="large"
                            rows="2"
                            placeholder=""
                            clearable
                            v-model:value="model.address"
                            :disabled="isLoading"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div class="selected-items-container">
                      <label>Other Information</label>
                      <div class="input-and-rmv-btn-container">
                        <div class="form-group">
                          <n-input
                            type="textarea"
                            class="input"
                            size="large"
                            rows="2"
                            placeholder=""
                            clearable
                            v-model:value="model.otherInfo"
                            :disabled="isLoading"
                          />
                        </div>
                      </div>
                    </div>
                    
                      <div class="selected-items-container">
                        <label><span class="asterisk">*</span> Select Payment Method</label>
                        <div class="input-and-rmv-btn-container">
                          <div class="form-group">
                            <GlobalSelect
                              class="input"
                              size="large"
                              placeholder="Wallet or Card"
                              :options="paymentMethods"
                              v-model:value="model.paymentMethod"
                              :disabled="isLoading"
                            />
                          </div>
                        </div>
                      </div>
                  </section>
                </n-collapse-item>
              </n-collapse>
            </div>
          </div>

          <div class="btn-container">
            <n-button
              size="large"
              type="primary"
              :loading="isLoading"
              :disabled="inputRequired || isLoading"
              @click="handleInitiatePaymentButtonClick"
            >
              Initiate Payment
            </n-button>
            <n-button
              size="large"
              type="error"
              :disabled="isLoading"
              @click="handleCancelBtnClick"
            >
              Cancel
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
          }

          // items and payment details container
          &>div.items-and-payment-details-container {
            padding-bottom: 20px;
            display: flex;
            flex-direction: column;
            row-gap: 20px;

            // item collection and payment detail containers
            div.item-collection-container,
            div.payment-detail-container {
              width: 100%;
              display: flex;
              flex-direction: column;
              row-gap: 10px;

              // collapse header styles
              .n-collapse {
                .n-collapse-item {
                  // collapsed item header
                  .collapsed-item-header {
                    font-size: 0.94rem;
                    color: $base-color;
                  }

                  // header extra container
                  .header-extra-container {
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
                display: flex;
                flex-direction: column;
                row-gap: 10px;

                // selected items container {
                &>div.selected-items-container {
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
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;

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
