<template>
  <div class="countent">
    <van-nav-bar @click-left="onClickLeft" title="我的消息" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-grid>
      <van-grid-item class="good" icon="good-job" text="赞与收藏" />
      <van-grid-item class="chat" icon="chat" text="评论" />
      <van-grid-item class="like" icon="like" text="新增关注" />
    </van-grid>
    <van-cell-group>
      <van-cell icon="label" title="公告" label="#你希望那本小说出番外#" />
    </van-cell-group>
    <van-cell-group>
      <van-cell icon="bell" title="好书情报局" label="你喜欢你的老师吗" />
    </van-cell-group>
    <van-cell-group>
      <van-cell icon="wap-home" title="福利社" label="端午福利  限时二天" />
    </van-cell-group>
  </div>
</template>




<script>
export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      history.go(-1)
    }
  }
};
</script>



<style lang="scss" scoped>
.countent {
  /deep/.van-nav-bar__left {
    font-size: 16px;
    .van-icon{
        color: #d52b2b;
    } 
    .van-nav-bar__text {
      color: #d52b2b;
    }
  }
  /deep/.van-nav-bar__title{
      font-size: 16px;
      font-weight: bold;
  }
  .van-grid {
    height: 150px;
    /deep/.van-grid-item {
      flex-basis: 33% !important;
      .van-grid-item__text {
        font-size: 16px;
      }
      .van-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 30px;
        background-color: #57bdeb;
        color: white;
        text-align: center;
        line-height: 50px;
      }
    }
  }
  .van-cell {
    width: 100%;
    height: 100px;
    .van-icon {
      font-size: 20px;
      color: #f14b4a;
    }
    span {
      font-size: 20px;
      font-weight: bold;
    }
    .van-cell__label {
      font-size: 16px;
      margin-top: 10px;
    }
  }
}
</style>