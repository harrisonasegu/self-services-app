<script lang="ts" setup>
import { computed, onMounted, ref, watch, type PropType } from 'vue';
import {
  useNotification,
  NButton,
  NInput
} from 'naive-ui'

import type { InitiateWalletTransaction_Interface } from '@/interface/walletTransaction'

import { useResponseNotification } from '@/composables/responseNotification'

import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useWalletTransactionStore } from '@/stores/modules/walletTransaction'

const notification = useNotification()
const responseMessageStore = useResponseMessageStore()
const walletTransactionStore = useWalletTransactionStore()

const props = defineProps({
  isLoading: Boolean,
  otpLength: {
    type: Number,
    required: false,
    default: () => 4
  },
  otpExpiration: {
    type: Number,
    required: false,
    default: () => 300
  },
  otpRequestPayload: {
    type: Object as PropType<InitiateWalletTransaction_Interface>,
    required: true
  }
})

const emit = defineEmits(['otpExpired', 'otpInput', 'resendOtp'])

const length = props.otpLength
const input = ref(null)

const timer = ref<number | null>(null) // (default expiration of 5 minutes)

const model = ref<string[]>([])

const loading = ref(false)

const isOTPExpired = ref(false)
const otpString = computed(() => model.value.length ? model.value.join('') : '')


const showNotification = (duration: number) => {
  useResponseNotification(
    notification,
    responseMessageStore.response.status,
    responseMessageStore.response.title,
    responseMessageStore.response.message,
    duration
  )
}

const loadingState = (state: boolean) => {
  loading.value = state
}

const setCountdownTimer = (countdownDuration: number) => {
  if (countdownDuration) {
    const countdown = setInterval(() => {
      if (countdownDuration > -1) {
        timer.value = countdownDuration--
      } else {
        // toggele otp expiration state
        isOTPExpired.value = true

        // handle otp expiration
        handleOTPExpiration()
        // reset inputs
        resetOTPInputs()
        // clear timer
        clearInterval(countdown)
      }
    }, 1400)
  }
}

const handleInput = (index: number) => {
  const inputArr = input.value as never as HTMLCollection
  const nextInputEl = inputArr[index + 1] as HTMLInputElement

  // update current input focus
  if (index !== (length - 1)) nextInputEl.focus()
}

const handleDelete = (index: number) => {
  const inputArr = input.value as never as HTMLCollection
  const previousInputEl = inputArr[index - 1] as HTMLInputElement

  // update current input focus
  if (index !== 0) {
    // check if input has a value
    if (model.value[index] === '') {
      previousInputEl.focus()
    } else {
      model.value.splice(index, 1, '')
    }
  } else {
    model.value.splice(index, 1, '')
  }
}

const resetOTPInputs = () => {
  for (let index = 0; index < model.value.length; index++) {
    model.value[index] = ''
  }
}

const handleOTPExpiration = () => emit('otpExpired', otpString.value)

const handleOTPCheck = () => emit('otpInput', otpString.value)

const resendOTP = () => generatePaymentOTP()

const generatePaymentOTP = async () => {
  // loading state
  loadingState(true)

  // proceed to geenerate payment otp
  await walletTransactionStore.InitiateWalletTransaction(props.otpRequestPayload)
    .then(response => {
      // show notification for login error
      if (response.responseCode !== '00') {
        // loading state
        loadingState(false)
        // notification
        showNotification(5000)
      } else {
        // loading state
        loadingState(false)

        // toggele otp expiration state
        isOTPExpired.value = false
        
        // reset countdown timer
        setCountdownTimer(props.otpExpiration)
      }
    })
    .catch(() => {
      // loading state
      loadingState(false)
      // notification
      showNotification(5000)
    })
}

onMounted(() => setCountdownTimer(props.otpExpiration))

watch(otpString, () => handleOTPCheck())
watch(isOTPExpired, () => handleOTPExpiration())
</script>

<template>
  <section>
    <div class="otp-input-and-timer-container">
      <div class="otp-input-container">
        <div class="input-wrap">
          <div 
            v-for="(_, index) in length"
            :key="index"
            class="input"
          >
            <n-input
              ref="input"
              size="large"
              placeholder=""
              maxlength="1"
              autofocus
              :allow-input="(value: string)=> !value || /\d/.test(value)"
              v-model:value="model[index]"
              :disabled="isLoading || isOTPExpired"
              @input="handleInput(index)"
              @keydown.delete.prevent="handleDelete(index)"
            />
          </div>
        </div>
      </div>
      <div
        v-if="!isLoading"
        class="otp-timer-container"
      >
        <div class="timer">
          <span class="timer-icon-and-text">
            <Icon icon="icon-park-solid:timer" />
            <span class="timer-text">{{ timer ? `${timer} s` : timer }}</span>
          </span>
        </div>
      </div>
    </div>

    <div
      v-if="isOTPExpired"
      class="otp-refresh-container">
      <div class="txt-and-icon">
        <n-button
          text
          type="success"
          size="small"
          :loading="loading"
          :disabled="loading"
          @click.prevent="resendOTP"
        >Resend Code</n-button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  section {
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    &>div {
      display: flex;

      // otp input and timer container
      &.otp-input-and-timer-container {
        // width: max-content;
        flex-wrap: wrap;
        row-gap: 15px;
        column-gap: 5px;
        // justify-content: space-between;
        justify-content: center;
        align-items: center;

        // otp input container
        &>div.otp-input-container {
          width: fit-content;
          display: flex;

          &>div.input-wrap {
            display: flex;
            flex-wrap: wrap;
            column-gap: 3px;

            &>div.input {
              width: 40px;
              height: 40px;
            }
          }
        }

        // otp timer container
        &>div.otp-timer-container {
          width: fit-content;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;

          &>div.timer {
            display: flex;
            justify-content: center;
            align-items: center;

            span.timer-icon-and-text {
              width: 40px;
              height: 40px;
              // border-radius: 50%;
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;

              &>* {
                font-size: 40px;
                color: $base-color;
              }

              span.timer-text {
                min-width: 40%;
                margin-top: 6px;
                position: absolute;
                text-align: center;
                font-size: 8px;
                font-weight: bold;
                background: $base-color;
                color: #fff;
              }
            }
          }
        }
      }

      // otp refresh container
      &.otp-refresh-container {
        &>div.txt-and-icon {
          display: flex;
          column-gap: 3px;
        }
      }
    }
  }

// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  section {
    &>div {
      // otp input and timer container
      &.otp-input-and-timer-container {
        // otp timer container
        &>div.otp-timer-container {
          display: none;
        }
      }
    }
  }
}

// X-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  section {
    &>div {
      // otp input and timer container
      &.otp-input-and-timer-container {
        // otp timer container
        &>div.otp-timer-container {
          display: none;
        }
      }
    }
  }
}
</style>
