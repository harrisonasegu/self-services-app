<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { NLayoutHeader } from 'naive-ui'

import MobileSidebarMenu from '@/components/drawers/sidebarDrawerMenu.vue'
import UserInfoDropdown from '@/components/headers/headerUserDropdown.vue'
import DashboardRouteTitle from '@/components/headers/dashboardRouteTitle.vue'

import { useMobileSidebarMenu } from '@/stores/common/mobileSidebarMenu'

import { dashboardNavMenu } from '@/menu/nav/dashboard-nav-menu'

import logoUrl from '@/assets/logo.png'
// import notificationIconUrl from '@/assets/images/icons/notification.png'

const sidebarStore = useMobileSidebarMenu()

const sidebarState = computed<boolean>(() => sidebarStore.getSideMenuState)

const toggleSidebarMenu = () => sidebarStore.setSideMenuState(true)

onBeforeMount(() => sidebarStore.setSideMenuState(false))
</script>

<template>
    <n-layout-header>
        <div class="dashboard-header-container">
            <!-- logo and side bar toggle button -->
            <div>
                <div class="side-menu-toggle">
                    <div :class="['sb-nav-toggle', sidebarState ? 'sb-is-active' : '']" @click="toggleSidebarMenu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div class="img-container">
                    <img :src="logoUrl" alt="app logo">
                    <!-- <img alt="app logo"> -->
                </div>
            </div>

            <!-- user info dropdown -->
            <div>
                <div class="route-title-container">
                    <DashboardRouteTitle />
                </div>

                <div class="notifiction-and-user-info-container">
                    <!-- <div class="img-container"></div> -->

                    <div class="user-icon-container">
                        <UserInfoDropdown />
                    </div>
                </div>
            </div>
        </div>
    </n-layout-header>

    <!-- mobile sidebar menu -->
    <MobileSidebarMenu :nav-menu="dashboardNavMenu" :has-footer="false" />
</template>

