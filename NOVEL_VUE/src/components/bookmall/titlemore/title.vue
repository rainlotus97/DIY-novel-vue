<template>
  <div id="title">
    <div class="left">
      <slot name="left-title"></slot>
    </div>
    <div class="right" @click="jump">
      <slot name="right-title"></slot>
      <img class="jiantou" src="@/assets/images/jiantou/dayu.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'titlemore',
  created(){
    
  },
  methods:{
    jump(){
      this.$router.push(`/rank`)
    }
  }
};
</script>

<style lang="scss" scoped>
    #title{
        width: 100%;
        height: 50px;
        .left{
            float: left;
            text-align: left;
            width: 50%;
            height: 100%;
            line-height: 50px;
            font-size: 18px;
            font-weight: bolder;
            padding-left: 25px;
        }
        .right{
            position: relative;
            float: right;
            line-height: 50px;
            text-align: right;
            width: 50%;
            height: 100%;
            padding-right: 25px;
            font-size: 12px;
            color: #bfbfbf;
            .jiantou{
                width: 13px;
                height: 13px;
                position: absolute;
                right: 10px;
                top: 17px;
            }
        }
    }
</style>