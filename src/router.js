import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import ArticleList from './views/ArticleList.vue'
import WelfareList from './views/WelfareList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/article_list',
      name: 'article_list',
      component: ArticleList
    },
    {
      path: '/welfare_list',
      name: 'welfare_list',
      component: WelfareList
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
