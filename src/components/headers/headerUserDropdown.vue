<script setup lang="ts">
import { h } from 'vue'
import { NDropdown } from 'naive-ui'

import { LogOutOutline, PersonOutline } from '@vicons/ionicons5'

import imgUrl from '@/assets/images/icons/profile-image.png'

import { useAuthenticationStore } from '@/stores/modules/authentication'
import { useRenderIcon } from '@/composables/renderIcon'

const authStore = useAuthenticationStore()
const user = authStore.getUser

const name = user.value?.name?.split(' ')[0]

const userIconDropdownMenu: any[] = [
  {
    label: () => h('b', 'Account'),
    key: 'account',
    icon: useRenderIcon(PersonOutline)
  },
  {
    label: () => h('b', 'Logout'),
    key: 'logout',
    icon: useRenderIcon(LogOutOutline)
  }
]

const handleSelect = (option: string) => {
  switch (option) {
    case 'profile':
      break;

    case 'logout':
        authStore.updateIsLogoutMenuClicked(true)
      break;
  }
  
}
</script>

<template>
  <div class="nb-user-info-content">
    <n-dropdown
      trigger="click"
      :options="userIconDropdownMenu"
      @select="handleSelect"
    >
      <div class="photo-name">
        <div class="photo-container">
          <img :src="imgUrl" alt="User photo">
          <!-- <span class="name-accronym">{{ nameAccronym }}</span> -->
        </div>
      
        <div class="name">
          <span>{{ name }}</span>
        </div>
      </div>
    </n-dropdown>
  </div>
</template>

<style lang="scss" scoped>
div.nb-user-info-content {
  display: flex;
  column-gap: 10px;
  align-items: center;

  div.photo-name {
    display: flex;
    // column-gap: 10px;
    column-gap: 7px;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &::after {
      content: '';
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 8px solid #6E767D;
      border-radius: 100%;
    }

    // photo
    &>div.photo-container {
      width: 36px;
      height: 36px;
      border-radius: 100%;
      background-color: #D9D9D9;

      &>img {
        width: 100%;
        height: auto;
        border-radius: 100%;
      }
    }

    // name of user
    &>div.name {
      text-transform: capitalize;
      font-size: 15px;
      font-weight: 500;
    }
  }
}


// MEDIA QUERY

// XX-SM (<251px)
@media (max-width: 250.9px) {
  div.nb-user-info-content {
    div.photo-name {
      &::after {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 7px solid #6E767D;
      }

      // photo
      &>div.photo-container {
        width: 24px;
        height: 24px;

        &>img {
          width: 100%;
          height: auto;
        }
      }

      // name of user
      &>div.name {
        display: none;
        font-size: 12px;
        line-height: 15px;
      }
    }
  }
}

// XX-SM
@media (min-width: 251px) and (max-width: 350.9px) {
  div.nb-user-info-content {
    div.photo-name {
      &::after {
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 7px solid #6E767D;
      }

      // photo
      &>div.photo-container {
        width: 24px;
        height: 24px;

        &>img {
          width: 100%;
          height: auto;
        }
      }

      // name of user
      &>div.name {
        display: none;
        font-size: 12px;
        line-height: 15px;
      }
    }
  }
}

// X-SM
@media (min-width: 351px) and (max-width: 575.9px) {
  div.nb-user-info-content {
    div.photo-name {
      &::after {
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 8px solid #6E767D;
      }

      // photo
      &>div.photo-container {
        width: 30px;
        height: 30px;

        &>img {
          width: 100%;
          height: auto;
        }
      }

      // name of user
      &>div.name {
        display: none;
        font-size: 12px;
        line-height: 15px;
      }
    }
  }
}

// SM
@media (min-width: 576px) and (max-width: 767.9px) {
  div.nb-user-info-content {
    div.photo-name {
      &::after {
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 8px solid #6E767D;
      }

      // photo
      &>div.photo-container {
        width: 30px;
        height: 30px;

        &>img {
          width: 100%;
          height: auto;
        }
      }

      // name of user
      &>div.name {
        font-size: 12px;
        line-height: 15px;
      }
    }
  }
}
</style>
