import Vue from 'vue'
import VueRouter from 'vue-router'
import UserList from '../components/user/UserList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/users',
    name: 'users',
    component: UserList
  }
]

export default new VueRouter({
  routes
})