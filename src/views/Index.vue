<template>
  <swiper class="swiper-box" :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
    <swiper-slide class="swiper-item" v-for="(slide, index) in swiperSlides" :key="index">
      <img class="banner" :src="slide.img" />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
// require styles
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'home',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        direction: 'vertical',
        effect: 'coverflow',
        slidesPerView: 1,
        mousewheel: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      swiperSlides: [{
        url: 'javascript:',
        img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
        title: '送你一朵fua'
      }, {
        url: 'javascript:',
        img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
        title: '送你一辆车'
      }, {
        url: 'javascript:',
        img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg',
        title: '送你一次旅行'
      }]
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    this.$http
    .post('/api/get_advertisementAjaxImage',this.$qs.stringify({
      limit: 10
    }))
    .then(({data}) => {
      console.log(data)
    })
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
//  console.log('this is current swiper instance object', this.swiper)
//  this.swiper.slideTo(3, 1000, false)
//  setInterval(() => {
//    console.log('simulate async data')
//    if (this.swiperSlides.length < 10) {
//      this.swiperSlides.push({
//        url: 'javascript:',
//        img: 'https://waituidev-1256656797.cos.ap-beijing.myqcloud.com/advert/IMG_1430.jpg',
//        title: '送你一次旅行'
//      })
//    }
//  }, 3000)
    
  },
  methods: {
    callback: function(){
      
    }
  }
}
</script>

<style lang="less" scoped="scoped">
.swiper-box {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  .swiper-item {
    width: 100%;
    height: 100%;
    background: #1b1b1f;
    overflow: hidden;
    img.banner{
      width: 100%;
      height: auto;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }
}
</style>