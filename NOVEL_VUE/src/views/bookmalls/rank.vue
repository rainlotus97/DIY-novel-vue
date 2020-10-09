<template>
  <div id="rankpage">
    <van-nav-bar title="排行" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="top">
      <div class="topimg">
        <img
          src="https://plf-new.zhuishushenqi.com/management/images/20200401/8a45c79d0d6c4f03998354c29d57f3d8.jpg"
          alt
        />
      </div>
      <div class="topimg">
        <img
          src="https://plf-new.zhuishushenqi.com/management/images/20200401/4dbefb1ece5a44c8979dedd5cb78164d.png"
          alt
        />
      </div>
    </div>
    <div class="tabs">
      <van-tabs type="line" v-model="active" animated swipeable>
        <van-tab title="男频">
          <rankpage v-bind:cactive="active"></rankpage>
        </van-tab>
        <van-tab title="女频">
          <rankpage v-bind:cactive="active"></rankpage>
        </van-tab>
        <van-tab title="出版">
          <rankpage v-bind:cactive="active"></rankpage>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import rankpage from "@/views/bookmalls/ranksdetail/rankpage";
export default {
  data() {
    return {
      active: 0
    };
  },
  components: {
    rankpage
  },
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      history.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
#rankpage {
  /deep/.van-nav-bar {
    background-color: #ce5655;
    .van-nav-bar__left {
      .van-icon {
        color: #fff;
        font-size: 24px;
        font-weight: bolder;
      }
      .van-nav-bar__text {
        color: #fff;
        font-size: 16px;
      }
    }
    .van-nav-bar__title {
      color: #fff;
      font-size: 20px;
      font-weight: 550;
    }
  }
  .top {
    width: 96%;
    margin: 10px auto 0;
    .topimg {
      width: 165px;
      border-radius: 5px;
      margin: 10px 8px;
      float: left;
      img {
        width: 165px;
        border-radius: 5px;
        box-shadow: 1px 1px 3px 3px #b6b4b4;
      }
    }
    .topimg:nth-of-type(2n) {
      margin-right: 0;
    }
  }
  .top::after {
    display: table;
    content: "";
    clear: both;
  }
  .tabs {
    /deep/.van-tab {
      font-size: 16px;
      font-weight: bolder;
    }
    /deep/.van-tab--active {
      font-size: 18px;
      font-weight: bolder;
      color: #f16968;
    }
  }
}
</style>
