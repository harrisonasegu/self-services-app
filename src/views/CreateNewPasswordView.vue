<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import type { CustomerActivation_Interface } from '@/interface/authentication'

import ChangeDefaultPasswordForm from '@/components/onboarding/createPasswordForm.vue'

const route = useRoute()
const routeParams = route.params

const userActivationParams = reactive({
  email: '',
  customerReferece: '',
  token: ''
})

async function updateUserActivationParams() {
  const userActivationParams_ = routeParams.userActivationParams as string
  const paramData = JSON.parse(atob(userActivationParams_)) as CustomerActivation_Interface

  // update user activation params
  userActivationParams.email = paramData.email
  userActivationParams.token = paramData.token
  userActivationParams.customerReferece = paramData.customerReferece
}

onMounted(() => updateUserActivationParams())
</script>

<template>
  <div class="page-view">
    <section class="overlay">
      <!-- defult password reset form for valid reset password url -->
      <section class="form-container">
        <ChangeDefaultPasswordForm
          :user-activation-params="userActivationParams"
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
