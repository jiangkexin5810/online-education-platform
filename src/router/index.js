import Vue from 'vue'
import VueRouter from 'vue-router'
import UserList from '../components/user/UserList.vue'
import CommentList from '../components/comment/CommentList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/users',
    name: 'users',
    component: UserList
  },
  {
    path: '/course/:id',
    name: 'courseDetail',
    component: () => import('../components/course/CourseDetail.vue'),
    children: [
      {
        path: 'comments',
        name: 'courseComments',
        component: CommentList
      }
    ]
  }
]

export default new VueRouter({
  routes
})