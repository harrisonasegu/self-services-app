import { h } from 'vue'
import { RouterLink } from 'vue-router'

import { SpaceDashboardFilled } from '@vicons/material'
import { Newspaper } from '@vicons/ionicons5'

import { useRenderIcon } from '@/composables/renderIcon'

const superAdminDashboardNavMenu = () => [
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'dashboard'
                }
            },
            { default: () => 'Dashboard' }
        ),
        key: 'dashboard',
        icon: useRenderIcon(SpaceDashboardFilled)
    },
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'self services'
                }
            },
            { default: () => 'Self Services' }
        ),
        key: 'self services',
        icon: useRenderIcon(SpaceDashboardFilled)
    },
    {
        label: () => h(
            RouterLink,
            {
                to: {
                    name: 'transactions'
                }
            },
            { default: () => 'Transactions' }
        ),
        key: 'transactions',
        icon: useRenderIcon(Newspaper)
    }
]

export const userDashboardNavMenu: any = {
    1: superAdminDashboardNavMenu
}
