<template>
<div class="footer">
    <div class="footer-container" :class="{'footer-container-index':isIndex}">
        <router-link to="/" class="item" :class="{'cur':isIndex}">首页</router-link>
        <router-link to="/article_list" class="item" :class="{'cur':isArticle}">头条</router-link>
        <router-link to="/welfare_list" class="item" :class="{'cur':isWelfare}">发现</router-link>
        <router-link v-if="isLogin" to="/account" class="item" :class="{'cur':isAccount}">我的</router-link>
        <router-link v-else tag="div" to="" @click.native="popupLogin" class="item">我的</router-link>
    </div>
</div>
</template>

<script>
export default {
    props: ['path'],
    computed: {
        isIndex () {
            return this.path === 'index'
        },
        isArticle () {
            return this.path === 'article_list'
        },
        isWelfare () {
            return this.path === 'welfare_list'
        },
        isAccount () {
            return this.path === 'account'
        },
        isLogin () {
            return this.$store.state.userinfo
        }
    },
    methods: {
        popupLogin () {
            this.$store.commit("popupLogin");
        }
    }
}
</script>

<style lang="less" scoped="scoped">
@import '../assets/less/varible.less';
.footer{
    position: absolute;
    z-index: 10;
    bottom: 0;
    left: 0;
    width: 100%;
    .footer-container{
        position: relative;
        height: 50px;
        .display-flex;
        justify-content: space-around;
        .border-box;
        background-color: #fff;
        &:before{
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            height: 1px;
            border-top: 1px solid rgba(0, 0, 0, 0.2);
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
            z-index: 2;
        }
        .item{
            .flex-number;
            font-size: 15px;
            color: #3d464d;
            height: 49px;
            line-height: 49px;
            text-align: center;
            &.cur{
                font-size: 16px;
                color: @base-color;
            }
        }
    }
    .footer-container-index{
        background-color: transparent;
        &:before{
            border-top: 1px solid rgba(255,255,255,.2);
        }
        .item{
            color: #9d9ea0;
            &.cur{
                color: #fff;
            }
        }
    }
}
</style>