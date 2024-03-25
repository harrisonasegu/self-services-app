import AuthenticationLayout from '@/layouts/AuthenticationLayout.vue'
import authenticationChildrenRoutes from '../children/authentication'

const AuthenticationLayoutRoutes = {
    path: '/',
    name: 'authentication layout',
    component: AuthenticationLayout,
    children: authenticationChildrenRoutes
}

export default AuthenticationLayoutRoutes