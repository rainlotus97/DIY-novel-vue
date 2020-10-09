<template>
  <div class="container">
    <nav-bar key="nav1">
      <div class="nav-left" slot="left-item" @click="back">
        <i class="iconfont icon-xiaoyuhao icon-back"></i>
        <span class="back">返回</span>
      </div>
      <span slot="center-item" class="title">意见反馈</span>
    </nav-bar>
    <div class="problem" v-show="!flag">
      <div class="feedmsg">
        <div class="title" key="problem">常见问题</div>
        <div
          class="list"
          v-for="(item, index) in feedback"
          :key="index"
          @click="listdetail(index)"
        >
          <span>{{ item.title }}</span>
          <i class="iconfont icon-dayuhao"></i>
        </div>
      </div>
      <div class="feedmsg">
        <div class="title">你在什么地方遇到问题啦</div>
        <div
          class="list"
          v-for="(item, index) in whereProblem"
          :key="index"
          @click="whereproblem(index)"
        >
          <span>{{ item.title }}</span>
          <i class="iconfont icon-dayuhao"></i>
        </div>
      </div>
        <div class="bg"></div>
      <div class="kefu" @click="kefu">
           <i class="iconfont icon-kefu"></i>
           <span>在线客服</span>
      </div>
    </div>
    <transition name="drawLeft">
      <div class="booklist" v-show="flag">
        <nav-bar key="nav2">
          <div class="nav-left" slot="left-item" @click="back2">
            <i class="iconfont icon-xiaoyuhao icon-back"></i>
            <span class="back">返回</span>
          </div>
          <span slot="center-item" class="title">意见反馈</span>
        </nav-bar>
        <div class="detail" v-for="(item, index) in feedback" :key="item.title">
          <div v-if="index === currentIndex">
            <h2>{{ item.title }}</h2>
            <p v-for="value in item.content" :key="value">{{ value }}</p>
          </div>
        </div>
        <div
          class="feedmsg2"
          v-for="(item, index) in whereProblem"
          :key="index"
        >
          <div v-if="index === currentIndex2">
            <div class="title" key="problem2">常见问题</div>
            <div class="list" v-for="value in item.content" :key="value" @click="tofather(index)">
              <span>{{ value }}</span>
              <i class="iconfont icon-dayuhao"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import NavBar from "@/components/navBar/NavBar";
import { feedback, whereProblem } from "@/tools/feedback.js";
export default {
  name: "feedback",
  data() {
    return {
      flag: false,
      feedback,
      whereProblem,
      currentIndex: -1,
      currentIndex2: -1,
    };
  },
  created() {
    //   console.log(this.feedback);
  },
  methods: {
    // 返回上一页
    back() {
      this.$router.go(-1);
    },
    back2() {
      this.flag = false;
    },
    listdetail(index) {
      this.currentIndex = index;
      this.flag = true;
      this.currentIndex2 = -1;
    },
    whereproblem(index) {
      this.currentIndex2 = index;
      this.flag = true;
      this.currentIndex = -1;
    },
    tofather(index){
        this.currentIndex = index;
        this.currentIndex2 = -1;
    },
    kefu(){
        this.$toast("请联系我们客服电话：13888888888！")
    }
  },
  components: {
    NavBar,
  },
};
</script>

<style lang="scss" scoped>
@import url(//at.alicdn.com/t/font_2074924_xz91amjaa3.css);
/deep/ #nav-bar {
  justify-content: center;
  z-index: 2;
  background-color: #fff;
}
/deep/ .left {
  width: 80px !important;
}
/deep/ .right {
  width: 80px !important;
  display: block !important;
}
/deep/ .center {
  width: 200px !important;
  text-align: center;
  line-height: 35px;
}
.container {
  padding-bottom: 0 !important;
  overflow: auto !important;
}
.nav-left {
  display: flex;
  align-items: center;
  .icon-back {
    color: #e74949;
    font-size: 18px;
    font-weight: 800;
  }
  .back {
    padding-left: 6px;
    font-size: 14px;
    color: #e74949;
    font-weight: normal;
  }
}
.title {
  font-size: 16px;
  font-weight: bold;
}

.problem {
    position: relative;
  .feedmsg {
    .title {
      width: 100%;
      height: 45px;
      background-color: #d8d8d8;
      line-height: 45px;
      font-weight: normal;
      font-size: 14px;
      padding: 0px 10px;
    }
    .list {
      font-size: 14px;
      padding: 0px 10px;
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #d8d8d8;
      span {
        font-weight: bolder;
      }
      i {
        font-weight: bolder;
        color: #d8d8d8;
      }
    }
  }
  .bg{
      background-color: #d8d8d8;
      width: 100%;
      height: 25px;
  }
  .kefu{
      background-color: #fff;
      position: absolute;
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      i{
          font-size: 26px;
          color: #696969;
        padding-right: 10px;
      }
      span{
          font-size: 16px;
          color: #696969;
      }
  }
}
.feedmsg2 {
  .title {
    width: 100%;
    height: 45px;
    background-color: #d8d8d8;
    line-height: 45px;
    font-weight: normal;
    font-size: 14px;
    padding: 0px 10px;
  }
  .list {
    font-size: 14px;
    padding: 0px 10px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d8d8d8;
    span {
      font-weight: bolder;
    }
    i {
      font-weight: bolder;
      color: #d8d8d8;
    }
  }
}
.detail {
  padding: 0 10px;
  h2 {
    font-size: 26px;
    font-weight: 400;
  }
  p {
    font-size: 14px;
  }
}
</style>