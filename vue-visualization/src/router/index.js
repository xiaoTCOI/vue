import Vue from 'vue'
import Router from 'vue-router'

// import axios from 'axios'
// import VueAxios from 'vue-axios'
 
import HelloWorld from '@/components/HelloWorld'
// Vue.use(VueAxios, axios)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
