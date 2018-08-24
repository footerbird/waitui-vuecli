<template>
<div style="height: 100%;">
    <div class="container" id="welfare_container" style="padding-bottom: 50px;">
        <!--banner图轮播-->
        <swiper class="welfare-swiper" :options="swiper_option" ref="mySwiper">
            <swiper-slide class="swiper-item" v-for="(slide, index) in swiper_slides" :key="index">
                <router-link class="swiper-item-link" tag="div" to="" @click.native="outerLinkTo(slide.href)">
                    <img :src="slide.src" />
                </router-link>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        
        <!--公告头条轮播-->
        <div class="welfare-announce">
            <swiper class="announce-swiper" :options="announce_option" ref="mySwiper">
                <swiper-slide class="swiper-item" v-for="(article, index) in article_list" :key="index">
                    <router-link class="swiper-item-link" to="/article_list">
                        <template v-for="(item, index) in article">
                            <p :key="index"><font>{{item.article_tag}}</font>{{item.article_title}}</p>
                        </template>
                    </router-link>
                </swiper-slide>
            </swiper>
        </div>
        
        <!--专题版块-->
        <div class="welfare-subject">
            <div class="welfare-subject-grids">
                <router-link class="item" to="/welfare_entry"><span style="padding-right: 15px;"><i class="user"></i>新户专享</span></router-link>
                <router-link class="item mid" to="/welfare_entry"><span><i class="fire"></i>新品活动<i class="hot"></i></span></router-link>
                <router-link class="item" to="/welfare_entry"><span style="padding-left: 15px;"><i class="crown"></i>大牌专区</span></router-link>
            </div>
            <div class="welfare-subject-topic">
                <router-link class="brand" tag="div" to="" @click.native="outerLinkTo('https://www.marksmile.com/m')">
                    <div class="title">品牌保护</div>
                    <h2>中国品牌的网络警卫</h2>
                    <h3>让品牌微笑</h3>
                </router-link>
                <div class="brand-flex">
                    <router-link class="domain" tag="div" to="" @click.native="outerLinkTo('http://www.yumi.com/')">
                        <div class="title">域名服务</div>
                        <h2>让网站更好记</h2>
                        <h3>品牌大数据，全网监控</h3>
                    </router-link>
                    <router-link class="mark" tag="div" to="" @click.native="outerLinkTo('http://www.shangbiao.com/')">
                        <div class="title">商标服务</div>
                        <h2>好产品的出路</h2>
                        <h3>一站式商标解决方案</h3>
                    </router-link>
                </div>
            </div>
        </div>
        
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
    <tabbar path="welfare_list"></tabbar>
</div>
</template>

<script>
// require styles
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Tabbar from '@/components/Tabbar.vue'
import LoadMore from 'vux/src/components/load-more/index.vue'

