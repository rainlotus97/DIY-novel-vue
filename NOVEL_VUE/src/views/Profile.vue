<template id="Profile">
  <div class="container">
    <!-- 头部 -->
    <div class="top" v-if="!$store.state.status">
      <div class="shezhi">
        <img src="../assets/images/profile/fit.png" />
      </div>
      <div class="login1" @click="login">
        <div class="loginto1">
          <span>登录</span>
          <span class="small">全场免费读</span>
        </div>

        <div class="imglogin">
          <img src="../assets/images/profile/qq.png" />
          <img src="../assets/images/profile/wx.png" />
          <img src="../assets/images/profile/phone.png" />
        </div>
      </div>

      <div class="vip2">
        <div>
          <p @click="login">点击登录</p>
          <p>
            <span>更多权益</span>
            <span>福利登录即可获取</span>
          </p>
        </div>
        <button class="loginBtn" @click="login">立即登录</button>
      </div>
    </div>

    <div class="top" v-else>
      <div class="shezhi">
        <img src="../assets/images/profile/fit.png" />
      </div>
      <div class="login">
        <img class="yh" :src="$store.state.info.data.userpic" />
        <div class="info">
          <div class="userinfo">
            <div class="name">{{ $store.state.info.data.username }}</div>
            <!-- <i class="iconfont icon-chuangxiangqingtongvip" style="color:red;"></i> -->
            <img src="@/assets/images/profile/vip.png" alt="" />
          </div>
          <div class="personal">编辑个人资料</div>
        </div>
      </div>
      <div class="time">
        <span class="t1">阅读13时7分</span>
        <span class="t2">读过{{ length }}本</span>
        <span class="t3">被赞0次</span>
      </div>
      <div class="vip">
        <div class="v-top">
          <div class="v-top2">
            <img src="../assets/images/profile/crown.png" />
            <span>荣耀会员</span>
          </div>
          <button class="v-btn">续费</button>
        </div>
        <div class="new">
          <span>【特惠】新用户8元&nbsp;&nbsp;&nbsp;立即开通></span>
        </div>
      </div>
    </div>

    <div class="main">
      <div class="power">
        <div class="free">
          <p class="ad">免广告</p>
          <p class="as">无广告阅读</p>
          <img class="ap" src="../assets/images/profile/free.png" />
        </div>
        <div class="discount">
          <p class="js">折扣特权</p>
          <p class="jj">付费书籍8折</p>
          <img class="jh" src="../assets/images/profile/discount.png" />
        </div>
        <div class="voice">
          <p class="sl">朗读功能</p>
          <p class="zl">好书读给你听</p>
          <img class="xl" src="../assets/images/profile/voice.png" />
        </div>
      </div>
      <div class="box" v-if="$store.state.status">
        <div class="guanzhu" @click="tohistory">
          <div>
            <i class="iconfont icon-liulanlishi"></i>
          </div>
          <p class="line1">浏览历史</p>
        </div>
        <div class="tiezi">
          <div>
            <i class="iconfont icon-tiezi"></i>
          </div>
          <p class="line2">书评帖子</p>
        </div>
        <div class="shudan">
          <div>
            <i class="iconfont icon-shudan"></i>
          </div>
          <p class="line3">书单</p>
        </div>
      </div>
      <!-- <div class="my" v-if="!$store.state.status">
        <van-icon
          name="manager"
          class="manager"
          color="#54B448"
          size="24px"
          margin-left="20px"
        />
        <h2>我的账户</h2>
        <p>&gt;</p>
      </div> -->
      <div class="my" v-if="$store.state.status">
        <van-icon
          name="manager"
          class="manager"
          color="#54B448"
          size="24px"
          margin-left="20px"
        />
        <h2>我的账户</h2>
        <p>&gt;</p>
      </div>

      <div class="news" @click="toNews">
        <van-icon
          name="new"
          class="new"
          color="#65C9FA"
          size="30px"
          margin-left="20px"
        />
        <h2>我的消息</h2>
        <p>&gt;</p>
      </div>
      <div class="bottom">
        <div class="task" @click="toTask">
          <van-icon name="gift" class="gift" color="#EB4747" size="30px" />
          <h2>任务中心</h2>
          <p>&gt;</p>
        </div>
        <div class="lv">
          <van-icon name="star" class="star" color="#EF4746" size="30px" />
          <h2>我的等级</h2>
          <p>&gt;</p>
        </div>
      </div>
      <div class="Feedback" @click="feedback">
        <van-icon name="warning" class="warning" color="#FE5E3E" size="30px" />
        <h2>意见反馈</h2>
        <p>&gt;</p>
      </div>
      <div class="out" v-show="$store.state.status">
        <button @click="logout" class="logout">退出登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import zgaxios from "@/tools/zgaxios";
