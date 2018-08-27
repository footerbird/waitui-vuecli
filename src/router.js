import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import ArticleList from './views/ArticleList.vue'
import ArticleDetail from './views/ArticleDetail.vue'
import WelfareList from './views/WelfareList.vue'
import WelfareEntry from './views/WelfareEntry.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
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
            path: '/article_detail/:article_id',
            name: 'article_detail',
            component: ArticleDetail
        },
        {
            path: '/welfare_list',
            name: 'welfare_list',
            component: WelfareList
        },
        {
            path: '/welfare_entry',
            name: 'welfare_entry',
            component: WelfareEntry
        }
    ]
})
