import PaymentLayout from '@/layouts/PaymentLayout.vue'
import paymentChildrenRoutes from '../children/payment'

const PaymentLayoutRoutes = {
    path: '/',
    name: 'payment layout',
    component: PaymentLayout,
    children: paymentChildrenRoutes
}

export default PaymentLayoutRoutes