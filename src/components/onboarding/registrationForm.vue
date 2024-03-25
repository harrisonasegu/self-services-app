<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

import {
  useNotification,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NCheckbox,
  NSpace
} from 'naive-ui'

import type {
  FormInst,
  FormItemRule,
  FormValidationError,
  FormRules
} from 'naive-ui'

import Logo from "@/assets/logo.png";

import { useResponseNotification } from '@/composables/responseNotification'

import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useAuthenticationStore } from '@/stores/modules/authentication'

import { InputRegex } from '@/utils/regex/validations';

const notification = useNotification()

const responseMessageStore = useResponseMessageStore()
const userStore = useAuthenticationStore()

const isLoading = ref<boolean>(false)

const formRef = ref<FormInst | null>(null)

const model = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  customerAddress: '',
  termsAndConditions: false
})

const inputRequired = computed(() => (
  model.firstName === '' ||
  model.lastName === '' ||
  model.email === '' ||
  model.phoneNumber === '' ||
  model.customerAddress === '' ||
  !model.termsAndConditions
))

const rules: FormRules = {
  firstName: [
    {
      required: true,
      message: 'first name is required',
      trigger: ['input', 'blur']
    }
  ],
  lastName: [
    {
      required: true,
      message: 'last name is required',
      trigger: ['input', 'blur']
    }
  ],
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
  phoneNumber: [
    {
      required: true,
      message: 'phone number is required',
      trigger: ['input', 'blur']
    }
  ],
  customerAddress: [
    {
      required: true,
      message: 'address is required',
      trigger: ['input', 'blur']
    }
  ]
}

function showNotification(duration: number) {
  useResponseNotification(
    notification,
    responseMessageStore.response.status,
    responseMessageStore.response.title,
    responseMessageStore.response.message,
    duration
  )
}

function loadingState(state: boolean) {
  isLoading.value = state
}

function allowNumberInput(number: string) {
  return !number || /^\d{0,11}$/.test(number)
}

function clearInputFields() {
  model.firstName = ''
  model.lastName = ''
  model.email = ''
  model.phoneNumber = ''
  model.customerAddress = ''
  model.termsAndConditions = false
}

function handleValidateButtonClick(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate(
    (errors: Array<FormValidationError> | undefined) => {
      if (errors) return

      // loading state
      loadingState(true)

      // proceed to sign up
      userStore.AddNewCustomer({
        firstname: model.firstName,
        lastname: model.lastName,
        email: model.email,
        phoneNo: model.phoneNumber,
        customerAddress: model.customerAddress,
        acceptTerms: model.termsAndConditions
      })
        .then(response => {
          const { responseCode } = response

          switch (responseCode) {
            // successful registration
            case '00':
              // clear input
              clearInputFields()
              break
          }

          // loading state
          loadingState(false)
          // notification
          showNotification(5000)
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
</script>

<template>
  <div class="form-container">
    <section class="form-header">
      <div class="img-container">
        <img :src="Logo" alt="logo">
      </div>

      <h3>Sign Up</h3>
    </section>

    <section class="form-body">
      <div class="onboarding-form">
        <n-form
          ref="formRef"
          :model="model"
          :rules="rules"
        >
          <n-form-item
            path="firstName"
          >
            <n-input
              size="large"
              placeholder="First Name"
              v-model:value="model.firstName"
              :disabled="isLoading"
              @keydown.enter.prevent
            />
          </n-form-item>

          <n-form-item
            path="lastName"
          >
            <n-input
              size="large"
              placeholder="Last Name"
              v-model:value="model.lastName"
              :disabled="isLoading"
              @keydown.enter.prevent
            />
          </n-form-item>

          <n-form-item
            path="email"
          >
            <n-input
              size="large"
              placeholder="Email"
              v-model:value="model.email"
              :disabled="isLoading"
              @keydown.enter.prevent
            />
          </n-form-item>

          <n-form-item
            path="phoneNumber"
          >
            <n-input
              size="large"
              placeholder="Phone Number"
              v-model:value="model.phoneNumber"
              :allow-input="allowNumberInput"
              :disabled="isLoading"
              @keydown.enter.prevent
            />
          </n-form-item>

          <n-form-item
            path="customerAddress"
          >
            <n-input
              size="large"
              placeholder="Address"
              type="textarea"
              rows="2"
              v-model:value="model.customerAddress"
              :disabled="isLoading"
              @keydown.enter.prevent
            />
          </n-form-item>

          <n-form-item>
            <n-space>
              <n-checkbox
                size="large"
                v-model:checked="model.termsAndConditions"
                :disabled="isLoading"
              />
              <div class="t-and-c-container">
                <span>I agree the </span>
                <a @click.prevent href="">Terms and Conditions</a>
              </div>
            </n-space>

          </n-form-item>

          <div class="btn-container">
            <n-button
              size="large"
              type="primary"
              :loading="isLoading"
              :disabled="inputRequired || isLoading"
              @click="handleValidateButtonClick"
            >
              Submit
            </n-button>
          </div>
        </n-form>
      </div>

      <div class="onboarding-form-footer">
        <span>Already have an account?</span>
        <router-link to="/sign-in">Sign In</router-link>
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
  width: 400px;
  height: fit-content;
  border-radius: 0.75rem;
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
      padding: 22px 20px;
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
        font-size: 1.18rem;
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

          &>.btn-container {
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
