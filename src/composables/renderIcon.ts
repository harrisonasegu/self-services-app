import { h, type Component } from 'vue'
import { NIcon } from 'naive-ui'

export const useRenderIcon = (icon: Component) => (): Component =>h(
    NIcon,
    null,
    { 
        default: () => h(icon) 
    }
)
