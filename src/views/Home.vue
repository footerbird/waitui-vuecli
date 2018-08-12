<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <swiper :list="swiper_list" v-model="swiper_index" @on-index-change="swiper_onIndexChange"></swiper>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { Swiper } from 'vux'

const swiperList = [{
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/5.jpg', // 404
  title: '送你一次旅行',
  fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
}]

export default {
  name: 'home',
  components: {
    HelloWorld,
    Swiper
  },
  data () {
    return {
      swiper_list: swiperList,
      swiper_index: 0
    }
  },
  methods: {
    swiper_onIndexChange (index) {
      this.swiper_index = index
    }
  }
}
</script>
