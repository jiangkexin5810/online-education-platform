import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import UserList from './components/user/UserList.vue'
import UserDetail from './components/user/UserDetail.vue'

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/users'
    },
    {
      path: '/users',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/users/:id',
      name: 'UserDetail',
      component: UserDetail,
      props: true
    }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')