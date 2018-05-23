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
          <img v-lazy="banner.image" width="100%"/>
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
    <!--adbanner area-->
    <div>
      <img v-lazy="adBanner" width="100%" />
    </div>
    <!--Recommend goods area-->
    <div class="recommend-area">
       <div class="recommend-title">商品推荐</div>
       <div class="recommend-body">
         <swiper :options="swiperOption">
           <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
             <div class="recommend-item">
               <img :src="item.image" width="80%">
               <div>{{item.goodsName}}</div>
               <div>￥{{item.price}}(￥{{item.mallPrice}})</div>
             </div>
           </swiper-slide>
         </swiper>
       </div>
    </div>
    <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>
    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
              <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import 'swiper/dist/css/swiper.css'
  import {swiper , swiperSlide} from 'vue-awesome-swiper'
  import floorComponent from '@/components/component/floorComponent'
  import goodsInfo from '@/components/component/goodsInfoComponent'

  export default {
    data () {
      return {
        swiperOption:{
          slidesPerView:3
        },
        locationIcon: require('../../assets/images/location.png'),
        category: [],
        bannerPicArray:[],
        adBanner:'',
        recommendGoods:[],
        floor1:[],
        floor2:[],
        floor3:[],
        floorName:{},
        hotGoods: [] // 热门商品
      }
    },
    created () {
      axios({
        url: 'https://www.easy-mock.com/mock/5afd3e25e4be0e33b37f5fd9/smile-vue/index',
        method: 'get'
      })
        .then((response => {
          console.log(response)
          if(response.status == 200){
            this.category = response.data.data.category
            this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS
            this.bannerPicArray= response.data.data.slides
            this.recommendGoods = response.data.data.recommend
            this.floor1 = response.data.data.floor1
            this.floor2 = response.data.data.floor2
            this.floor3 = response.data.data.floor3
            this.floorName = response.data.data.floorName
            this.hotGoods = response.data.data.hotGoods           //热卖商品
          }
        }))
    },
    components: {
      swiper,
      swiperSlide,
      floorComponent,
      goodsInfo
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
  .recommend-area
    background-color: #fff;
    margin-top: .3rem;
    .recommend-title
      border-bottom:1px solid #eee;
      font-size:14px;
      padding:.2rem;
      color:#e5017d;
    .recommend-body
      border-bottom:1px solid #eee;
      .recommend-item
        width:99%;
        border-right:1px solid #eee;
        font-size:12px;
        text-align: center;
  .hot-area
    text-align: center;
    font-size:14px;
    height: 1.8rem;
    line-height:1.8rem;
</style>
