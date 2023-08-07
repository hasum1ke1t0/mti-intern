import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import MyPage from '../views/MyPage.vue'
import Recipe from '../views/Recipe.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path:'/login',
      name:"Login",
      component: Login,
      meta:{
        title: 'Login'
      }
    },
    {
      path:'/mypage',
      name: 'MyPage',
      component:MyPage,
      meta:{
        title:'MyPage'
      }
    },
    {
      path:'/recipe',
      name:'Recipe',
      component:Recipe,
      meta:{
        title:'Recipe'
      }
      },
  ]
})

const DEFAULT_TITLE = 'TITLE';

router.afterEach((to) => {
  document.title = to.meta.title ?? DEFAULT_TITLE
})

export default router
