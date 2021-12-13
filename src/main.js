import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";
import vuetify from './plugins/vuetify'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')

const token = localStorage.getItem('user-token')
if(token){
  axios.defaults.headers.common['Authorization'] = "Bearer " + token
}