export default {
    name: 'welfare_list',
    components: {
        swiper,
        swiperSlide,
        Tabbar,
        LoadMore
    },
    data () {
        return {
            swiper_option: {
                loop : true,
                autoplay: {
                    delay: 8000,//8秒切换一次
                },
                pagination: {
                    el: '.swiper-pagination',
                }
            },
            announce_option: {
                loop : true,
                autoplay: {
                    delay: 10000,//10秒切换一次
                },
                direction: 'vertical'
            },
            swiper_slides: [
                {
                    src: this.$global.CDN_URL+'/welfare/welfare_banner_1.jpg',
                    href: 'https://www.baidu.com/'
                },
                {
                    src: this.$global.CDN_URL+'/welfare/welfare_banner_2.jpg',
                    href: 'https://www.baidu.com/'
                },
                {
                    src: this.$global.CDN_URL+'/welfare/welfare_banner_3.jpg',
                    href: 'https://www.baidu.com/'
                }
            ],
            article_list: [],
            welfare_list:[]
        }
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    mounted() {
        let that = this;
        that.$http
        .post('/api/get_articleAjax',that.$qs.stringify({
            page: 1
        }))
        .then(({data}) => {
            let article_list = that.article_list;
            let data_list = data.article_list;
            for (let i=0; i<data_list.length; i+=2) {
                let article_slice = data_list.slice(i,i+2);
                article_list.push(article_slice);
            }
        });
        
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
        outerLinkTo(href){
            window.open(href);
        }
    }
}
</script>

<style lang="less" scoped="scoped">
@import '../assets/less/varible.less';
.welfare-swiper{
    display: block;
    width: 100%;
    height: 3.6rem;
    background-color: #fff;
    .swiper-item{
        width: 100%;
        height: 100%;
        .swiper-item-link{
            display: block;
            width: 100%;
            height: 100%;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }
    /deep/.swiper-pagination-bullet{
        background: #fff;
    }
}
.welfare-announce{
    display: block;
    height: 56px;
    padding: 8px 15px 8px 60px;
    background: url(../assets/images/welfare/welfare_announcement.jpg) #fff no-repeat;
    background-size: 40px;
    background-position: 10px center;
    .border-box;
    .announce-swiper{
        width: 100%;
        height: 100%;
        .swiper-item{
            width: 100%;
            height: 100%;
            .swiper-item-link{
                display: block;
                width: 100%;
                height: 100%;
                font-size: 13px;
                color: #3d464d;
                p{
                    overflow: hidden;
                    white-space: nowrap;
                    line-height: 20px;
                    font{
                        color: @base-color;
                        padding-right: 10px;
                    }
                }
            }
        }
    }
}
.welfare-subject{
    margin-top: 15px;
    background-color: #fff;
    padding: 0 15px;
    .welfare-subject-grids{
        .display-flex;
        position: relative;
        &:after{
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            border-bottom: 1px solid #f0f0f0;
            -webkit-transform-origin: 0 0;
            transform-origin: 0 0;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
        }
        .item{
            .flex-number;
            position: relative;
            line-height: 70px;
            text-align: center;
            font-family: PingFang SC Bold;
            font-size: 14px;
            font-weight: bold;
            color: #333;
            i.user{
                display: inline-block;
                width: 18px;
                height: 18px;
                background: url(../assets/images/welfare/welfare_subject_user.png) no-repeat;
                background-size: 100% 100%;
                vertical-align: -4px;
                margin-right: 8px;
            }
            i.fire{
                display: inline-block;
                width: 18px;
                height: 18px;
                background: url(../assets/images/welfare/welfare_subject_fire.png) no-repeat;
                background-size: 100% 100%;
                vertical-align: -4px;
                margin-right: 8px;
            }
            i.crown{
                display: inline-block;
                width: 18px;
                height: 18px;
                background: url(../assets/images/welfare/welfare_subject_crown.png) no-repeat;
                background-size: 100% 100%;
                vertical-align: -4px;
                margin-right: 8px;
            }
            i.hot{
                position: absolute;
                left: 48px;
                top: 6px;
                width: 32px;
                height: 18px;
                background: url(../assets/images/welfare/welfare_subject_hot.png) no-repeat;
                background-size: 100% 100%;
            }
            &.mid{
                .flex-number(1.1);
                &:before{
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 50%;
                    width: 1px;
                    height: 30px;
                    background-color: #f1f1f1;
                    margin-top: -15px;
                    -webkit-transform-origin: center center;
                    transform-origin: center center;
                    -webkit-transform: scaleY(0.5);
                    transform: scaleY(0.5);
                }
                &:after{
                    content: '';
                    position: absolute;
                    right: 0;
                    top: 50%;
                    width: 1px;
                    height: 30px;
                    background-color: #f1f1f1;
                    margin-top: -15px;
                    -webkit-transform-origin: center center;
                    transform-origin: center center;
                    -webkit-transform: scaleY(0.5);
                    transform: scaleY(0.5);
                }
            }
        }
    }
    .welfare-subject-topic{
        .display-flex;
        padding: 12px 0;
        h2{
            font-family: PingFang SC Bold;
            font-size: 15px;
            font-weight: bold;
            color: #333;
            padding-left: 10px;
        }
        h3{
            font-family: PingFang SC;
            font-size: 11px;
            font-weight: normal;
            color: #999;
            padding-left: 10px;
        }
        .brand{
            display: block;
            .flex-number;
            position: relative;
            padding-top: 22px;
            .border-box;
            background: url(../assets/images/welfare/welfare_topic_brand.png) #fbfbfb no-repeat;
            background-position: right bottom;
            background-size: 100% auto;
            .title{
                position: absolute;
                top: 0;
                left: 10px;
                font-size: 10px;
                color: #fff;
                background-color: #ff8c65;
                height: 21px;
                line-height: 22px;
                padding: 0 6px;
            }
        }
        .brand-flex{
            width: 54%;
            margin-left: 5px;
            .domain{
                display: block;
                height: 70px;
                position: relative;
                margin-bottom: 5px;
                padding-top: 22px;
                .border-box;
                background: url(../assets/images/welfare/welfare_topic_domain.png) #fbfbfb no-repeat;
                background-position: right center;
                background-size: auto 80%;
                .title{
                    position: absolute;
                    top: 0;
                    left: 10px;
                    font-size: 10px;
                    color: #fff;
                    background-color: #ffc557;
                    height: 21px;
                    line-height: 22px;
                    padding: 0 6px;
                }
            }
            .mark{
                display: block;
                height: 70px;
                position: relative;
                padding-top: 22px;
                .border-box;
                background: url(../assets/images/welfare/welfare_topic_mark.png) #fbfbfb no-repeat;
                background-position: right center;
                background-size: auto 100%;
                .title{
                    position: absolute;
                    top: 0;
                    left: 10px;
                    font-size: 10px;
                    color: #fff;
                    background-color: #4dacf0;
                    height: 21px;
                    line-height: 22px;
                    padding: 0 6px;
                }
            }
        }
    }
}
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