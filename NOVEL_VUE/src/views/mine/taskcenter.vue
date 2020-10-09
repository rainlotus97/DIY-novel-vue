<template>
  <div class="container">
    <!-- 头部 -->
    <nav-bar key="nav1">
      <div class="nav-left" slot="left-item" @click="back">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <span slot="center-item" class="title">任务中心</span>
    </nav-bar>
    <!--第二部分  -->
    <div class="main">
      <!-- 头部获取金币 -->
      <div class="head">
        <div class="coin">
          <div class="lint">
            <span>我的金币</span>
            <span>查看明细</span>
            <span>&gt;</span>
          </div>
          <div class="right">
            <button class="convert">兑换/提现</button>
          </div>
        </div>
        <div class="money">500</div>
        <div class="profit">
          <span>昨日收益0金币</span>
          <span></span>
          <span>累计收益500金币</span>
        </div>
      </div>
      <!-- 我的任务 -->
      <div class="task">
        <div class="mytask">
          <i class="iconfont icon-my"></i>
          <span>我的任务</span>
        </div>
      </div>
      <div class="collar border-image-clip-path">
        <div class="fath">
          <div class="video">
            <div class="look">
              <span>看视频，领书卷</span>
              <span>0/5</span>
            </div>
            <div class="limit">20书券、每日限量</div>
          </div>
          <div class="goReceive">
            <button>去领取</button>
          </div>
        </div>
      </div>
      <!-- 第一次加书架 -->
      <div class="first"  v-for="(item,index) in task" :key="index">
        <div class="kuai">
          <!-- 左边部分 -->
          <div class="zlt">
            <div class="add">
              <span>{{item.title}}</span>
              <span v-if="item.block!=''">{{item.block}}</span>
              <span v-else>新手</span>
              <span>&gt;</span>
            </div>
            <div class="bookv">
              <div class="voucher">
                <i class="iconfont icon-fenxianghuoshuquan sj"></i>
                <span>{{item.voucher}}书券</span>
              </div>
              <div class="bcoin">
                <i class="iconfont icon-jinbi jb"></i>
                <span v-if="item.gold>0">{{item.gold}}金币</span>
                <span v-else>500金币</span>
              </div>
            </div>
          </div>
          <!-- 右边部分 -->
          <div class="goadd">
            <button>{{item.buttonText}}</button>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navBar/NavBar.vue";
import zgaxios from "@/tools/zgaxios";
import { taskcenter } from "@/tools/allApi";
import { log } from 'util';
export default {
  name: "taskcenter",
  data() {
    return {
      task: [],
      
    };
  },
  components: {
    NavBar,
  },
  mounted() {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    async getTask(){
      let result = await  zgaxios("GET",taskcenter)
      this.task = result.data.slice(1,result.data.length)
      // console.log(this.task);
    }

  },
  created() {
    this.getTask()

  },
};
</script>

