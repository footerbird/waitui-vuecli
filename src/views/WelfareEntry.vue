<template>
<div style="height: 100%;">
    <div class="container" id="welfare_container">
        
        <!--活动列表-->
        <div class="welfare-list">
            <template v-for="(welfare, index) in welfare_list">
                <router-link tag="div" to="" class="welfare-item" @click.native="outerLinkTo(welfare.welfare_link)" :key="index">
                    <img v-lazy="welfare.welfare_banner" />
                    <div class="welfare-item-bottom">
                        <div class="welfare-item-title">{{welfare.welfare_title}}</div>
                        <div class="welfare-item-time">{{welfare.create_time}}</div>
                    </div>
                </router-link>
            </template>
        </div>
        
        <load-more :show-loading="false" :tip="'喂喂，你触碰到我的底线了'"></load-more>
        
    </div>
</div>
</template>

<script>
import LoadMore from 'vux/src/components/load-more/index.vue'

export default {
    name: 'welfare_entry',
    components: {
        LoadMore
    },
    data () {
        return {
            welfare_list:[]
        }
    },
    computed: {
        
    },
    mounted() {
        var that = this;
        that.$http
        .post('/api/get_welfareAjax')
        .then(({data}) => {
            let welfare_list = that.welfare_list;
            welfare_list.push.apply(welfare_list,data.welfare_list);
            that.$nextTick(function(){
                //数据渲染完以后执行
            })
        });
    },
    methods: {
        outerLinkTo: function(href){
            window.open(href);
        }
    }
}
</script>

<style lang="less" scoped="scoped">
@import '../assets/less/varible.less';

.welfare-list{
    display: block;
    .welfare-item{
        display: block;
        margin: 15px 15px 0 15px;
        .border-radius(4px);
        background-color: #fff;
        img{
            width: 100%;
            height: 3.45rem;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
        }
        .welfare-item-bottom{
            .display-flex;
            justify-content: space-between;
            .welfare-item-title{
                line-height: 47px;
                padding-left: 10px;
                font-size: 16px;
                color: #333;
            }
            .welfare-item-time{
                line-height: 47px;
                padding-right: 15px;
                font-size: 13px;
                color: #b2b2b8;
            }
        }
    }
}
</style>