import { history, logout } from "@/tools/allApi";
export default {
  name: "Profile",
  data() {
    return {
      length: 0,
    };
  },
  components: {},
  methods: {
    toTask() {
      this.$router.push("/taskcenter");
    },
    async logout() {
      let result = await zgaxios("GET", logout, {
        phone: this.$store.state.info.data.phone,
      });
      if (result.code == "200") {
        let data = 0;
        this.$store.commit("getStatus", data);
        this.$store.commit("getInfo", result);
      } else {
        this.$toast("退出失败！");
      }
    },
    login() {
      this.$router.push("/register");
      // let data = 1;
      // this.$store.commit("getStatus", data);
      // let info = {
      //   code: 200,
      //   msg: "登录成功",
      //   data: {
      //     id: 17,
      //     username: "13063206329",
      //     userpic:
      //       "http://himg.bdimg.com/sys/portrait/item/95fde99d96e584bf32303036c700.jpg",
      //     password: "12345678",
      //     phone: "13063206329",
      //     email: null,
      //     status: "1",
      //     create_time: 1600176258309,
      //     userinfo: {
      //       age: 18,
      //       sex: "2",
      //       job: "未设置",
      //       path: null,
      //       birthday: null,
      //     },
      //   },
      // };
      // this.$store.commit("getInfo", info);
    },
    tohistory() {
      this.$router.push("/history");
    },
    async getHistoryLength() {
      let user_id = this.$store.state.info.data.id;
      let allhistory = await zgaxios("GET", history, {
        user_id,
      });
      if (allhistory.history) {
        this.length = allhistory.history.length;
      }
    },
    feedback() {
      this.$router.push("/feedback");
    },
    toNews() {
      this.$router.push("/new");
    },
  },
  async created() {
    await this.getHistoryLength();
  },
};
</script>

