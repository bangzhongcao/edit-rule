// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'

import 'font-awesome/css/font-awesome.min.css'
import 'common/less/index.less'


Vue.use(ElementUI);
Vue.use(vueResource);
Vue.config.productionTip = false;

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
