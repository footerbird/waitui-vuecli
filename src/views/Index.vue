<template>
<div style="height: 100%;">
    <div class="container" style="overflow: hidden;">
        <swiper class="index-swiper" :options="swiper_option" ref="mySwiper">
            <swiper-slide class="swiper-item" v-for="(slide, index) in swiper_slides" :key="index">
                <template v-if="slide.ad_type == 'image'">
                    <img class="banner" :src="slide.ad_address" />
                </template>
                <template v-else-if="slide.ad_type == 'iframe'">
                    <iframe class="banner" :src="slide.ad_address" frameborder="0" width="100%" height="100%"></iframe>
                </template>
                <template v-else>
                    <video class="banner" :src="slide.ad_address" :poster="slide.video_poster" type="video/mp4" loop="loop" preload="load" muted webkit-playsinline="true" playsinline="true" x-webkit-airplay="true" x5-video-player-type="h5" x5-video-player-fullscreen="portraint">当前浏览器不支持</video>
                </template>
                <div class="swiper-mask">
                    <div class="author-info">
                        <font class="ad">广告</font>
                        <h4>@{{slide.author_name}}</h4>
                        <p>{{slide.ad_desc}}</p>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
    
    <tabbar path="index"></tabbar>
    <popup-login></popup-login>
    <popup-register></popup-register>
    
</div>
</template>

<script>
// require styles
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Tabbar from '@/components/Tabbar.vue'
import PopupLogin from '@/components/PopupLogin.vue'
import PopupRegister from '@/components/PopupRegister.vue'

export default {
    name: 'index',
    components: {
        swiper,
        swiperSlide,
        Tabbar,
        PopupLogin,
        PopupRegister
    },
    data () {
        return {
            swiper_option: {
                effect: 'coverflow',
                speed: 500,
                direction: 'vertical',
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows : true
                },
                slidesPerView: 1,
                mousewheel: true,
                on: {
                    slideNextTransitionStart: ()=>{
                        this.$http
                        .post('/api/get_advertisementAjax',this.$qs.stringify({
                            limit: 1
                        }))
                        .then(({data}) => {
                            let swiper_slides = this.swiper_slides;
                            swiper_slides.push.apply(swiper_slides,data.ad_list);
                        })
                    }
                }
            },
            swiper_slides: []
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
        .post('/api/get_advertisementAjax',that.$qs.stringify({
            limit: 10
        }))
        .then(({data}) => {//ES2015参数解构
            let swiper_slides = that.swiper_slides;
            swiper_slides.push.apply(swiper_slides,data.ad_list);
        })
    },
    methods: {
        
    }
}
</script>

<style lang="less" scoped="scoped">
@import '../assets/less/varible.less';
.index-swiper{
    width: 100%;
    max-width: 640px;
    height: 100%;
    margin: 0 auto;
    background: #1b1b1f;
    .swiper-item {
        width: 100%;
        height: 100%;
        overflow: hidden;
        img.banner{
            width: 100%;
            height: auto;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
        }
        iframe.banner{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
        }
        video.banner{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            object-fit: cover;
        }
        .swiper-mask{
            width: 100%;
            height: 100%;
            position: relative;
            background: -webkit-linear-gradient(top,rgba(0,0,0,.01) 0,rgba(0,0,0,.1) 70%,rgba(0,0,0,.3) 100%);
            overflow: hidden;
            .author-info{
                position: absolute;
                left: 0;
                bottom: 60px;
                width: 100%;
                color: #fff;
            }
            h4{
                font-size: 16px;
                font-weight: normal;
                line-height: 32px;
                padding: 0 15px;
            }
            p{
                font-size: 14px;
                line-height: 20px;
                padding: 0 15px;
            }
            font.ad{
                display: inline-block;
                font-size: 12px;
                color: #fff;
                height: 20px;
                line-height: 21px;
                padding: 0 5px 0 6px;
                background-color: #008dea;
                .border-radius(4px);
                margin-left: 15px;
                margin-bottom: 3px;
            }
        }
    }
}
</style>