<style lang="scss" scoped>
    .n-layout-header {
        // border-bottom: 0.5px solid #99999996;
        padding: 20px 50px 30px;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        position: sticky;
        top: 0;
        z-index: 3;
        // background: transparent;
        background: $dashboard-bg;

        &>div.dashboard-header-container {
            height: fit-content;
            display: flex;
            // row-gap: 10px;
            column-gap: 50px;
            align-items: center;

            &>div:first-child {
                // display: flex;
                display: none;
                column-gap: 10px;
                align-items: flex-start;

                // toggle button
                &>div.side-menu-toggle {
                    margin-top: 4px;
                    row-gap: 7px;
                    column-gap: 20px;
                    align-items: center;

                    // sidebar toggle button
                    div.sb-nav-toggle {
                        width: 20px;
                        height: 18px;
                        display: grid;
                        grid-template: auto auto auto  / 90%;
                        justify-content: center;
                        align-items: center;
                        row-gap: 3px;
                        transform: rotateY(180deg);
                        cursor: pointer;

                        // when sidebar toggled
                        &.sb-is-active {
                            span:not(span:nth-child(even)) {
                                width: 60%;
                            }
                        }

                        span {
                            width: 100%;
                            height: 3px;
                            background-color: $base-color;
                            transition: width 0.3s;
                        }
                    }
                }

                // logo
                &>div.img-container {
                    max-width: 150px;
                    height: auto;

                    &>img {
                        width: 100%;
                        height: auto;
                    }
                }
            }

            &>div:last-child {
                width: 100%;
                height: 100%;
                display: flex;
                row-gap: 5px;
                column-gap: 10px;
                justify-content: space-between;
                align-items: center;

                &>div.route-title-container {
                    width: 100%;
                    display: flex;
                    align-items: center;
                }

                &>div.notifiction-and-user-info-container {
                    width: 100%;
                    display: flex;
                    column-gap: 16px;
                    justify-content: flex-end;
                    align-items: center;

                    &>div.img-container {
                        width: 20px;
                        height: 20px;
                        display: flex;
                        align-items: center;

                        &>img {
                            width: 100%;
                        }
                    }

                    // &>div.user-icon-container {}
                }
            }
        }
    }

    // MEDIA QUERY

    // XX-SM (<251px)
    @media (max-width: 250.9px) {
        .n-layout-header {
            border-bottom: none;
            padding: 5px;

            &>div.dashboard-header-container {
                flex-direction: column;
                row-gap: 5px;
                align-items: flex-start;

                &>div:first-child {
                    display: flex;
                    column-gap: 10px;

                    // toggle button
                    &>div.side-menu-toggle {
                        display: flex;

                        // sidebar toggle button
                        div.sb-nav-toggle {
                            width: 18px;
                            height: 14px;
                        }
                    }

                    // logo
                    &>div.img-container {
                        width: 60px;
                    }
                }

                &>div:last-child {
                    width: 100%;
                    height: fit-content;
                    border-top: 0.5px solid #d4d4d496;
                    border-bottom: 0.5px solid #d4d4d496;
                    padding-top: 7px;
                    padding-bottom: 7px;
                    // flex-direction: column-reverse;
                    // align-items: flex-start;

                    // &>div.route-title-container {}

                    &>div.notifiction-and-user-info-container {
                        justify-content: flex-end;

                        &>div.img-container {
                            width: 16px;
                            height: 16px;
                        }

                        // &>div.user-icon-container {}
                    }
                }
            }
        }
    }

    // XX-SM
    @media (min-width: 251px) and (max-width: 350.9px) {
        .n-layout-header {
            border-bottom: none;
            padding: 5px;

            &>div.dashboard-header-container {
                flex-direction: column;
                row-gap: 5px;
                align-items: flex-start;

                &>div:first-child {
                    display: flex;
                    column-gap: 15px;

                    // toggle button
                    &>div.side-menu-toggle {
                        display: flex;

                        // sidebar toggle button
                        div.sb-nav-toggle {
                            width: 20px;
                            height: 16px;
                        }
                    }

                    // logo
                    &>div.img-container {
                        width: 75px;
                    }
                }

                &>div:last-child {
                    width: 100%;
                    height: fit-content;
                    border-top: 0.5px solid #d4d4d496;
                    border-bottom: 0.5px solid #d4d4d496;
                    padding-top: 7px;
                    padding-bottom: 7px;
                    // flex-direction: column-reverse;
                    // align-items: flex-start;

                    // &>div.route-title-container {}

                    &>div.notifiction-and-user-info-container {
                        justify-content: flex-end;

                        &>div.img-container {
                            width: 16px;
                            height: 16px;
                        }

                        // &>div.user-icon-container {}
                    }
                }
            }
        }
    }

    // X-SM
    @media (min-width: 351px) and (max-width: 575.9px) {
        .n-layout-header {
            padding: 10px 5px;

            &>div.dashboard-header-container {
                row-gap: 5px;
                column-gap: 25px;
                align-items: flex-start;

                &>div:first-child {
                    display: flex;
                    column-gap: 15px;

                    // toggle button
                    &>div.side-menu-toggle {
                        display: flex;

                        // sidebar toggle button
                        div.sb-nav-toggle {
                            width: 20px;
                            height: 16px;
                        }
                    }

                    // logo
                    &>div.img-container {
                        width: 70px;
                    }
                }

                &>div:last-child {
                    width: 100%;
                    height: fit-content;
                    // flex-direction: column-reverse;
                    // align-items: flex-end;

                    // &>div.route-title-container {}

                    &>div.notifiction-and-user-info-container {
                        justify-content: flex-end;

                        &>div.img-container {
                            width: 16px;
                            height: 16px;
                        }

                        // &>div.user-icon-container {}
                    }
                }
            }
        }
    }

    // SM
    @media (min-width: 576px) and (max-width: 767.9px) {
        .n-layout-header {
            padding: 10px 5px;

            &>div.dashboard-header-container {
                row-gap: 5px;
                align-items: center;

                
                &>div:first-child {
                    display: flex;
                    column-gap: 15px;

                    // toggle button
                    &>div.side-menu-toggle {
                        margin-top: 2px;
                        display: flex;
                    }

                    // logo
                    &>div.img-container {
                        width: 80px;
                    }
                }

                &>div:last-child {
                    width: 100%;
                    height: fit-content;

                    // &>div.route-title-container {}

                    &>div.notifiction-and-user-info-container {
                        justify-content: flex-end;

                        &>div.img-container {
                            width: 16px;
                            height: 16px;
                        }

                        // &>div.user-icon-container {}
                    }
                }
            }
        }
    }

    // MD
    @media (min-width: 768px) and (max-width: 991.9px) {
        .n-layout-header {
            padding: 15px 10px;

            &>div.dashboard-header-container {
                row-gap: 5px;
                align-items: center;

                &>div:first-child {
                    display: flex;
                    column-gap: 15px;

                    // toggle button
                    &>div.side-menu-toggle {
                        margin-top: 2px;
                        display: flex;
                    }

                    // logo
                    // &>div.img-container {}
                }

                &>div:last-child {
                    width: 100%;
                    height: fit-content;

                    // &>div.route-title-container {}

                    &>div.notifiction-and-user-info-container {
                        justify-content: flex-end;

                        &>div.img-container {
                            width: 18px;
                            height: 18px;
                        }

                        // &>div.user-icon-container {}
                    }
                }
            }
        }
    }

    // LG
    @media (min-width: 992px) and (max-width: 1200.9px) {
        .n-layout-header {
            padding: 10px 25px;
        }
    }

    // // XXL
    // @media (min-width: 1500px) {}
</style>
