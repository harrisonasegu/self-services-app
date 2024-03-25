<script setup lang="ts">
import { useTransactionStore } from '@/stores/modules/transaction'

import CardItem from './transactionItem.vue'

const transactionStore = useTransactionStore()

const transactionHistory = transactionStore.getDashboardTransactions

const today = new Date()
const yesterday = new Date(today)
yesterday.setDate(today.getDate() - 1)

const currentYear = today.getFullYear()
const previousYear = yesterday.getFullYear()

const currentMonth = today.getMonth()
const previousMonth = yesterday.getMonth()

const dateRange = (currentYear === previousYear) && (currentMonth === previousMonth)
  ? `${yesterday.getDate()} - ${today.getDate()} ${today.toLocaleString('en-us', { month: 'short' })}, ${today.getFullYear()}`
  : (currentYear === previousYear) && (currentMonth !== previousMonth)
    ? `${yesterday.getDate()} ${yesterday.toLocaleString('en-us', { month: 'short' })} - ${today.getDate()}  ${today.toLocaleString('en-us', { month: 'short' })}`
    : `${yesterday.getDate()} ${yesterday.toLocaleString('en-us', { month: 'short' })} ${yesterday.getFullYear()} - ${today.getDate()}  ${today.toLocaleString('en-us', { month: 'short' })} ${today.getFullYear()}`
</script>

<template>
  <div class="card-container">
    <section class="card-header-container">
      <div class="caption-container">
        <h3>Transactions</h3>
      </div>

      <div class="btn-container">
        <div class="img-and-date-container">
          <span class="icon">
            <Icon icon="carbon:calendar" width="20" />
          </span>
          <span class="date">{{ dateRange }}</span>
        </div>
      </div>
    </section>

    <section class="card-body-container">
      <div class="cards-wrap">
        <!-- newest transactions -->
        <CardItem
          caption="Newest"
          :transactions="transactionHistory.newestTransactions.slice(0, 3)"
        />

        <!-- yesterday's transactions -->
        <CardItem
          caption="Yesterday"
          :transactions="transactionHistory.yesterdayTransactions.slice(0, 3)"
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
        &>div.img-and-date-container {
          display: flex;
          column-gap: 5px;
          justify-content: center;
          align-items: center;

          &>span  {
            color: $grey-2;

            &.icon {
              &>* {
                margin-top: 6px;
              }
            }

            &.date {
              font-size: 13px;
            }
          }
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
        row-gap: 13.5px;
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
