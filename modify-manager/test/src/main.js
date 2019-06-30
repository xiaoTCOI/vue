// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import axios from 'axios' //引入axios
import VueAxios from 'vue-axios'
import qs from 'qs'
import apiConfig from '../config/api.config.js'
axios.defaults.baseURL = apiConfig.baseUrl;
Vue.prototype.$axios = axios;
Vue.prototype.qs = qs;
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
