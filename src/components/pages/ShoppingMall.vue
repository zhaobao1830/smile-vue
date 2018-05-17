<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon" width="80%" class="location-icon"/>
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input"/>
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!--swiper area-->
    <div class="swiper-area">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="( banner, index) in bannerPicArray" :key="index">
          <img v-lazy="banner.imageUrl" width="100%"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--type bar-->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'

  export default {
    data () {
      return {
        locationIcon: require('../../assets/images/location.png'),
        bannerPicArray: [
          {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic001.jpg'},
          {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic002.jpg'},
          {imageUrl:'http://7xjyw1.com1.z0.glb.clouddn.com/simleVueDemoPic003.jpg'},
        ],
        category: []
      }
    },
    created () {
      axios({
        url: 'https://www.easy-mock.com/mock/5afd3e25e4be0e33b37f5fd9/smile-vue/index',
        method: 'get'
      })
        .then((response => {
          console.log(response)
          if(response.status==200){
            this.category=response.data.data.category;
          }
        }))
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .search-bar
    height:2.2rem;
    background-color: #e5017d;
    line-height: 2.2rem;
    overflow: hidden;
    .location-icon
      padding-top: .2rem
      padding-bottom: .3rem
    .search-input
      width: 100%
      height: 1.3rem
      border-top: 0
      border-left:0px;
      border-right:0px;
      border-bottom:1px solid #fff !important;
      background-color: #e5017d;
      color:#fff;
  .swiper-area
    clear:both;
    height:10rem;
    overflow: hidden;
    img
      height: 10rem
  .type-bar
    background-color: #fff;
    margin:0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size:14px;
    display:flex;
    flex-direction:row;
    flex-wrap:nowrap;
    div
      padding:.3rem;
      font-size:12px;
      text-align: center;
</style>
