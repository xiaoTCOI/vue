import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import Users from '@/components/user/Users'
import Rights from '@/components/power/Rights'
import Roles from '@/components/power/Roles'
import Cate from '@/components/goods/Cate'
import Params from '@/components/goods/Params'
import Goods from '@/components/goods/Goods'
import Add from '@/components/goods/Add'
import Order from '@/components/order/Order.vue'
Vue.use(Router)

const router = new Router({
  mode:'history', //去掉url#
  routes: [
    //重定向到login页面
    {
      path:'/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/home',
      name: '首页',
      component: Home,
      redirect:'/welcome',
      children:[
        {
          path: '/welcome',
          name: 'welcome',
          component: Welcome
        },
        {
          path: '/users',
          name: '用户管理',
          component: Users
        },
        {
          path: '/rights',
          name: '权限列表',
          component: Rights
        },
        {
          path: '/roles',
          name: '角色列表',
          component: Roles
        },
        {
          path: '/categories',
          name: '商品分类',
          component: Cate
        },
        {
          path: '/params',
          name: '分类参数',
          component: Params
        },
        {
          path: '/goods',
          name: '商品列表',
          component: Goods
        },
        {
          path: '/goods/add',
          name: '添加商品',
          component: Add
        },
        {
          path: '/orders',
          name: '订单列表',
          component: Order
        }
      ]
    }
  ]
})
// 挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  // to将要访问的路径
  // from代表从哪个路径跳转而来
  // next是一个函数，表示放行
  // next()放行  next('/login')强制跳转
  if(to.path === '/login') return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if(!tokenStr) return next('/login');
  next();
})
export default router;
