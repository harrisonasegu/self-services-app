<script setup lang="ts">
import {
  NButton
} from 'naive-ui'
</script>

<template>
  <div class="card-item-container">
    <section class="user-information-container">
      <div class="user-name-container">
        <span class="value">Oliver Liam</span>
      </div>

      <div class="user-details-container">
        <div class="detail">
          <span class="caption">Company Name:</span>
          <span class="value">Stone Tech Zone</span>
        </div>

        <div class="detail">
          <span class="caption">Email Address:</span>
          <span class="value">oliver@burrito.com</span>
        </div>

        <div class="detail">
          <span class="caption">VAT Number:</span>
          <span class="value">FRB1235476</span>
        </div>
      </div>
    </section>

    <section class="billing-info-action-container">
      <div class="action-btn-container">
        <n-button
          type="primary"
          size="large"
          text
        >
          <span class="icon-container">
            <Icon icon="solar:pen-bold" width="16" />
            <span class="icon-text">Edit</span>
          </span>
        </n-button>
      </div>

      <div class="action-btn-container">
        <n-button
          type="error"
          size="large"
          text
        >
          <span class="icon-container">
            <Icon icon="ic:round-delete" width="16" />
            <span class="icon-text">Delete</span>
          </span>
        </n-button>
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

div.card-item-container {
  width: 100%;
  border-radius: 10px;
  padding: 20px 22px;
  display: flex;
  align-items: center;
  background: #f8f9fa;

  &>section {
    // user information container
    &.user-information-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      row-gap: 10px;
      column-gap: 20px;
      justify-content: space-between;

      // user name container
      &>div.user-name-container {
        &>span {
          font-size: 14px;
          font-weight: 800;
          color: #344767;
        }
      }

      // user details container
      &>div.user-details-container {
        display: flex;
        flex-direction: column;
        row-gap: 2px;

        &>div.detail {
          display: flex;
          column-gap: 6px;

          &>span {
            font-size: 12.2px;

            &.caption {
              font-weight: 700;
              color: $base-color;
            }
            &.value {
              color: #7b809a;
            }
          }
        }
      }
    }

    // billing information action container
    &.billing-info-action-container {
      display: flex;
      column-gap: 30px;
      justify-content: space-between;
      align-items: center;

      // invoice button container
      &>div.action-btn-container {
        &>.n-button {
          .icon-container {
            display: flex;
            column-gap: 4px;
            justify-content: space-between;
            align-items: center;

            &>span {
              font-size: 14px;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
}

// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  div.card-item-container {
    width: 100%;
    border-radius: 8px;
    padding: 20px 10px;
    flex-direction: column;
    row-gap: 20px;

    &>section {
      width: 100%;

      // user information container
      &.user-information-container {
        // user name container
        &>div.user-name-container {
          // &>span {}
        }

        // user details container
        &>div.user-details-container {
          &>div.detail {
            flex-direction: column;

            &>span {
              font-size: 12.2px;

              &.caption {
                font-weight: 700;
                color: $base-color;
              }
              &.value {
                color: #7b809a;
              }
            }
          }
        }
      }

      // billing information action container
      &.billing-info-action-container {
        justify-content: flex-start;

        // invoice value container
        // &>div.invoice-value-container {}

        // invoice button container
        // &>div.action-btn-container {}
      }
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  div.card-item-container {
    width: 100%;
    border-radius: 8px;
    padding: 20px 10px;
    flex-direction: column;
    row-gap: 20px;

    &>section {
      width: 100%;

      // user information container
      &.user-information-container {
        // user name container
        // &>div.user-name-container {}

        // user details container
        &>div.user-details-container {
          &>div.detail {
            flex-wrap: wrap;
          }
        }
      }

      // billing information action container
      &.billing-info-action-container {
        justify-content: flex-start;

        // invoice value container
        // &>div.invoice-value-container {}

        // invoice button container
        // &>div.action-btn-container {}
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.card-item-container {
    width: 100%;
    border-radius: 8px;
    padding: 20px;
    flex-direction: column;
    row-gap: 20px;

    &>section {
      width: 100%;

      // user information container
      // &.user-information-container {}

      // billing information action container
      &.billing-info-action-container {
        justify-content: flex-start;

        // invoice value container
        // &>div.invoice-value-container {}

        // invoice button container
        // &>div.action-btn-container {}
      }
    }
  }
}
</style>
