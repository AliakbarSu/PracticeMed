import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

import Results from '@/components/containers/results/results.vue'
import FailedPayment from '@/components/containers/payment/paymentFailed.vue'
// import Questions from '../components/containers/admin/questions/questions.vue'
import Account from '@/components/containers/account/account.vue'
import Home from '@/components/containers/home/index.vue'
import Products from '@/components/containers/products/products.vue'
import Dashboard from '@/components/containers/dashboard/dashboard.vue'
import Confirmation from '@/components/containers/confirmation/index.vue'
import Unsuccessful from '@/components/containers/unsuccessful/unsuccessful.vue'
import Faqs from '@/components/containers/faqs/Faqs.vue'
import { authGuard } from '@auth0/auth0-vue'
import Test from '@/components/containers/test/test.vue'
import Plans from '@/components/containers/plans/Plans.vue'
import About from '@/components/containers/about/About.vue'
import TermsAndConditions from '@/components/containers/terms&conditions/terms&conditions.vue'
import SecurePayments from '@/components/containers/securePayments/securePayments.vue'
import Privacy from '@/components/containers/privacy/privacy.vue'
import Contact from '@/components/containers/contact/contact.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/plans',
    name: 'Plans',
    component: Plans
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    beforeEnter: authGuard,
    component: Dashboard
  },
  {
    path: '/confirmation',
    name: 'Confirmation',
    component: Confirmation
  },
  {
    path: '/unsuccessful',
    name: 'Unsuccessful',
    component: Unsuccessful
  },
  {
    path: '/faqs',
    name: 'Faqs',
    component: Faqs
  },
  {
    path: '/terms-and-conditions',
    name: 'Terms and Conditions',
    component: TermsAndConditions
  },
  {
    path: '/secure-payments',
    name: 'Secure Payments',
    component: SecurePayments
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: Privacy
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/account',
    name: 'Account',
    beforeEnter: authGuard,
    component: Account
  },
  {
    path: '/results/:id',
    name: 'Test results summary',
    // beforeEnter: authGuard,
    component: Results
  },
  {
    path: '/payment/failed',
    name: 'Checkout',
    component: FailedPayment
  },
  // Todo: from before
  // {
  //   path: '/admin',
  //   name: 'Admin',
  //   component: Questions
  // },
  {
    path: '/tests',
    name: 'Products',
    beforeEnter: authGuard,
    component: Products
  },
  {
    path: '/test/:id',
    name: 'Test',
    beforeEnter: authGuard,
    component: Test
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
