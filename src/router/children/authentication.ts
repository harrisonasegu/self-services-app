const authenticationRouteChildren = [
  {
    path: '/',
    name: 'sign up',
    component: () => import('@/views/SignUpView.vue'),
    meta: {
      title: 'Sign Up'
    }
  },
  {
    path: '/sign-in',
    name: 'sign in',
    component: () => import('@/views/SignInView.vue'),
    meta: {
      title: 'Sign In'
    }
  },
  {
    path: '/forgot-password',
    name: 'forgot password',
    component: () => import('@/views/ForgotPasswordView.vue'),
    meta: {
      title: 'Forgot Password'
    }
  },
  {
    path: '/account-activation',
    name: 'account activation',
    component: () => import('@/views/AccountActivationView.vue'),
    meta: {
      title: 'Account Activation'
    }
  },
  {
    path: '/create-new-password/:userActivationParams',
    name: 'create new password',
    component: () => import('@/views/CreateNewPasswordView.vue'),
    meta: {
      title: 'Create New Password'
    }
  },
  {
    path: '/forgot-password',
    name: 'forgot password',
    component: () => import('@/views/ForgotPasswordView.vue'),
    meta: {
      title: 'Forgot Password'
    }
  },
  {
    path: '/change-password/:changePasswordParams',
    name: 'change password',
    component: () => import('@/views/ChangePasswordView.vue'),
    meta: {
      title: 'Change Password'
    }
  }
]

export default authenticationRouteChildren
