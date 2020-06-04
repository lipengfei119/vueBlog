import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/homePage'
import Notebooks from '@/views/notebooks'
import Message from '@/views/message'
import Sign_in from '@/views/sign_in'
import Sign_up from '@/views/sign_up'
import ArticleDetails from '@/views/articleDetails'
import Settings from '@/views/settings'
import Search from '@/views/search'
import MyPage from '@/views/myPage'
Vue.use(VueRouter)

  const routes = [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/home',
      component:HomePage

    },
    {
      path:'/notebooks',
      component:Notebooks

    },
    {
      path:'/message',
      component:Message
    },
    {
      path:'/sign_in',
      component:Sign_in
    },
    {
      path:'/sign_up',
      component:Sign_up
    },
    {
      path:'/articleDetails/:id',
      component:ArticleDetails
    },
    {
      path:'/settings',
      component:Settings
    },
    {
      path:'/search/:input',
      component:Search
    },
    {
      path:'/myPage',
      component:MyPage
    }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
