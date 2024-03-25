const dashboardRouteChildren = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/DashboardView.vue'),
    meta: {
      title: 'Dashboard'
    }
  },
  {
    path: '/self-services',
    name: 'self services',
    component: () => import('@/views/dashboard/SelfServicesView.vue'),
    meta: {
      title: 'Self Services'
    },
    redirect: '/self-services/merchant-categories',
    children: [
      {
        path: 'merchant-categories',
        name: 'merchant categories',
        component: () => import('@/views/dashboard/MerchantCategoriesView.vue'),
        meta: {
          title: 'Merchant Category'
        }
      },
      {
        path: 'merchant-categories/merchants/:merchantCategory',
        name: 'merchant categories / merchants',
        component: () => import('@/views/dashboard/MerchantListView.vue'),
        meta: {
          title: 'Merchants'
        }
      }
    ]
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: () => import('@/views/dashboard/TransactionsView.vue'),
    meta: {
      title: 'Transactions'
    }
  }
]

export default dashboardRouteChildren
