<template>
<div style="height: 100%;">
    <div class="container" style="padding-bottom: 50px;">
        <div class="weui-panel weui-panel_access article-list" style="margin-top: 0;">
            <div class="weui-panel__bd">
                <template v-for="(article, index) in articleList">
                    <router-link to="/" class="weui-media-box weui-media-box_appmsg">
                        <div class="weui-media-box__bd">
                            <h4 class="weui-media-box__title">{{article.article_title}}</h4>
                            <p class="weui-media-box__desc">{{article.article_tag}}&nbsp;&nbsp;{{article.create_time}}</p>
                        </div>
                        <div class="weui-media-box__hd">
                            <img class="weui-media-box__thumb" :src="article.thumb_path">
                        </div>
                    </router-link>
                </template>
            </div>
        </div>
    </div>
    <tabbar path="article_list"></tabbar>
</div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'

export default {
    name: 'article_list',
    components: {
        Tabbar
    },
    data () {
        return {
            articleList: [],
            article_page: 1,//10条一页，每次加载10条
        }
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    mounted() {
        this.$http
        .post('/api/get_articleAjax',this.$qs.stringify({
            page: this.article_page
        }))
        .then(({data}) => {
            let articleList = this.articleList;
            articleList.push.apply(articleList,data.article_list);
        })
    },
    methods: {
        
    }
}
</script>

<style lang="less" scoped="scoped">
@import '../assets/less/varible.less';
/*头条列表*/
.article-list{
    .weui-media-box_appmsg{
        .weui-media-box__bd{
            .weui-media-box__title{
                display: -webkit-box;
                height: 1.2rem;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 18px;
                font-weight: 600;
                color: #3d464d;
                white-space: initial;
                margin-bottom: .2rem;
            }
        }
        .weui-media-box__hd{
            width: 2.2rem;
            height: 1.6rem;
            line-height: 1.6rem;
            margin-left: .8em;
            margin-right: 0;
            .weui-media-box__thumb{
                height: 100%;
            }
        }
    }
}
</style>