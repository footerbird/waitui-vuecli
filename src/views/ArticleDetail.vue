<template>
<div style="height: 100%;">
    <div class="container" id="article_container">
        
        <article class="weui-article">
            <h1 class="article-title">{{article.article_title}}</h1>
            <div class="article-author">
                <img class="article-author-figure" :src="article.figure_path" />
                <span class="article-author-name">{{article.author_name}}</span>
                <span class="article-author-time">{{article.create_time}}</span>
            </div>
            <div class="article-summary">{{article.article_lead}}</div>
            <section v-html="article.article_content"></section>
        </article>
        
    </div>
</div>
</template>

<script>

export default {
    name: 'article_detail',
    data () {
        return {
            article: {}
        }
    },
    mounted() {
        var that = this;
        that.$http
        .post('/api/get_articleDetailAjax',that.$qs.stringify({
            article_id: that.$route.params.article_id
        }))
        .then(({data}) => {
            that.article = data.article;
        })
        
        window.loadHtmlImg = function(){}
    },
    methods: {
        
    }
}
</script>

<style lang="less" scoped="scoped">
@import '../assets/less/varible.less';
/*头条详细页面*/
.weui-article{
    font-size: 18px;
    line-height: 1.8;
    background-color: #fff;
    color: #3d464d;
    .article-title{
        padding: 10px;
        font-size: 22px;
        font-weight: 600;
        text-align: center;
        margin-bottom: .5em;
    }
    .article-author{
        .display-flex;
        line-height: 48px;
        margin-bottom: 20px;
        .article-author-figure{
            display: inline-block;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            margin-left: 15px;
            margin-right: 15px;
        }
        .article-author-name{
            font-size: 16px;
            font-weight: bold;
            margin-right: 15px;
        }
        .article-author-time{
            font-size: 14px;
            color: #999;
        }
    }
    .article-summary{
        position: relative;
        font-size: 16px;
        color: #666;
        padding: 10px 10px 10px 36px;
        background-color: #f7f7f7;
        margin-bottom: 20px;
        &:before{
            position: absolute;
            content: "“";
            font-size: 32px;
            height: 36px;
            top: 5px;
            left: 10px;
        }
    }
    section{
        /deep/p{
            margin: 0 0 1em;
        }
        /deep/h2{
            font-size: 20px;
            font-weight: 600;
        }
        /deep/h3{
            font-size: 18px;
            font-weight: 600;
        }
        /deep/a{
            color: #3d464d !important;
            border-style: solid;
            border-width: 0 0 1px;
            border-color: #999;
            padding: 0 0 1px;
            word-break: break-word;
        }
    }
}
</style>