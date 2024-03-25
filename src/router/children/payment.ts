const paymentRouteChildren = [
  {
    path: '/make-payment/:paymentParams',
    name: 'make payment',
    component: () => import('@/views/payment/MakePaymentView.vue'),
    meta: {
      title: 'Make Payment'
    }
  },
  {
    path: '/payment-status/:paymentResponse',
    name: 'payment status',
    component: () => import('@/views/payment/PaymentResponseView.vue'),
    meta: {
      title: 'Payment Status'
    }
  }
]

export default paymentRouteChildren
