<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { NLayoutHeader, NMenu } from 'naive-ui'
import { useRoute } from 'vue-router'

import { useMobileSidebarMenu } from '@/stores/common/mobileSidebarMenu'

const route: string | any = useRoute()
const activeRoute = computed(() => route?.name)

const store = useMobileSidebarMenu()
const { setSideMenuState } = store

const sidebarState = computed<boolean>(() => store.getSideMenuState)
const toggleSidebarMenu = () => setSideMenuState(true)

onBeforeMount(() => setSideMenuState(false))

onBeforeMount(() => setSideMenuState(false))
</script>

<template>
    <n-layout-header>
        <div class="authentication-layout-header">
            <img src="../../assets/logo.jpg" alt="app logo">

            <section>
                <!-- nav menu -->
                <div class="nav-menu">
                    <!-- nav menu will display only the Home navigation link -->
                    <n-menu
                        mode="horizontal"
                    />
                </div>

                <!-- toggle button -->
                <div class="side-menu-toggle" @click="toggleSidebarMenu">
                    <div :class="['sb-nav-toggle', sidebarState ? 'sb-is-active' : '']">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </section>
        </div>
    </n-layout-header>
    
    <!-- mobile sidebar menu -->
</template>

<style lang="scss" scoped>
    .n-layout-header {
        border-bottom: 0.5px solid #d0d0d096;
        padding: 10px 20px;
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        position: sticky;
        top: 0;
        z-index: 1;
        background-color: $base-color;

        &.home-bg {
            background-color: $banner-bg;
        }

        &>div.authentication-layout-header {
            height: 45px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            // logo
            &>img {
                height: 40px;
            }

            &>section {
                display: flex;
                align-items: center;

                // nav menu
                &>div.nav-menu {
                    display: none;
                }

                // toggle button
                &>div.side-menu-toggle {

                    // sidebar toggle button
                    div.sb-nav-toggle{
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
                            background-color: #ffffff;
                            transition: width 0.3s;
                        }
                    }
                }
            }
        }
    }

    // desktop
    @media (min-width: 992px) {
        .n-layout-header {
            // padding-left: 15em;
            // padding-right: 15em;

            &>div.authentication-layout-header {
                // height: 118px;
                height: 100px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                // logo
                &>img {
                    height: 126px;
                }

                &>section {
                    display: flex;
                    align-items: center;

                    // nav menu
                    &>div.nav-menu {
                        display: block;
                    }


                    // toggle button
                    &>div.side-menu-toggle {
                        display: none;
                    }
                }
            }
        }
    }

    @media screen and (min-width: 1500px) {
        .n-layout-header {
            padding: 10px 300px;
        }
    }
</style>
