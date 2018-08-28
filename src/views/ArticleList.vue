<template>
<div style="height: 100%;">
    <div class="container" id="article_container" style="padding-bottom: 50px;">
        <div class="weui-panel weui-panel_access article-list" style="margin-top: 0;">
            <div class="weui-panel__bd">
                <template v-for="(article, index) in article_list">
                    <router-link :to="'/article_detail/'+article.article_id" class="weui-media-box weui-media-box_appmsg" :key="index">
                        <div class="weui-media-box__bd">
                            <h4 class="weui-media-box__title">{{article.article_title}}</h4>
                            <p class="weui-media-box__desc">{{article.article_tag}}&nbsp;&nbsp;{{article.create_time}}</p>
                        </div>
                        <div class="weui-media-box__hd">
                            <img class="weui-media-box__thumb" v-lazy="article.thumb_path">
                        </div>
                    </router-link>
                </template>
            </div>
        </div>
        <load-more v-if="article_loadnone" :show-loading="false" :tip="'喂喂，你触碰到我的底线了'"></load-more>
        <load-more v-else :tip="'正在加载'"></load-more>
    </div>
    <tabbar path="article_list"></tabbar>
</div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
import LoadMore from 'vux/src/components/load-more/index.vue'

export default {
    name: 'article_list',
    components: {
        Tabbar,
        LoadMore
    },
    data () {
        return {
            article_list: [],
            article_page: 1,//10条一页，每次加载10条
            article_loading: false,
            article_loadnone: false
        }
    },
    computed: {
        swiper () {
            return this.$refs.mySwiper.swiper
        }
    },
    mounted() {
        let that = this;
        that.$http
        .post('/api/get_articleAjax',that.$qs.stringify({
            page: that.article_page
        }))
        .then(({data}) => {
            let article_list = that.article_list;
            article_list.push.apply(article_list,data.article_list);
        })
        
        let container = document.getElementById('article_container');
        container.addEventListener('scroll',function(){
            let scrollTop = container.scrollTop;
            let clientHeight = container.clientHeight;
            let scrollHeight = container.scrollHeight;
            if(scrollTop + clientHeight + 20 < scrollHeight) return;
            if(that.article_loadnone) return;
            if(that.article_loading) return;
            that.article_loading = true;
            that.$http
            .post('/api/get_articleAjax',that.$qs.stringify({
                page: that.article_page+1
            }))
            .then(({data}) => {
                let article_list = that.article_list;
                article_list.push.apply(article_list,data.article_list);
                that.article_page++;
                that.article_loading = false;
                if(data.article_list.length < 10){
                    that.article_loadnone = true;
                }
            })
        })
    },
    methods: {
        
    }
}
</script>

<style lang="less" scoped="scoped">
@import '~@/assets/less/varible.less';
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