<script setup lang="ts">
import {
  NButton
} from 'naive-ui'

// import type { MerchantCategory_Interface } from '@/interface/merchantCategory'

import CardItem from './cardItem.vue'

// const handleButtonClick = (category: MerchantCategory_Interface) => {
const handleButtonClick = () => {
  console.log(12345);
}
</script>

<template>
  <div class="card-container">
    <section class="card-header-container">
      <div class="caption-container">
        <h3>Payment Methods</h3>
      </div>

      <!-- <div class="btn-container">
        <n-button
          type="primary"
          size="large"
          round
          @click="handleButtonClick"
        >
          <span class="icon-container">
            <Icon icon="ic:round-plus" height="22" />
          </span>
          New Card
        </n-button>
      </div> -->
    </section>

    <section class="card-body-container">
      <div class="cards-wrap">
        <!-- <CardItem
          v-for="(item, index) in 2"
          :key="index"
        /> -->
        <CardItem
          payment-method="Arca Wallet"
        />
        <CardItem
          payment-method="Debit Card"
        />
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
  border: 1px solid $grey-1;
  border-radius: 10px;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 5px 10px -5px $base-color;
  padding: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  background-color: #ffffff;

  &>section {
    width: 100%;

    &.card-header-container {
      display: flex;
      flex-wrap: wrap;
      column-gap: 20px;
      justify-content: space-between;
      align-items: center;

      &>div.caption-container {
        &>h3 {
          font-size: 17.5px;
          font-weight: 700;
          color: $base-color;
        }
      }

      &>div.btn-container {
        .n-button {
          display: flex;
          align-items: center;
          padding: 10px 15px;
          font-size: 13.5px;
          font-weight: 700;
        }
      }
    }

    &.card-body-container {
      width: 100%;
      display: flex;

      div.cards-wrap {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        row-gap: 15px;
        column-gap: 25px;
      }
    }
  }
}

// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  div.card-container {
    border-radius: 8px;
    padding: 10px;
    row-gap: 0px;

    &>section {
      &.card-header-container {
        row-gap: 5px;

        &>div.caption-container {
          &>h3 {
            font-size: 17px;
          }
        }

        &>div.btn-container {
          .n-button {
            height: 33px;
            font-size: 13px;

            span.icon-container {
              display: none;
            }
          }
        }
      }

      &.card-body-container {
        div.cards-wrap {
          padding: 20px 0;
        }
      }
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  div.card-container {
    border-radius: 8px;
    padding: 20px 10px;
    row-gap: 0px;

    &>section {
      &.card-header-container {
        row-gap: 5px;

        &>div.caption-container {
          &>h3 {
            font-size: 17px;
          }
        }

        &>div.btn-container {
          .n-button {
            height: 33px;
            font-size: 13px;

            span.icon-container {
              display: none;
            }
          }
        }
      }

      &.card-body-container {
        div.cards-wrap {
          padding: 20px 0 5px;
        }
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.card-container {
    border-radius: 8px;
    padding: 15px 12px;
    row-gap: 20px;

    &>section {
      &.card-header-container {
        row-gap: 5px;

        &>div.caption-container {
          &>h3 {
            font-size: 18px;
          }
        }

        &>div.btn-container {
          .n-button {
            height: 35px;
            font-size: 13px;

            span.icon-container {
              display: none;
            }
          }
        }
      }

      // &.card-body-container {}
    }
  }
}
</style>
