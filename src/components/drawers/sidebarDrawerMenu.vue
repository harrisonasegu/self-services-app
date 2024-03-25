<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { NDrawer, NDrawerContent, NSpace, NMenu } from 'naive-ui'

import { dashboardNavMenu } from '@/menu/nav/dashboard-nav-menu'

import { useMobileSidebarMenu } from '@/stores/common/mobileSidebarMenu'

import logoUrl from '@/assets/logo.png'

defineProps<{
    navMenu: any,
    hasFooter: boolean
}>()

const route: string | any = useRoute()
const activeRoute = computed(() => route?.name)

const mobileSidebarMenuStore = useMobileSidebarMenu()

const sidebarState = computed<boolean>(() => mobileSidebarMenuStore.getSideMenuState)

const active = ref<boolean>(false)

const toggleSidebarMenu = (state: boolean) => {
    active.value = state
}

const resetSideMenuState = () => mobileSidebarMenuStore.setSideMenuState(false)

watch(sidebarState, (state: boolean) => toggleSidebarMenu(state))

// close sidebar menu on route change for mobile devices
watch(route, () => resetSideMenuState())
</script>

<template>
    <n-drawer
        :width="220"
        placement="left"
        v-model:show="active"
        :on-after-leave="resetSideMenuState"
    >
        <n-drawer-content closable>
            <template #header>
                <div class="img-container">
                    <img :src="logoUrl" alt="app logo">
                </div>
            </template>
            
            <n-space vertical :size="40">
                <n-menu
                    :collapsed-width="64"
                    :collapsed-icon-size="22"
                    :options="dashboardNavMenu()"
                    :default-value="activeRoute"
                />
            </n-space>
        </n-drawer-content>
    </n-drawer>
</template>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.n-drawer {
    .n-drawer-content {
        width: 100%;
        
        // logo
        div.img-container {
            max-width: 60px;
            height: auto;

            &>img {
                width: 100%;
                height: auto;
            }
        }
    }
}
</style>

