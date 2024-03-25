<script setup lang="ts">
import RegistrationForm from '@/components/onboarding/registrationForm.vue'
</script>

<template>
  <div class="page-view">
    <div class="page-wrap">
      <section class="overlay">
        <div class="text-description">
          <h1>Welcome</h1>
          <p>
            Welcome to our user-friendly Self-Service Payment Collection Platform! We understand the importance of simplicity and efficiency in managing your payments. Our landing page serves as the gateway to a hassle-free experience, putting you in control of your payment collection process.
          </p>
        </div>
      </section>
      <section class="form-container">
        <RegistrationForm />
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

div.page-view {
  div.page-wrap {
    width: 100%;
    min-height: 100vh;
    padding: 100px 100px 40px;
    display: flex;
    column-gap: 30px;
    align-items: center;
    background: linear-gradient(to bottom, $base-color-3, #d9d9d9c6), url("@/assets/images/onboarding-bg-image/money-man.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: left;

    &>section {
      // overlay
      &.overlay {
        width: 50%;
        min-height: 450px;
        border-radius: 0.75rem;
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.479), 0 7px 10px -5px $base-color-1;
        padding: 50px;
        background-image: linear-gradient(195deg, $base-color 0%, $base-color 100%);

        // text description
        &>div.text-description {
          display: flex;
          flex-direction: column;
          row-gap: 15px;
          color: #ffffff;
            text-align: center;

          // caption
          &>h1 {
            font-size: 3rem;
          }

          // description
          &>p {
            font-size: 1.05rem;
            line-height: 30px;
          }
        }
      }

      // form container
      &.form-container {
        width: fit-content;
      }
    }
  }
}

// MEDIA QUERY

// XX-SM (<351px)
@media (max-width: 350.9px) {
  div.page-view {
    div.page-wrap {
      width: 100%;
      min-height: unset;
      // padding: 100px 10px 40px;
      padding: 40px 10px 40px;
      flex-direction: column;
      row-gap: 100px;
      column-gap: unset;

      &>section {
        // overlay
        &.overlay {
          width: 100%;
          min-height: unset;
          border-radius: 0.5rem;
          box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.479), 0 7px 10px -5px $base-color-1;
          padding: 40px 20px;
          // display: none;

          // text description
          &>div.text-description {
            // caption
            &>h1 {
              font-size: 1.5rem;
            }

            // description
            &>p {
              font-size: unset;
              line-height: 25px;
            }
          }
        }

        // form container
        &.form-container {
          width: 100%;
        }
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.page-view {
    div.page-wrap {
      width: 100%;
      min-height: unset;
      // padding: 300px 10px 40px;
      padding: 40px 10px 40px;
      flex-direction: column;
      row-gap: 100px;
      column-gap: unset;

      &>section {
        // overlay
        &.overlay {
          width: 100%;
          min-height: unset;
          border-radius: 0.5rem;
          box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.479), 0 7px 10px -5px $base-color-1;
          padding: 40px 20px;
          // display: none;

          // text description
          &>div.text-description {
            // caption
            &>h1 {
              font-size: 1.8rem;
            }

            // description
            &>p {
              font-size: unset;
              line-height: 25px;
            }
          }
        }

        // form container
        &.form-container {
          width: 100%;
        }
      }
    }
  }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  div.page-view {
    div.page-wrap {
      width: 100%;
      min-height: unset;
      // padding: 300px 10px 40px;
      padding: 40px 10px 40px;
      flex-direction: column;
      row-gap: 100px;
      column-gap: unset;

      &>section {
        // overlay
        &.overlay {
          width: 400px;
          min-height: unset;
          border-radius: 0.5rem;
          box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.479), 0 7px 10px -5px $base-color-1;
          padding: 40px 20px;
          // display: none;

          // text description
          &>div.text-description {
            // caption
            &>h1 {
              font-size: 1.8rem;
            }

            // description
            &>p {
              font-size: unset;
              line-height: 25px;
            }
          }
        }

        // form container
        // &.form-container {}
      }
    }
  }
}

// MD
@media (min-width: 768px) and (max-width: 991.9px) {
  div.page-view {
    div.page-wrap {
      width: 100%;
      min-height: unset;
      padding: 100px 50px 40px;
      column-gap: 20px;
      align-items: flex-start;

      &>section {
        // overlay
        &.overlay {
          width: 100%;
          min-height: unset;
          padding: 40px 20px;
          // display: none;

          // text description
          &>div.text-description {
            // caption
            &>h1 {
              font-size: 2rem;
            }

            // description
            &>p {
              font-size: 2ex;
              line-height: 25px;
            }
          }
        }

        // form container
        &.form-container {
          width: 100%;
        }
      }
    }
  }
}

// LG
@media (min-width: 992px) and (max-width: 1200.9px) {
  div.page-view {
    div.page-wrap {
      width: 100%;
      padding: 100px 50px 40px;

      &>section {
        // overlay
        &.overlay {
          width: 100%;
          min-height: unset;
          padding: 40px 25px;

          // text description
          &>div.text-description {
            // caption
            &>h1 {
              font-size: 2.8rem;
            }
          }
        }

        // form container
        // &.form-container {}
      }
    }
  }
}

// XL
// @media (min-width: 1201px) and (max-width: 1499.9px) {}

// XXL
// @media (min-width: 1500px) {}
</style>
