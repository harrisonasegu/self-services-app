<script setup lang="ts">
import {
  NButton
} from 'naive-ui'

// import MasterCardLogo from "@/assets/images/atm-card/mastercard.png";
// import VisaCardLogo from "@/assets/images/atm-card/visacard.png";
import Logo from "@/assets/logo.png";


defineProps<{
  paymentMethod: string
}>()
</script>

<template>
  <div class="card-item-container">
    <section class="card-img-and-num-container">
      <div class="img-container">
        <img :src="Logo" alt="card logo">
        <!-- <h4>{{ paymentMethod }}</h4> -->
      </div>

      <div class="card-num-container">
        <span class="value">
          ****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;7852
        </span>
      </div>
    </section>

    <section class="card-btn-container">
      <n-button
        type="primary"
        size="large"
        text
      >
        <span class="icon-container">
        <h4>{{ paymentMethod }}</h4>
            <!-- <Icon icon="solar:pen-bold" width="20" /> -->
        </span>
      </n-button>
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
  width: calc((100% / 2) - 12.5px);
  border: 1px solid $grey-1;
  border-radius: 10px;
  padding: 22px;
  display: flex;
  align-items: center;

  &>section {
    &.card-img-and-num-container {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      column-gap: 15px;
      // justify-content: space-between;
      align-items: center;

      // card image
      &>div.img-container {
        &>img {
          width: 40px;
        }
        &>h4 {
          color: $base-color;
        }
      }

      // card number
      &>div.card-num-container {
        span.value {
          font-size: 13.5px;
          font-weight: 800;
          color: $base-color;
        }
      }
    }

    // &.card-btn-container {}
  }
}

// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  div.card-item-container {
    width: 100%;
    border-radius: 8px;
    padding: 10px;
    align-items: flex-start;

    &>section {
      &.card-img-and-num-container {
        // card image
        &>div.img-container {
          &>img {
            width: 40px;
          }
        }

        // card number
        // &>div.card-num-container {}
      }

      &.card-btn-container {
        .n-button {
          // icon container
          .icon-container {
            font-size: 10px;
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
    padding: 20px 10px;
    column-gap: 15px;
    align-items: flex-start;

    &>section {
      &.card-img-and-num-container {
        // card image
        &>div.img-container {
          &>img {
            width: 40px;
          }
        }

        // card number
        // &>div.card-num-container {}
      }

      &.card-btn-container {
        .n-button {
          // icon container
          .icon-container {
            font-size: 10px;
          }
        }
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.card-item-container {
    width: 100%;
    border-radius: 8px;
    padding: 20px 10px;
    column-gap: 15px;

    &>section {
      &.card-img-and-num-container {
        // card image
        &>div.img-container {
          &>img {
            width: 40px;
          }
        }

        // card number
        // &>div.card-num-container {}
      }

      &.card-btn-container {
        .n-button {
          // icon container
          .icon-container {
            font-size: 10px;
          }
        }
      }
    }
  }
}
</style>
