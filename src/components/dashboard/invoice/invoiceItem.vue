<script setup lang="ts">
import { NButton } from 'naive-ui'
</script>

<template>
  <div class="card-item-container">
    <section class="date-and-invoice-num-container">
      <div class="date-container">
        <span class="value">March, 01, 2020</span>
      </div>

      <div class="invoice-num-container">
        <span class="value">#MS-415646</span>
      </div>
    </section>

    <section class="card-invoice-value-and-btn-container">
      <div class="invoice-value-container">
        <span class="value">NGN180,000.00</span>
      </div>

      <div class="invoice-btn-container">
        <n-button
          type="primary"
          size="large"
          text
        >
          <span class="icon-container">
            <Icon icon="material-symbols:picture-as-pdf" width="25" />
            <span class="icon-text">PDF</span>
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
  padding: 6.2px 0;
  display: flex;
  align-items: center;

  &>section {
    &.date-and-invoice-num-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      column-gap: 20px;
      justify-content: space-between;

      // date container
      &>div.date-container {
        &>span {
          font-weight: 700;
          color: #344767;
        }
      }

      // invoice num container
      &>div.invoice-num-container {
        span.value {
          color: #7b809a;
        }
      }
    }

    &.card-invoice-value-and-btn-container {
      display: flex;
      column-gap: 20px;
      justify-content: space-between;
      align-items: center;

      // invoice value container
      &>div.invoice-value-container {
        &>span.value {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: NGNgrey-3;
        }
      }

      // invoice button container
      &>div.invoice-btn-container {
        &>.n-button {
          margin-top: 3px;

          .icon-container {
            display: flex;
            column-gap: 2px;
            justify-content: space-between;
            align-items: center;

            &>span.icon-text {
              font-size: 11px;
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
    border: 1px solid NGNgrey-1;
    padding: 10px;
    flex-direction: column;

    &>section {
      width: 100%;

      // &.date-and-invoice-num-container {}

      &.card-invoice-value-and-btn-container {
        column-gap: 10px;

        // invoice value container
        // &>div.invoice-value-container {}

        // invoice button container
        &>div.invoice-btn-container {
          &>.n-button {
            .icon-container {
              &>span.icon-text {
                display: none;
              }
            }
          }
        }
      }
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  div.card-item-container {
    width: 100%;
    border-radius: 8px;
    border: 1px solid NGNgrey-1;
    padding: 10px;
    flex-direction: column;

    &>section {
      width: 100%;

      // &.date-and-invoice-num-container {}

      &.card-invoice-value-and-btn-container {
        column-gap: 10px;

        // invoice value container
        // &>div.invoice-value-container {}

        // invoice button container
        // &>div.invoice-btn-container {}
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.card-item-container {
    width: 100%;
    border-radius: 8px;
    border: 1px solid NGNgrey-1;
    padding: 10px;
    flex-direction: column;

    &>section {
      width: 100%;

      // &.date-and-invoice-num-container {}

      &.card-invoice-value-and-btn-container {
        column-gap: 10px;

        // invoice value container
        // &>div.invoice-value-container {}

        // invoice button container
        // &>div.invoice-btn-container {}
      }
    }
  }
}
</style>
