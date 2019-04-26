import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Login from './components/login'
import Register from './components/register'
import ListAll from './components/listAll'
import ListOne from './components/listOne'
import BootstrapVue from 'bootstrap-vue'  
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/list-all', name: 'listall', component: ListAll, props: true },
  { path: '/list-one', name: 'listone', component: ListOne, props: true }
];

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
