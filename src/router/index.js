import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/User'
import clothes from '@/components/clothes'
import shoes from '@/components/shoes'
import Login from '@/components/Login'
import register from '@/components/register'
import reset from '@/components/reset'
import index from '@/components/index'
import warehouse from '@/components/warehouse'
import goods from '@/components/goods'
import contract from '@/components/contract'
import warehouseImport from '@/components/warehouseImport'
import order from '@/components/order'
import warehouseExport from '@/components/warehouseExport'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/reset',
      name: 'reset',
      component: reset
    },
    {
      path: '/User',
      name: 'User',
      component: User
    },
    {
      path: '/clothes',
      name: 'clothes',
      component: clothes
    },
    {
      path: '/shoes',
      name: 'shoes',
      component: shoes
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          path: '/warehouse',
          name: 'warehouse',
          component: warehouse
        },
        {
          path: '/goods',
          name: 'goods',
          component: goods
        },
        {
          path: '/contract',
          name: 'contract',
          component: contract
        },
        {
          path: '/warehouseImport',
          name: 'warehouseImport',
          component: warehouseImport
        },
        {
          path: '/order',
          name: 'order',
          component: order
        },
        {
          path: '/warehouseExport',
          name: 'warehouseExport',
          component: warehouseExport
        }
      ]
    }

  ]
})
