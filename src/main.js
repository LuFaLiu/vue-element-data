import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import router from './router'
import store from './store'
import i18n from './lang'
import VeLine from 'v-charts/lib/line.common'
import VeMap from 'v-charts/lib/map.common'
import 'zrender/lib/svg/svg'
import 'v-charts/lib/style.css'
import moment from 'moment'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VueResource from 'vue-resource'
import { debounce } from '@/utils/debounceUtil'
import 'default-passive-events'
import LangFlag from 'vue-lang-code-flags'
import './static/font/iconfont.css'
import _ from "lodash";

const { mockXHR } = require('../mock')
mockXHR()

Vue.directive('resize',{
  bind(el, binding) {
    if(!!binding.value){
      let width = '', height = '';
      function isReize() {
          const style = document.defaultView.getComputedStyle(el);// In browsers, this property returns the window object associated with the current Document object, or null if not.
          if (width !== style.width || height !== style.height) {
              binding.value({width:style.width,height:style.height});  // Function
          }
          width = style.width;
          height = style.height;
          return width,height;
      }
      el.__vueSetInterval__ = setInterval(isReize, 500);
    }
  },
  unbind(el) {
      clearInterval(el.__vueSetInterval__);
  }
})


// Echarts
const echarts = require('echarts')

Vue.component('lang-flag',LangFlag)
Vue.prototype.$echarts = echarts
Vue.use(Element, { locale })

Vue.use(VueResource)


const chart = [VeLine, VeMap]
chart.forEach(comp => {
  Vue.component(comp.name, comp)
})

// Debounce
const on = Vue.prototype.$on
Vue.prototype.$on = function(event, func) {
  let newFunc = func
  if (event === 'click') {
    newFunc = debounce(func, 800, true)
  }
  on.call(this, event, newFunc)
}

// Utc
Vue.filter('formatDate', function(value) {
  if(value){
    return moment.utc(value).format('yyyy-MM-DD HH:mm:ss');
  }else {
    return '';
  }
})

// Utc prototype
Vue.prototype.$formatDate = function(value) {
  if(value){
    return moment.utc(value).format('yyyy-MM-DD HH:mm:ss');
  }else {
    return '';
  }
}


Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
