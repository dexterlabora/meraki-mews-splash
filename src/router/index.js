import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Terms from '@/components/Terms'
import Success from '@/components/Success'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/terms',
      name: 'Terms',
      component: Terms
    },
    {
      path: '/success/:customerId',
      name: 'Success',
      component: Success,
      parameters: true
    }
  ]
})
