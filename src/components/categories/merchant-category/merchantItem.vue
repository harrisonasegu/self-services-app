<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { CategoryOutlined } from '@vicons/material';

import type { MerchantCategory_Interface } from '@/interface/merchantCategory';
import type { Merchant_Interface } from '@/interface/merchant';

import { useStringToSentence } from '@/composables/camelCaseToTitle';

defineProps<{
  merchantCategory: MerchantCategory_Interface
  merchant: Merchant_Interface
}>()
</script>

<template>
  <div class="category-item" :title="merchant.merchantName">
    <!-- card title and icon -->
    <div class="category-item-header">
      <div class="stat-title">
        <small>{{ useStringToSentence(merchantCategory.typeName) }}</small>
        <span>{{ useStringToSentence(merchant.merchantName) }}</span>
      </div>

      <div class="stat-icon">
        <span>
          <n-icon :component="CategoryOutlined" />
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  // cards item
  div.category-item {
    width: calc((100% / 3) - 20px);
    height: fit-content;
    display: flex;
    flex-flow: column nowrap;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
    box-shadow: 3px 3px 4px 2px rgba(0, 0, 0, 0.25);
    padding: 21px 20px 30px;
    background: linear-gradient(87deg, $base-color-1, $base-color);
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      border-radius: 0.2rem;
      box-shadow: unset;
      transform: scale3d(1.05,1.05,1);
    }

    &>div.category-item-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      column-gap: 10px;

      // statistics title
      &>div.stat-title {
        max-width: 170px;
        display: flex;
        flex-basis: content;
        flex-direction: column;
        row-gap: 5px;
        font-weight: 600;
        color: #ffffff;

        // Stat Category
        &>small {
          color: #c4c3c3;
        }

        // Stat Value
        &>span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-transform: capitalize;
          font-size: 1rem;
          font-weight: bold;
          color: #ffffff;
        }
      }

      // statistics icon
      &>div.stat-icon {
        width: 100%;
        display: flex;
        flex-basis: content;
        justify-content: center;
        align-items: center;

        &>span {
          width: 60px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 100%;
          background: linear-gradient(87deg, $base-color-1,#c4c3c3);

          // icon
          .n-icon {
            font-size: 25px;
            font-weight: bold;
            color: #ffffff;
          }
        }
      }
    }
  }

  // MEDIA QUERY

  // XX-SM (<251px)
  @media (max-width: 250.9px) {
    // cards item
    div.category-item {
      width: 100%;
      display: flex;
      padding: 1rem 1rem;

      &>div.category-item-header {
        justify-content: center;

        // statistics title
        &>div.stat-title {
          // Stat Value
          &>span {
            font-size: 0.7rem;
          }
        }
        // statistics icon
        &>div.stat-icon {
          display: none;

          &>span {
            width: 38px;
            height: 38px;

            // icon
            svg {
              width: 20px;
              height: 20px;
              color: #ffffff;
              align-self: center;
            }
          }
        }
      }
    }
  }

  // XX-SM
  @media (min-width: 251px) and (max-width: 350.9px) {
    // cards item
    div.category-item {
      width: 100%;
      display: flex;
      padding: 1rem 1rem;

      &>div.category-item-header {
        // statistics title
        &>div.stat-title {
          justify-content: center;
          
          // Stat Value
          &>span {
            font-size: 0.8rem;
          }
        }
        // statistics icon
        &>div.stat-icon {
          display: flex;
          flex-basis: content;
          justify-content: center;
          align-items: center;

          &>span {
            width: 38px;
            height: 38px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 100%;

            // icon
            svg {
              width: 20px;
              height: 20px;
              color: #ffffff;
              align-self: center;
            }
          }
        }
      }
    }
  }

  // X-SM
  @media (min-width: 351px) and (max-width: 575.9px) {
    // cards item
    div.category-item {
      width: 80%;
      display: flex;
      margin: 0 auto;
      padding: 1.5rem 1rem;

      &>div.category-item-header {
        // statistics title
        &>div.stat-title {
          // Stat Value
          &>span:last-child {
            font-size: 0.93rem;
          }
        }
        // statistics icon
        &>div.stat-icon {
          display: flex;
          flex-basis: content;
          justify-content: center;
          align-items: center;

          &>span {
            width: 38px;
            height: 38px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 100%;

            // icon
            svg {
              width: 20px;
              height: 20px;
              color: #ffffff;
              align-self: center;
            }
          }
        }
      }
    }
  }

  // SM
  @media (min-width: 576px) and (max-width: 767.9px) {
    // cards item
    div.category-item {
      width: 49%;
      display: flex;
      padding: 1.5rem 1rem;

      &>div.category-item-header {
        // statistics title
        &>div.stat-title {
          // Stat Value
          &>span {
            font-size: 0.9rem;
          }
        }
        // statistics icon
        &>div.stat-icon {
          display: flex;
          flex-basis: content;
          justify-content: center;
          align-items: center;

          &>span {
            width: 38px;
            height: 38px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 100%;

            // icon
            svg {
              width: 20px;
              height: 20px;
              color: #ffffff;
              align-self: center;
            }
          }
        }
      }
      &>p.category-item-percentage {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        column-gap: 7px;
        margin-top: 1rem;
        margin-bottom: 0;
        font-size: 0.875rem;
        font-weight: 300;
        line-height: 1.7;
      }
    }
  }

  // MD
  @media (min-width: 768px) and (max-width: 991.9px) {
    // cards item
    div.category-item {
      width: calc((100% / 3) - 7px);
      display: flex;
      padding: 1.5rem 1rem;

      &>div.category-item-header {
        // statistics title
        &>div.stat-title {
          // Stat Value
          &>span {
            font-size: 0.9rem;
          }
        }
        // statistics icon
        &>div.stat-icon {
          display: flex;
          flex-basis: content;
          justify-content: center;
          align-items: center;

          &>span {
            width: 38px;
            height: 38px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 100%;

            // icon
            svg {
              width: 20px;
              height: 20px;
              color: #ffffff;
              align-self: center;
            }
          }
        }
      }
      &>p.category-item-percentage {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        column-gap: 7px;
        margin-top: 1rem;
        margin-bottom: 0;
        font-size: 0.875rem;
        font-weight: 300;
        line-height: 1.7;
      }
    }
  }

  // LG
  @media (min-width: 992px) and (max-width: 1200.9px) {
    // cards item
    div.category-item {
      width: calc((100% / 3) - 7px);
      display: flex;
      padding: 1.5rem 1rem;

      &>div.category-item-header {
        // statistics title
        &>div.stat-title {
          // Stat Value
          &>span:last-child {
            font-size: 0.9rem;
          }
        }
        // statistics icon
        &>div.stat-icon {
          display: flex;
          flex-basis: content;
          justify-content: center;
          align-items: center;

          &>span {
            width: 38px;
            height: 38px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 100%;

            // icon
            svg {
              width: 20px;
              height: 20px;
              color: #ffffff;
              align-self: center;
            }
          }
        }
      }
      &>p.category-item-percentage {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        column-gap: 7px;
        margin-top: 1rem;
        margin-bottom: 0;
        font-size: 0.875rem;
        font-weight: 300;
        line-height: 1.7;
      }
    }
  }

  // XL
  // @media (max-width: 1201px) {}
</style>
