import Vue from 'vue'
import Router from 'vue-router'
import RManager from '@/components/r-manager'
import ISO from '@/components/manager/iso'
import IsoHistory from '@/components/manager/history/isoHistory'
import Market from '@/components/manager/market'
import MarketHistory from '@/components/manager/history/marketHistory'
import Product from '@/components/manager/product'
import ProductHistory from '@/components/manager/history/productHistory'
import Material from '@/components/manager/material'
import MaterialHistory from '@/components/manager/history/materialHistory'
import Transport from '@/components/manager/transport'
import TransportHistory from '@/components/manager/history/transportHistory'
import Factory from '@/components/manager/factory'
import FactoryHistory from '@/components/manager/history/factoryHistory'
import Prodline from '@/components/manager/prodline'
import ProdlineHistory from '@/components/manager/history/prodlineHistory'

Vue.use(Router)

export default new Router({
  mode: 'hash',
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
      component: ISO,
    },
    // ISO认证历史记录
    {
      path: '/manager/isoHistory',
      name: '历史记录',
      component: IsoHistory
    },
    //市场
    {
      path: '/manager/market',
      name: '市场',
      component: Market
    },
    // 市场历史记录
    {
      path: '/manager/marketHistory',
      name: '历史记录',
      component: MarketHistory
    },
    //产品
    {
      path: '/manager/product',
      name: '产品',
      component: Product,
    },
    // 产品历史记录
    {
      path: '/manager/productHistory',
      name: '历史记录',
      component: ProductHistory
    },
    //材料
    {
      path: '/manager/material',
      name: '材料',
      component: Material
    },
    // 材料历史记录
    {
      path: '/manager/materialHistory',
      name: '历史记录',
      component: MaterialHistory
    },
    //厂房
    {
      path: '/manager/factory',
      name: '厂房',
      component: Factory
    },
    // 市场历史记录
    {
      path: '/manager/FactoryHistory',
      name: '历史记录',
      component: FactoryHistory
    },
    //生产线
    {
      path: '/manager/prodline',
      name: '生产线',
      component: Prodline
    },
    // 生产线历史记录
    {
      path: '/manager/prodlineHistory',
      name: '历史记录',
      component: ProdlineHistory
    },
    //运输方式
    {
      path: '/manager/transport',
      name: '运输',
      component: Transport
    },
    // 运输历史记录
    {
      path: '/manager/transportHistory',
      name: '历史记录',
      component: TransportHistory
    },
  ]
})
