import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'

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
      component: Home
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
