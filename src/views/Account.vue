<template>
<div style="height: 100%;">
    <div class="container" style="padding-bottom: 50px;">
        
        <div v-transfer-dom v-if="page_loading">
            <loading :show="page_loading" text="Loading"></loading>
        </div>
        <template v-else>
        <div class="account-header">
            <a href="javascript:;" class="account-header-sign">挖矿</a>
            <div class="account-header-info">
                <router-link to="" class="account-header-figure">
                    <img :src="userinfo.user_figure" />
                </router-link>
                <div class="account-header-name">
                    <h4><router-link to="">{{userinfo.user_name}}</router-link></h4>
                    <p><router-link to="">点击查看或编辑个人信息</router-link></p>
                </div>
            </div>
            <div class="account-header-tab">
                <router-link to="">
                    <h4>{{userinfo.user_balance}}</h4>
                    <p>钱包</p>
                </router-link>
                <router-link to="">
                    <h4>{{msg_count}}</h4>
                    <p>消息</p>
                </router-link>
                <router-link to="">
                    <h4>{{userinfo.user_score}}</h4>
                    <p>W币</p>
                </router-link>
            </div>
        </div>
        
        <div class="weui-cells" style="margin-top: 15px;">
            <router-link to="" class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <p>任务</p>
                </div>
                <div class="weui-cell__ft">10</div>
            </router-link>
            <router-link to="" class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <p>商城</p>
                </div>
                <div class="weui-cell__ft">即将开放</div>
            </router-link>
        </div>
        
        <div class="weui-cells" style="margin-top: 15px;">
            <router-link to="" class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <p>关于我们</p>
                </div>
                <div class="weui-cell__ft"></div>
            </router-link>
            <router-link to="" class="weui-cell weui-cell_access">
                <div class="weui-cell__bd">
                    <p>用户协议</p>
                </div>
                <div class="weui-cell__ft"></div>
            </router-link>
        </div>
        
        <div class="weui-cells" style="margin-top: 15px;">
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="logout">
                <div class="weui-cell__bd">
                    <p style="text-align: center; color: #f9907e;">退出登录</p>
                </div>
            </a>
        </div>
        </template>
        
    </div>
    
    <tabbar path="account"></tabbar>
    
</div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
import Loading from 'vux/src/components/loading/index.vue'

export default {
    name: 'account',
    components: {
        Tabbar,
        Loading
    },
    data () {
        return {
            userinfo: undefined,
            msg_count: 0
        }
    },
    computed: {
        page_loading(){
            return (this.userinfo == undefined)?true:false;
        }
    },
    mounted() {
        let that = this;
        setTimeout(function(){
            that.userinfo = {
                user_figure: 'http://140.143.5.238/uploads/images/figure/figure_39f8cb909905d21130d4175779520458.jpg',
                user_name: '18767120068',
                user_balance: '0.00',
                user_score: 11
            };
        },3000)
    },
    methods: {
        logout () {
            this.$store.commit("logout");
            this.$router.push({ path: '/' });
        }
    }
}
</script>

<style lang="less" scoped="scoped">
@import '~@/assets/less/varible.less';

.account-header{
    position: relative;
    background-color: #fff;
    padding-bottom: 10px;
    &:after{
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #E5E5E5;
        color: #E5E5E5;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
    .account-header-sign{
        position: absolute;
        top: 40px;
        right: 20px;
        font-size: 14px;
        color: #ffc200;
        line-height: 32px;
        padding-left: 28px;
        background: url(~@/assets/images/account-header-sign.png) no-repeat;
        background-size: 24px;
        background-position: 0 center;
        &:after{
            content: "";
            position: absolute;
            right: -8px;
            top: 14px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: #ffc200;
        }
    }
    .account-header-info{
        .display-flex;
        padding: 30px 30px 15px 30px;
        align-items: center;
        .account-header-figure{
            width: 68px;
            height: 68px;
            margin-right: 15px;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }
        .account-header-name{
            .flex-number;
            min-width: 0;
            h4{
                font-size: 18px;
                font-weight: 400;
                color: #333;
                .ellip;
                a{
                    color: #333;
                }
            }
            p{
                font-size: 14px;
                color: #999;
                line-height: 1.4;
                .ellip;
                a{
                    color: #999;
                }
            }
        }
    }
    .account-header-tab{
        .display-flex;
        padding: 15px;
        justify-content: space-between;
        a{
            width: 2rem;
            text-align: center;
            color: #333;
            h4{
                font-size: 16px;
                font-weight: 400;
                color: #333;
            }
            p{
                font-size: 14px;
                color: #999;
                line-height: 1.4;
            }
        }
    }
}
</style>