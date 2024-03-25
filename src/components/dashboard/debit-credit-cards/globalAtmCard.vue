<script setup lang="ts">
// import MasterCardLogo from "@/assets/images/atm-card/mastercard.png";
import Logo from "@/assets/logo.png";

import { useAuthenticationStore } from '@/stores/modules/authentication'

const userStore = useAuthenticationStore()
const user = userStore.getUser
</script>

<template>
  <div class="card-container">
    <section class="card-icon-and-number-container">
      <span class="icon">
        <Icon icon="ooui:network" width="25" />
      </span>
      <!-- <span class="number">4562 &nbsp;&nbsp; 1122 &nbsp;&nbsp; 4594 &nbsp;&nbsp; 7852</span> -->
      <span class="number">{{ user?.accountNo }}</span>
    </section>

    <section class="card-info-container">
      <div class="card-holder-and-expiration-container">
        <!-- card holder -->
        <div class="card-holder">
          <span class="caption">Customer</span>
          <span class="value">{{ user?.name}}</span>
        </div>

        <!-- card expiration -->
        <!-- <div class="card-expiration">
          <span class="caption">Expires</span>
          <span class="value">11/22</span>
        </div> -->

      </div>

      <div class="card-logo-container">
        <img :src="Logo" alt="card logo">
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

div.card-container {
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  background: linear-gradient(to bottom, #000000ad, rgba(0, 0, 0, 0.801)), url("@/assets/images/onboarding-bg-image/money-man.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;

  &>section {
    width: 100%;
    padding: 20px 15px;

    color: #ffffff;

    // card icon and number container
    &.card-icon-and-number-container {
      display: flex;
      flex-direction: column;
      row-gap: 10px;

      &>span {
        &.icon {
          padding-left: 10px;
        }

        &.number {
          font-size: 19px;
          font-weight: 700;
        }
      }
    }

    // card info container
    &.card-info-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 30px;

      // card holder and card logo containers
      &>div {
        // card holder and expiration container
        &.card-holder-and-expiration-container {
          width: 100%;
          display: flex;
          column-gap: 10px;
          justify-content: space-between;

          // card holder and expiration date containers
          &>div {
            display: flex;
            flex-direction: column;
            row-gap: 3px;

            &>span.caption {
              font-weight: lighter;
              font-size: 13px;
              color: $grey-1;
            }

            &>span.value {
              letter-spacing: 0.5px;
              font-size: 16px;
              font-weight: 600;
            }

            // card holder
            &.card-holder {
              width: 150px;

              &>span.value {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }

            // card expiration
            // &.card-holder {}
          }
        }

        // card logo container
        &.card-logo-container {
          padding-top: 5px;
          display: flex;
          justify-content: center;
          align-items: center;

          &>img {
            width: 40px;
          }
        }
      }
    }
  }
}

// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  div.card-container {
    border-radius: 8px;
    row-gap: unset;

    &>section {
      width: 100%;
      padding: 15px 10px;

      // card icon and number container
      &.card-icon-and-number-container {
        &>span {
          // &.icon {}

          &.number {
            font-size: 14.5px;
          }
        }
      }

      // card info container
      &.card-info-container {
        padding-top: 0;
        flex-direction: column;
        row-gap: 20px;
        justify-content: space-between;
        align-items: flex-start;

        // card holder and card logo containers
        &>div {
          width: 100%;

          // card holder and expiration container
          &.card-holder-and-expiration-container {
            flex-direction: column;
            row-gap: 5px;

            &>div {
              flex-direction: column;
              row-gap: unset;

              &>span.caption {
                font-size: 12px;
              }

              &>span.value {
                font-size: 14px;
              }

              // card holder
              &.card-holder {
                width: 190px;
                // &>span.value {}
              }

              // card expiration
              &.card-expiration {
                flex-direction: unset;
                column-gap: 8px;
                align-items: center;

                &>span.value {
                  margin-bottom: 3px;
                }
              }
            }
          }

        // card logo container
          &.card-logo-container {
            justify-content: unset;

            // &>img {}
          }
        }
      }
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  div.card-container {
    border-radius: 8px;
    row-gap: unset;

    &>section {
      width: 100%;
      padding: 15px 10px;

      // card icon and number container
      &.card-icon-and-number-container {
        &>span {
          // &.icon {}

          &.number {
            font-size: 14.5px;
          }
        }
      }

      // card info container
      &.card-info-container {
        padding-top: 0;
        flex-direction: column;
        row-gap: 20px;
        justify-content: space-between;
        align-items: flex-start;

        // card holder and card logo containers
        &>div {
          width: 100%;

          // card holder and expiration container
          &.card-holder-and-expiration-container {
            flex-direction: column;
            row-gap: 5px;

            &>div {
              flex-direction: column;
              row-gap: unset;

              &>span.caption {
                font-size: 12px;
              }

              &>span.value {
                font-size: 14px;
              }

              // card holder
              &.card-holder {
                width: unset;
                // &>span.value {}
              }

              // card expiration
              &.card-expiration {
                flex-direction: unset;
                column-gap: 8px;
                align-items: center;

                &>span.value {
                  margin-bottom: 3px;
                }
              }
            }
          }

        // card logo container
          &.card-logo-container {
            justify-content: unset;

            // &>img {}
          }
        }
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.card-container {
    border-radius: 8px;
    row-gap: unset;

    &>section {
      width: 100%;

      // card icon and number container
      &.card-icon-and-number-container {
        &>span {
          // &.icon {}

          &.number {
            font-size: 18px;
          }
        }
      }

      // card info container
      &.card-info-container {
        padding-top: 0;
        flex-direction: column;
        row-gap: 20px;
        justify-content: space-between;
        align-items: flex-start;

        // card holder and card logo containers
        &>div {
          width: 100%;

          // card holder and expiration container
          &.card-holder-and-expiration-container {
            row-gap: 5px;


            &>div {
              flex-direction: column;
              row-gap: unset;

              &>span.caption {
                font-size: 12px;
              }

              &>span.value {
                font-size: 14px;
              }

              // card holder
              &.card-holder {
                width: unset;
                max-width: 400px;

                // &>span.value {}
              }

              // card expiration
              // &.card-expiration {}
            }
          }

        // card logo container
          &.card-logo-container {
            justify-content: unset;

            // &>img {}
          }
        }
      }
    }
  }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  div.card-container {
    border-radius: 8px;
    row-gap: unset;

    &>section {
      width: 100%;

      // card icon and number container
      // &.card-icon-and-number-container {}

      // card info container
      &.card-info-container {
        padding-top: 0;
        flex-direction: column;
        row-gap: 20px;
        justify-content: space-between;
        align-items: flex-start;

        // card holder and card logo containers
        &>div {
          width: 100%;

          // card holder and expiration container
          &.card-holder-and-expiration-container {
            &>div {
              flex-direction: column;
              row-gap: unset;

              &>span.caption {
                font-size: 12px;
              }

              &>span.value {
                font-size: 14px;
              }

              // card holder
              &.card-holder {
                width: unset;
                max-width: 500px;

                // &>span.value {}
              }

              // card expiration
              // &.card-expiration {}
            }
          }

        // card logo container
          &.card-logo-container {
            justify-content: unset;

            // &>img {}
          }
        }
      }
    }
  }
}
</style>
