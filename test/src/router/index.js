import Vue from 'vue'
import Router from 'vue-router'
import RManager from '@/components/r-manager'
import ISO from '@/components/manager/iso'
import Market from '@/components/manager/market'
import Product from '@/components/manager/product'
import Material from '@/components/manager/material'
import Transport from '@/components/manager/transport'
import Factory from '@/components/manager/factory'
import Prodline from '@/components/manager/prodline'
import ProductMaterial from '@/components/manager/product/material'

Vue.use(Router)

export default new Router({
  routes: [
    //首页
    {
      path: '/',
      name: '首页',
      component: RManager
    },
    //ISO认证
    {
      path: '/manager/iso',
      name: 'ISO',
      component: ISO
    },
    //市场
    {
      path: '/manager/market',
      name: '市场',
      component: Market
    },
    //产品
    {
      path: '/manager/product',
      name: '产品',
      component: Product,
      children:[
        {path:'/material',name:'材料',component:ProductMaterial}
      ]
    },
    //材料
    {
      path: '/manager/material',
      name: '材料',
      component: Material
    },
    //厂房
    {
      path: '/manager/factory',
      name: '厂房',
      component: Factory
    },
    //生产线
    {
      path: '/manager/prodline',
      name: '生产线',
      component: Prodline
    },

    //运输方式
    {
      path: '/manager/transport',
      name: '运输',
      component: Transport
    }
  ]
})
