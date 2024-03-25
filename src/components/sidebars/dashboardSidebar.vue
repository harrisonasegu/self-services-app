<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { NLayoutSider, NMenu, NSpace } from 'naive-ui'

import { dashboardNavMenu } from '@/menu/nav/dashboard-nav-menu'

import logoUrl from '@/assets/logo.png'

const route: string | any = useRoute()

const activeRoute = computed(() => route?.name)
</script>

<template>
    <n-layout-sider
        bordered
        :show-trigger="false"
        collapse-mode="width"
        :collapsed-width="64"
        :width="220"
        :native-scrollbar="false"
    >
        <n-space vertical :size="40" class="dashboard-menu-container">
            <div class="dashboard-img-container">
                <img :src="logoUrl" alt="app logo">
                <!-- <img alt="app logo"> -->
            </div>

            <n-menu
                :options="dashboardNavMenu()"
                :default-value="activeRoute"
                inverted
            />
        </n-space>    
    </n-layout-sider>
</template>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.n-layout-sider {
    border-radius: 22px;
    background: $base-color;

    .dashboard-menu-container {
        // dashboard logo
        .dashboard-img-container {
            width: 100%;
            height: fit-content;
            padding: 25px 0 0;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: auto;
                height: 50px;
            }
        }
    }
}

// MD
@media (max-width: 991.9px) {
    .n-layout-sider {
        display: none;
    }
}

// LG
@media (min-width: 992px) and (max-width: 1199.9px) {
    .n-layout-sider {
        & .dashboard-menu-container {
            padding-left: 20px;
        }
    }
}
</style>
