import PaymentLayoutRoutes from './layouts/payment-layout-route'
import AuthenticationLayoutRoutes from './layouts/authentication-layout-route'
import DashboardLayoutRoutes from './layouts/dashboard-layout-route'

const routes = [
    {
        path: '/:pathMatch(.*)*',
        name: 'page not found',
        component: () => import('@/views/404.vue')
    },
    AuthenticationLayoutRoutes,
    DashboardLayoutRoutes,
    PaymentLayoutRoutes,
]

export default routes
