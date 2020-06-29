import Vue from 'vue'
import App from './App.vue'

//在main.js中引入js和css(Element-ui)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Axios from 'axios'

//让vue引用Element ui
Vue.use(ElementUI);
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
