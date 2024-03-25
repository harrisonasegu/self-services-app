<script setup lang="ts">
import { useNumberToCurrency } from '@/composables/formatNumber';

defineProps<{
  transactionType: string
  totalTransactionAmount: number
}>()
</script>

<template>
  <div class="card-container">
    <section class="img-and-caption-container">
      <div class="img-container">
        <span :class="[
          'icon',
          transactionType
          ]">
          <Icon icon="grommet-icons:transaction" width="25" />
        </span>
      </div>
      
      <div class="caption-container">
        <span class="caption">{{ transactionType}}</span>
        <span class="description">Transactions</span>
      </div>
    </section>

    <section class="card-body-container">
      <div class="amount-container">
        <!-- <span class="sign">+</span> -->
        <span class="value" :title="useNumberToCurrency( totalTransactionAmount, 'ngn')">{{ useNumberToCurrency( totalTransactionAmount, 'ngn') }}</span>
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
  row-gap: 10px;
  background-color: #ffffff;

  &>section {
    width: 100%;

    &.img-and-caption-container {
      padding-bottom: 10px;
      border-bottom: 1px solid $grey-1;
      display: flex;
      flex-direction: column;
      row-gap: 12px;
      justify-content: center;
      align-items: center;

      &>div.img-container {
        &>span.icon {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border-radius: 10px;
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: $approved;
          color: #ffffff;

          &.pending {
            background-color: $pending;
          }
        }
      }

      &>div.caption-container {
        display: flex;
        flex-direction: column;
        row-gap: 5px;
        justify-content: center;
        align-items: center;

        &>span {
          &.caption {
            text-transform: capitalize;
            font-size: 16.5px;
            font-weight: 700;
            color: $base-color;
          }

          &.description {
            font-weight: lighter;
            font-size: 12px;
            color: $grey-3;
          }
        }
      }
    }

    &.card-body-container {
      &>div.amount-container {
        display: flex;
        column-gap: 2px;
        justify-content: center;
        align-items: center;

        &>span {
          font-size: 16px;
          font-weight: 700;
          color: $base-color;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
    padding: 30px 10px;
    row-gap: 20px;
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  div.card-container {
    border-radius: 8px;
    padding: 30px 10px;
    row-gap: 20px;
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.card-container {
    border-radius: 8px;
    padding: 25px 12px 20px;
    row-gap: 20px;

    &>section {
      &.img-and-caption-container {
        row-gap: 5px;

        &>div.caption-container {
          &>h3 {
            font-size: 18px;
          }
        }

        &>div.img-container {
          .n-button {
            height: 35px;
            font-size: 13px;

            span.img-container {
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
