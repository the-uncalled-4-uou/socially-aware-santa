import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Login from './components/login'
import Register from './components/register'
import ListAll from './components/listAll'
import ListOne from './components/listOne'

Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/list-all', component: ListAll },
  { path: '/list-one', component: ListOne}
];

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
