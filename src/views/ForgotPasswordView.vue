<script setup lang="ts">
import ForgotPasswordForm from '@/components/onboarding/forgotPasswordForm.vue'
</script>

<template>
  <div class="page-view">
    <section class="overlay">
      <section class="form-container">
        <ForgotPasswordForm />
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
