<script setup lang="ts">
import { computed, reactive, ref, type PropType } from 'vue'
import { useRouter } from 'vue-router'

import {
  useNotification,
  NButton,
  NForm,
  NFormItem,
  NInput
} from 'naive-ui'

import type {
  FormInst,
  FormItemInst,
  FormItemRule,
  FormValidationError,
  FormRules
} from 'naive-ui'

import { useResponseNotification } from '@/composables/responseNotification'

import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useAuthenticationStore } from '@/stores/modules/authentication'

import Logo from "@/assets/logo.png";

const router = useRouter()
const notification = useNotification()

const responseMessageStore = useResponseMessageStore()
const userStore = useAuthenticationStore()

const props = defineProps({
  passwordResetParams: {
    type: Object as PropType<{
      email: string
      customerReferece: string
      token: string
    } | null | undefined>
  }
})

const isLoading = ref<boolean>(false)
const isChangePasswordSuccessful = ref(false)

const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)

const model = reactive({
  oldPassword: '',
  newPassword: '',
  reenteredPassword: ''
})

const inputRequired = computed(() => (
  model.oldPassword === '' ||
  model.newPassword === '' ||
  model.reenteredPassword === '' ||
  (model.newPassword !== model.reenteredPassword)
))


const rules: FormRules = {
  newPassword: [
    {
      required: true,
      message: 'new password is required',
      trigger: ['input', 'blur']
    }
  ],
  reenteredPassword: [
    {
      required: true,
      message: 'confirm new password',
      trigger: ['input', 'blur']
    },
    {
      validator: validatePasswordStartWith,
      message: 'password mismatch',
      trigger: 'input'
    },
    {
      validator: validatePasswordSame,
      message: 'password mismatch',
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

function clearInputFields() {
  model.oldPassword = ''
  model.newPassword = ''
  model.reenteredPassword = ''
}

function validatePasswordStartWith(
  rule: FormItemRule,
  value: string
): boolean {
  return (
    !!model.newPassword &&
    model.newPassword?.startsWith(value)
  )
}

function validatePasswordSame(rule: FormItemRule, value: string): boolean {
  return value === model.newPassword
}

function handlePasswordInput() {
  if (!model.reenteredPassword) return
  rPasswordFormItemRef.value?.validate({ trigger: 'input' })
}

function handleValidateButtonClick(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate(
    (errors: Array<FormValidationError> | undefined) => {
      if (errors) return

      // loading state
      loadingState(true)

      // proceed to change password
      userStore.ChangeDefaultPassword({
        token: props.passwordResetParams?.token as string,
        customerReferece: props.passwordResetParams?.customerReferece as string,
        email: props.passwordResetParams?.email as string,
        password: btoa(model.newPassword)
      })
        .then(response => {
          // show notification for login error
          if (response.responseCode !== '00') {
            // loading state
            loadingState(false)
            // notification
            showNotification(5000)
          } else {
            // clear input
            clearInputFields()
            // notification
            showNotification(8000)
            // route to sign in
            router.replace('/')
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
</script>

<template>
  <div class="form-container">
    <section class="form-header">
      <div class="img-container">
        <img :src="Logo" alt="logo">
      </div>

      <h3>Change Password</h3>
    </section>

    <section class="form-body">
      <div
        v-if="!isChangePasswordSuccessful"
        class="onboarding-form"
      >
        <n-form
          ref="formRef"
          :model="model"
          :rules="rules"
        > 
          <n-form-item
            path="oldPassword"
          >
            <n-input
              size="large"
              type="password"
              placeholder="Old Password"
              v-model:value="model.oldPassword"
              :disabled="isLoading"
              @keydown.enter.prevent
            />
          </n-form-item>

          <n-form-item
            path="newPassword"
          >
            <n-input
              size="large"
              type="password"
              placeholder="New Password"
              v-model:value="model.newPassword"
              :disabled="isLoading || !model.oldPassword"
              @keydown.enter.prevent
            />
          </n-form-item>

          <n-form-item
            ref="rPasswordFormItemRef"
            first
            path="reenteredPassword"
          >
            <n-input
              size="large"
              type="password"
              placeholder="Confirm Password"
              v-model:value="model.reenteredPassword"
              :disabled="isLoading || !model.newPassword"
              @input="handlePasswordInput"
              @keydown.enter.prevent
            />
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
