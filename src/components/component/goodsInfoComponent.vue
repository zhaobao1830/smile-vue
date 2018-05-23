<template>
  <div class="goods-info">
    <div class="goods-image">
      <img v-lazy="goodsImage" width="100%"/>
    </div>
    <div class="goods-name">{{goodsName}}</div>
    <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {toMoney} from '@/filter/moneyFilter.js'
  export default {
    props:['goodsImage','goodsName','goodsPrice'],
    filters:{
      moneyFilter(money){
        return toMoney(money)
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .goods-name
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
</style>