<style lang="scss" scoped>
@import url(//at.alicdn.com/t/font_2092708_pyxre2j2j3g.css);
.container {
  width: 100%;
  padding-top: 0 !important;
  margin: 0 !important;

  .top {
    width: 100%;
    height: 241px;
    background: linear-gradient(to right, #a1c4fd 0%, #c2e9fb 100%);
    border-radius: 100% 100% 100% 100% / 0% 0% 20% 20%;
    .shezhi {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      // margin-top: 10px;
      padding: 5 15px;
      img {
        width: 30px;
        height: 30px;
        margin: 0px 5px;
      }
    }
    .login1 {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      .loginto1 {
        width: 180px;
        height: 30px;
        display: flex;
        align-items: center;
        span {
          &:nth-of-type(1) {
            font-size: 26px;
            color: #ffffff;
            font-weight: 600;
            font-family: "楷体";
          }
          &:nth-of-type(2) {
            font-size: 18px;
            color: #ffffff;
            font-family: "楷体";
            padding-left: 10px;
          }
        }
      }
      .imglogin {
        width: 140px;
        height: 30px;
        display: flex;
        justify-content: space-around;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 0 2px 0px rgb(54, 54, 54);
        }
      }
    }
    .login {
      width: 100%;
      display: flex;
      // justify-content: space-around;
      align-items: center;
      padding: 0 10px;
      .info {
        margin-left: 20px;
        .userinfo {
          width: 170px;
          height: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          img {
            // background-color: red;
            width: 60px;
            height: 24px;
            vertical-align: middle;
            color: #f52929;
          }
        }
      }

      .yh {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        margin-left: 10px;
      }
      .name {
        color: #fff;
        font-size: 18px;
      }
      .personal {
        color: #fff;
        font-size: 16px;
        height: 30px;
        width: 100px;
      }

      h1 {
        margin-left: 20px;
      }
      .small {
        font-size: 15px;
      }
    }

    .time {
      // margin-top: 40px;
      font-size: 15px;
      // margin-left: 20px;
      display: flex;
      // justify-content: flex-start;
      align-items: center;
      padding: 0px 20px;
      width: 100%;
      height: 30px;
      .t1 {
        color: #fff;
        padding-right: 10px;
      }
      .t2 {
        color: #fff;
        padding-right: 10px;
      }
      .t3 {
        color: #fff;
      }
    }
    .vip2 {
      // margin-top: 20px;
      width: 92%;
      margin: 28px auto 0;
      height: 100px;
      // background-color: #aaaeba;
      background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.15) 0%,
          rgba(0, 0, 0, 0.15) 100%
        ),
        radial-gradient(
            at top center,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(0, 0, 0, 0.4) 120%
          )
          #989898;
      background-blend-mode: multiply, multiply;
      padding: 0 10px 0 20px;
      display: flex;
      // flex-direction: column;
      justify-content: space-between;
      border-radius: 7% 7% 100% 100% / 30% 30% 30% 30%;
      align-items: center;
      div {
        width: 200px;
        height: 60px;
        display: flex;
        flex-direction: column;
        p {
          margin: 0;
          flex: 1;
          display: flex;
          align-items: center;
          &:nth-of-type(1) {
            width: 80px;
            font-size: 18px;
            color: #ffffff;
            font-weight: 600;
            font-family: "楷体";
          }
          &:nth-of-type(2) {
            font-size: 12px;
            color: #ffffff;
            span {
              &:nth-of-type(2) {
                padding-left: 10px;
              }
            }
          }
        }
      }
      .loginBtn {
        width: 60px;
        height: 26px;
        outline: none;
        border: 1px solid #ffffff;
        border-radius: 26px;
        background-color: #aaaeba;
        color: #ffffff;
        margin-right: 10px;
      }
    }
    .vip {
      width: 92%;
      margin: 0 auto;
      height: 100px;
      // background-color: #aaaeba;
      background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.15) 0%,
          rgba(0, 0, 0, 0.15) 100%
        ),
        radial-gradient(
            at top center,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(0, 0, 0, 0.4) 120%
          )
          #989898;
      background-blend-mode: multiply, multiply;
      padding: 0 10px 0 20px;
      display: flex;
      flex-direction: column;
      border-radius: 7% 7% 100% 100% / 30% 30% 30% 30%;
      .v-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex: 3;
        padding: 0 10px;
        .v-top2 {
          display: flex;
          align-items: center;
          width: 200px;
          img {
            width: 25px;
            height: 25px;
          }
          span {
            font-size: 24px;
            color: #ffffff;
            font-family: "楷体";
          }
        }
        .v-btn {
          width: 60px;
          height: 26px;
          outline: none;
          border: 1px solid #ffffff;
          border-radius: 26px;
          background-color: #aaaeba;
          color: #ffffff;
        }
      }
      .new {
        flex: 2;
        display: flex;
        // align-items: center;
        font-family: "楷体";
        color: #ffffff;
        font-size: 14px;
      }
    }
  }

  .main {
    width: 100%;
    background-color: #f4f4f4;
    .power {
      width: 100%;
      height: 90px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: #fbfbfb;
      border-top: 10px solid rgb(245, 244, 244);
      // margin-top: 20px;
      .discount {
        width: 110px;
        height: 60px;
        background-color: #ffffff;
        position: relative;
        border-radius: 10px;
        box-shadow: 0px 0px 3px 0 orange;
        .js {
          position: absolute;
          font-size: 14px;
          font-weight: bolder;
          left: 10px;
          top: 8px;
          margin: 0;
        }
        .jj {
          position: absolute;
          left: 10px;
          bottom: 10px;
          margin: 0;
        }
        .jh {
          position: absolute;
          right: 0;
          bottom: 2px;
          width: 25px;
          height: 40px;
        }
      }
      .free {
        width: 110px;
        height: 60px;
        background-color: #ffffff;
        position: relative;
        border-radius: 10px;
        box-shadow: 0px 0px 3px 0 orange;
        .ad {
          position: absolute;
          font-size: 14px;
          font-weight: bolder;
          left: 10px;
          top: 8px;
          margin: 0;
        }
        .as {
          position: absolute;
          left: 10px;
          bottom: 10px;
          margin: 0;
        }
        .ap {
          width: 40px;
          height: 60px;
          position: absolute;
          right: -6px;
          bottom: -10px;
        }
      }
      .voice {
        width: 110px;
        height: 60px;
        background-color: #ffffff;
        position: relative;
        border-radius: 10px;
        box-shadow: 0px 0px 3px 0 orange;
        .sl {
          position: absolute;
          font-size: 14px;
          font-weight: bolder;
          left: 10px;
          top: 8px;
          margin: 0;
        }
        .zl {
          position: absolute;
          left: 10px;
          bottom: 10px;
          margin: 0;
        }
        .xl {
          position: absolute;
          right: -2px;
          bottom: 2px;
          width: 30px;
          height: 40px;
        }
      }
    }
    .box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 10px;
      height: 90px;
      background-color: #ffffff;
      .guanzhu {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        div {
          display: flex;
          justify-content: center;
          i {
            font-size: 25px;
            color: rgb(252, 234, 202);
            font-weight: 800;
          }
        }
        .line1 {
          text-align: center;
          color: rgb(97, 97, 97);
        }
      }
      .tiezi {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        div {
          display: flex;
          justify-content: center;
          i {
            font-size: 25px;
            color: rgb(252, 234, 202);
            font-weight: 800;
          }
        }
        .line2 {
          text-align: center;
          color: rgb(97, 97, 97);
        }
      }
      .shudan {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        div {
          display: flex;
          justify-content: center;
          i {
            font-size: 25px;
            color: rgb(252, 234, 202);
            font-weight: 800;
          }
        }
        .line3 {
          text-align: center;
          color: rgb(97, 97, 97);
        }
      }
    }
    .my {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ffffff;
      margin-top: 10px;
      height: 60px;
      .manager {
        margin-left: 23px;
      }
      h2 {
        margin-right: 150px;
      }
      p {
        margin-right: 30px;
        font-size: 20px;
        color: #ccc;
      }
    }
    .news {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #ffffff;
      margin-top: 10px;
      height: 60px;
      .new {
        margin-left: 20px;
      }
      h2 {
        margin-right: 150px;
      }
      p {
        margin-right: 30px;
        font-size: 20px;
        color: #ccc;
      }
    }
  }
  .task {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    border-top: 1px solid #f7f7f9;
    height: 60px;
    .gift {
      margin-left: 20px;
    }
    h2 {
      margin-right: 150px;
    }
    p {
      margin-right: 30px;
      font-size: 20px;
      color: #ccc;
    }
  }
  .lv {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    border-top: 1px solid #f7f7f9;
    height: 60px;
    .star {
      margin-left: 20px;
    }
    h2 {
      margin-right: 150px;
    }
    p {
      margin-right: 30px;
      font-size: 20px;
      color: #ccc;
    }
  }

  .Feedback {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    border-top: 1px solid #f7f7f9;
    height: 60px;
    .warning {
      margin-left: 20px;
    }
    h2 {
      margin-right: 150px;
    }
    p {
      margin-right: 30px;
      font-size: 20px;
      color: #ccc;
    }
  }
  .out {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    border-top: 1px solid #f7f7f9;
    .logout {
      width: 260px;
      height: 35px;
      border-radius: 35px;
      background-color: #f52929;
      border: none;
      outline: none;
      color: #ffffff;
      font-size: 16px;
      font-weight: "楷体";
      margin: 20px auto;
    }
  }
}
</style>