<style lang="scss" scoped>
@import url(//at.alicdn.com/t/font_2092708_yta10z0iq2.css);
/deep/ #nav-bar {
  justify-content: center;
  z-index: 2;
  background-color: #fff;
}
/deep/ .left {
  width: 40px !important;
  margin-left: 5px !important;
  margin-right: 40px !important;
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
  background-color: #f3f3f3;
  #nav-bar {
    height: 65px;
  }
  .nav-left {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    text-align: left;
    .icon-fanhui {
      color: #696a6c;
      font-size: 25px;
      font-weight: 1000;
    }
  }
  .title {
    font-size: 20px;
    font-weight: bold;
    font-family: "楷体";
  }
  .main {
    background-color: #f7f4f4;
    margin-top: 40px;
    .head {
      width: 92%;
      height: 150px;
      border-radius: 10px;
      background-color: red;
      margin: 0 auto;
      .coin {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 40px;
        .lint {
          width: 150px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: red;
          span {
            &:nth-of-type(1) {
              font-size: 16px;
              color: #feff99;
              margin-left: 20px;
            }
            &:nth-of-type(2) {
              font-size: 12px;
              color: #feff99;
            }
            &:nth-of-type(3) {
              font-size: 12px;
              color: #feff99;
            }
          }
        }
        .right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-right: 20px;
          .convert {
            width: 80px;
            height: 25px;
            border-radius: 30px;
            color: #ffffff;
            background-color: #ef4746;
            border: 1px solid #fff;
            outline: 0;
          }
        }
      }
      .money {
        width: 100%;
        font-size: 40px;
        color: #feff99;
        margin-left: 20px;
      }
      .profit {
        width: 230px;
        margin-left: 20px;
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          &:nth-of-type(1) {
            letter-spacing: 3px;
            color: #feff99;
          }
          &:nth-of-type(2) {
            width: 1px;
            height: 10px;
            background-color: #feff99;
          }
          &:nth-of-type(3) {
            letter-spacing: 3px;
            color: #feff99;
          }
        }
      }
    }
    .task {
      width: 100%;
      .mytask {
        width: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 20px;
        margin-top: 20px;
        i {
          font-size: 20px;
          color: red;
        }
        span {
          font-size: 16px;
          color: #676767;
          font-weight: 800;
        }
      }
    }
    .border-image-clip-path {
      position: relative;
      height: 120px;
      border: 5px solid;
      border-image: linear-gradient(45deg, gold, deeppink) 5;
      clip-path: inset(0 round 10px);
    }
    .collar {
      width: 92%;
      height: 70px;
      background-color: #ffffff;
      border-radius: 10px;
      margin: 10px auto;
      .fath {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .video {
          width: 180px;
          height: 50px;
          flex-direction: column;
          margin-left: 20px;
          margin-top: 10px;
          .look {
            width: 140px;
            height: 25px;
            justify-content: space-between;
            align-items: center;
            span {
              &:nth-of-type(1) {
                font-size: 16px;
                font-weight: 900;
              }
              &:nth-of-type(2) {
                color: #d7d6db;
                margin-left: 7px;
                font-weight: 700;
              }
            }
          }
          .limit {
            width: 100px;
            font-size: 12px;
            color: #ef4746;
          }
        }
        .goReceive {
          button {
            width: 70px;
            height: 30px;
            border-radius: 30px;
            background-color: #fcecec;
            color: #ef4746;
            margin-right: 20px;
            font-size: 14px;
            font-weight: 700;
            border: 0;
            outline: 0;
          }
        }
      }
    }
    .first {
      width: 92%;
      margin: 10px auto;
      background-color: #ffffff;
      border-radius: 10px;
      .kuai {
        margin-bottom: 10px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 80px;
        align-items: center;
        padding: 0px 10px;
        .zlt {
          height: 50px;
          flex-direction: column;

          .add {
            height: 25px;
            display: flex;

            span {
              &:nth-of-type(1) {
                font-size: 15px;
                font-weight: 900;
                color: black;
                font-family: "黑体";
                padding: 0 3px;
              }
              &:nth-of-type(2) {
                display: inline-block;
                background-color: #fcecec;
                color: #ef4747;
                font-size: 8px;
                width: 35px;
                height: 18px;
                border-radius: 18px;
                text-align: center;
                line-height: 18px;
                padding: 0px 5px;
              }
              &:nth-of-type(3){
                font-size: 15px;
                color: #B9B9B9;
                padding: 0 5px;
              }
            }
          }
          .bookv{
            height: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 137px;
            .voucher{
              display: flex;
              align-items: center;
                .sj{
              color: #5FC3F4;
            }
            span{
                font-size: 12px;
                font-weight: 700;
                color: #5FC3F4;
                padding-left: 3px;
            }
            }
          
          }
          .bcoin{
            display: flex;
            align-items: center;
            .jb{
              color: #F6BE35;
            }
            span{
              font-size: 12px;
              font-weight: 700;
              color: #F6BE35;
              padding-left: 3px;
            }
          }
        }
        .goadd{
          button{
            width: 70px;
            height: 30px;
            border-radius: 25px;
            background-color:#FCECEC;
            color: #EF4746;
            font-size: 14px;
            font-weight: 700;
            border: none;
            outline: 0;
          }
        }
      }
    }
  }
}
</style>

