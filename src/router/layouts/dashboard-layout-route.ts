import dashboardChildrenRoutes from '../children/dashboard'

const DashboardLayoutRoute = {
    path: '/',
    name: 'dashboard layout',
    component: () => import('@/layouts/DashboardLayout.vue'),
    children: dashboardChildrenRoutes,
    meta: {
        requiresAuth: true
    }
}

export default DashboardLayoutRoute
