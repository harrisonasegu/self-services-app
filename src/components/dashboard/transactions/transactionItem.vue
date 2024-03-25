<script setup lang="ts">
import { NEmpty } from "naive-ui";

defineProps<{
  caption: string,
  transactions: any
}>()
</script>

<template>
  <div class="card-item-container">
    <section class="trx-time-container">
      <div class="time-container">
        <span class="time">{{ caption }}</span>
      </div>
    </section>

    <section
      v-if="transactions.length"
      class="transaction-info-container"
    >
      <div
        v-for="(transaction, index) in transactions"
        :key="index"
        :class="[
          'card-wrap',
          transaction?.status?.toLowerCase()
        ]"
      >
        <div class="img-and-trx-time-container">
          <div class="img-container">
            <span class="icon">
              <Icon
                :icon="transaction?.status?.toLowerCase() === 'pending'
                  ? 'bi:exclamation'
                  : 'basil:caret-up-outline'"
                width="25"
              />
            </span>
          </div>

          <div class="trx-info-container">
            <div class="item-name">
              <span class="value" :title="transaction?.name">{{ transaction?.name }}</span>
            </div>

            <div class="trx-date">
              <span class="value">{{ transaction?.date }}</span>
            </div>
          </div>
        </div>

        <div class="trx-value-container">
          <span class="value">{{ transaction?.amount }}</span>
        </div>
      </div>
    </section>
    <section
      v-else
      class="transaction-info-container"
    >
      <n-empty description="No Transaction" />
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
  flex-direction: column;
  row-gap: 20px;

  &>section {
    &.trx-time-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      column-gap: 20px;
      justify-content: space-between;

      // time container
      &>div.time-container {
        &>span {
          font-size: 12px;
          font-weight: 800;
          color: #8a8f98;
        }
      }
    }

    &.transaction-info-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      row-gap: 12px;

      &>div.card-wrap {
        display: flex;
        column-gap: 20px;
        justify-content: space-between;
        align-items: center;

        // colors for transaction status
        &.successful {
          // img and transaction time container
          &>div.img-and-trx-time-container {
            &>div.img-container {
              border: 1px solid #008000;

              &>span {
                color: #008000;
              }
            }
          }
          // transaction value container
          &>div.trx-value-container {
            &>span {
              color: #008000;
            }
          }
        }
        &.failed {
          // img and transaction time container
          &>div.img-and-trx-time-container {
            &>div.img-container {
              border: 1px solid #da0000;

              &>span {
                margin-top: -6px;
                transform: rotateX(180deg);
                color: #da0000;
              }
            }
          }
          // transaction value container
          &>div.trx-value-container {
            &>span {
              color: #da0000;
            }
          }
        }
        // =================================

        // img and transaction time container
        &>div.img-and-trx-time-container {
          width: 100%;
          display: flex;
          column-gap: 10px;
          align-items: center;

          // imgage container
          &>div.img-container {
            width: 35px;
            height: 35px;
            border: 1px solid $grey-2;       
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            &>span {
              margin-top: 5px;
              font-weight: 700;
              color: $grey-2;
            }
          }

          // transaction information container
          &>div.trx-info-container {
            // item name
            &>div.item-name {
              max-width: 200px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              
              &>span.value {
                font-weight: 700;
                color: #344767;
              }
            }

            // item date
            &>div.trx-date {
              span.value {
                font-size: 12px;
                color: #7b809a;
              }
            }
          }
        }

        // transaction value container
        &>div.trx-value-container {
          width: 100px;
        
          &>span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: $grey-3;
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
    flex-direction: column;

    &>section {
      width: 100%;

      // &.trx-time-container {}

      &.transaction-info-container {
        flex-direction: column;

        &>div.card-wrap {
          border: 1px solid $grey-1;
          border-radius: 10px;
          padding: 8px;
          flex-direction: column;
          row-gap: 5px;
          align-items: flex-start;

          // img and transaction time container
          &>div.img-and-trx-time-container {
            flex-direction: column;
            align-items: flex-start;

            // imgage container
            &>div.img-container {
              display: none;

              // &>span {}
            }

            // transaction information container
            // &>div.trx-info-container {}
          }

          // transaction value container
          // &>div.trx-value-container {}
        }
      }
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  div.card-item-container {
    width: 100%;
    flex-direction: column;

    &>section {
      width: 100%;

      // &.trx-time-container {}

      &.transaction-info-container {
        flex-direction: column;

        &>div.card-wrap {
          border: 1px solid $grey-1;
          border-radius: 10px;
          padding: 8px;
          flex-direction: column;
          row-gap: 5px;
          align-items: flex-start;

          // img and transaction time container
          // &>div.img-and-trx-time-container {}

          // transaction value container
          // &>div.trx-value-container {}
        }
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.card-item-container {
    width: 100%;
    flex-direction: column;

    &>section {
      width: 100%;

      // &.trx-time-container {}

      &.transaction-info-container {
        flex-direction: column;

        &>div.card-wrap {
          // border: 1px solid $grey-1;
          // border-radius: 10px;
          // padding: 8px;
          // flex-direction: column;
          row-gap: 5px;
          align-items: flex-start;

          // img and transaction time container
          // &>div.img-and-trx-time-container {}

          // transaction value container
          // &>div.trx-value-container {}
        }
      }
    }
  }
}
</style>
