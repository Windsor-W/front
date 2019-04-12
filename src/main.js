// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 引入element-ui样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 使用element-ui样式
Vue.use(ElementUI);

//引入router
import Router from 'vue-router'
Vue.use(Router);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h=>h(App),
  /*
  components: { App },
  template: '<App/>'
  */
})
