<script setup lang="ts">
import { reactive, ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useNotification } from 'naive-ui'

import { useResponseNotification } from '@/composables/responseNotification'

import { useResponseMessageStore } from '@/stores/common/responseMessage'
import { useAuthenticationStore } from '@/stores/modules/authentication'

import Spinner from '@/components/spinner/pageSpinner.vue'
import ErrorResult from '@/components/error-result/errorResult.vue'

const router = useRouter()
const query = useRoute().query

const notification = useNotification()

const responseMessageStore = useResponseMessageStore()
const userStore = useAuthenticationStore()

const isValidatingChangePasswordUrl = ref(true)
const isInvalidChangePasswordUrl = ref(false)

const userActivationParams = reactive({
  email: query.user as string,
  customerReferece: query.customerRef as string,
  token: query.Token as string
})

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
  isValidatingChangePasswordUrl.value = state
}

function handleCreateNewPassword() {
  const params_ = btoa(JSON.stringify(userActivationParams))
  
  router.push(`/create-new-password/${params_}`)
}

async function customerActivation() {
  // url validation state
  loadingState(true)

  // background verification
  await userStore.CustomerActivation(userActivationParams)
    .then(response => {
      const { responseCode } = response

      switch (responseCode) {
        // successful activation
        case '00':
          // route to create new password page
          handleCreateNewPassword()
          // ----------------------------
          showNotification(7000)
          break

        // awaiting password change
        case '88':
          // route to create new password page
          handleCreateNewPassword()
          // ----------------------------
          showNotification(7000)
          break

        // unsuccessful activation
        default:
          isInvalidChangePasswordUrl.value = true
          break
      }

      // url validation state
      loadingState(false)
    })
    .catch(() => {
      // url validation state
      loadingState(false)

      isInvalidChangePasswordUrl.value = true
    })
}

onBeforeMount(() => {
  console.log(query);
  
  // redirect to not found if no query is found in current route
  if (!query.Token || !query.customerRef) router.push('/not-found')
  else customerActivation()
})
</script>

<template>
  <div class="page-view">
    <section class="overlay">
      <!-- spinner -->
      <Spinner v-if="isValidatingChangePasswordUrl">
        Validating...
      </Spinner>

      <!-- invalid reset password url -->
      <ErrorResult
        v-else-if="isInvalidChangePasswordUrl"
        status="404"
        title="Server Error"
        description="This link is expired or user does not exist on our server"
        size="huge"
      />
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
