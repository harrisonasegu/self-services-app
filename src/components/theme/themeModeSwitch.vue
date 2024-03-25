<script setup lang="ts">
import { computed } from 'vue'
import { NButton, NIcon, darkTheme } from 'naive-ui'
import { DarkModeOutlined, LightModeOutlined } from '@vicons/material'
import { useThemeModeStore } from '@/stores/common/themeMode'

const store = useThemeModeStore()
const { setThemeMode } = store

defineProps<{
    position: string
}>()

const defaultTheme = store.getThemeMode

const icon = computed(() => defaultTheme.value ? LightModeOutlined : DarkModeOutlined)

const handleThemeSwitch = (): void => {    
    defaultTheme.value ? setThemeMode(null) : setThemeMode(darkTheme)
}
</script>

<template>
    <Transition>
        <n-button
            text
            type="primary"
            :class="position"
            @click="handleThemeSwitch"
        >
            <n-icon
                :component="icon"
                :size="25"
            />
        </n-button>
    </Transition>
</template>

<style lang="scss" scoped>
    .n-button {
        width: 30px;
        height: 30px;
        border-radius: 100%;
        box-shadow: -2px 5px 10px #abc7e2 !important;
        transition: $transition;

        &.absolute {
            position: fixed;
            right: 0.5vw;
            bottom: 20vh;

            &:hover {
                box-shadow: -2px 2px 5px #abc7e2 !important;
            }
        }
    }
</style>
