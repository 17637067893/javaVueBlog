import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'

import { request, get, post, postFile, postOfGet } from "./until/http";


Vue.prototype.$post=post
Vue.prototype.$get=get

Vue.use(Antd);

new Vue({
  router,
  store,
  render: h => h(App),
  data(){
    return {
      value:"789"
    }
  }
}).$mount('#app')

