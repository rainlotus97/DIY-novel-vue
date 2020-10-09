<template>
  <div class="register">
    <div class="top-img">
      <i class="iconfont icon-shouji"></i>
    </div>

    <div class="main-register">
      <div class="reg-phone">
        <input
          type="number"
          placeholder="请输入手机号"
          class="phone"
          v-model="phone"
          @change="checkphone"
        />
        <i class="iconfont icon-cha" v-show="flag" @click="cancel"></i>
      </div>
      <transition name="drawLeft">
        <div v-show="flag2" class="main">
          <div class="pwdLogin" v-if="flag3">
            <input
              type="password"
              placeholder="请输入密码"
              class="password"
              v-model="password3"
              @blur="passpwd2"
            />
            <button
              :class="['loginBtn', { logincolor2: showcolor2 }]"
              @click="login2"
              :disabled="!showcolor2"
            >
              立即登录
            </button>
          </div>
          <div class="codeLogin" v-if="!flag3">
            <div class="codeInput">
              <input
                type="number"
                placeholder="请输入验证码"
                class="code"
                v-model="code"
              />
              <button @click="sendCode" v-show="show">获取验证码</button>
              <button v-show="!show">{{ count }}s 后重新发送</button>
            </div>
            <div class="pwdCheck">
              <input
                type="password"
                placeholder="请输入密码"
                class="password"
                v-model="password"
                @blur="passpwd"
              />
              <input
                type="password"
                placeholder="请确认密码"
                class="password"
                v-model="password2"
                @blur="checkpassword"
              />
              <button
                :class="['loginBtn', { logincolor: showcolor }]"
                @click="login"
                :disabled="!showcolor"
              >
                立即登录
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import zgaxios from "@/tools/zgaxios";
import {
  getAllUsers,
  sendCoreCode,
  sendcode,
  codePhoneLogin,
  login,
} from "@/tools/allApi";
export default {
  name: "register",
  data() {
    return {
      phone: "",
      code: "",
      flag: false,
      flag2: false,
      flag3: false,
      show: true,
      count: "",
      timer: null,
      password: "",
      password2: "",
      password3: "",
      showcolor: false,
      showcolor2: false,
    };
  },
  methods: {
    //   check手机号
    async checkphone() {
      // var reg = /^0{0,1}(13[0-9]|15[0-9])[0-9]{8}$/;
      if (this.phone == "") {
        this.$toast("请填写手机号码！");
        return false;
      }
      if (isNaN(this.phone) || this.phone.length != 11) {
        this.$toast("手机号码为11位数字！请正确填写！");
        return false;
      }
      // if (!reg.test(this.phone)) {
      //   this.$toast("您的手机号码不正确，请重新输入");
      //   return false;
      // }
      // let symbol = await this.checkUsers();
      // this.flag2 = true;
      // this.flag3 = symbol;
      return true;
    },
    // 发送验证码
    async sendCode() {
      let code = await zgaxios("GET", sendCoreCode, {
        phone: this.phone,
      });
      if (code.code == "200") {
        this.show = false;
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        this.showcolor = true;
        console.log(code);
      } else {
        this.$toast("验证码已发送,请查收");
      }
    },
    // 清空手机号码
    cancel() {
      this.phone = "";
    },
    // 判断用户是否存在
    async checkUsers() {
      let AllUsers = await zgaxios("GET", getAllUsers);
      let symbol = AllUsers.data.some((v) => v.username == this.phone);
      return symbol;
    },
    passpwd() {
      if (this.password.length < 6 || this.password.length > 16) {
        this.$toast("请输入6-16位密码！");
        this.password = "";
      }
    },
    passpwd2() {
      if (this.password3.length < 6 || this.password3.length > 16) {
        this.$toast("请输入6-16位密码！");
        this.password3 = "";
      }
    },
    checkpassword() {
      if (this.password != this.password2) {
        this.password = this.password2 = "";
        this.$toast("密码不一致，请重新输入！");
        this.showcolor = false;
      }
      if (this.password2 != "") {
        this.showcolor = true;
      } else {
        this.showcolor = false;
      }
    },
    async login() {
      if (
        this.phone != "" &&
        this.code != "" &&
        this.password2 == this.password &&
        this.password2 != ""
      ) {
        let result = await zgaxios("GET", codePhoneLogin, {
          phone: this.phone,
          code: this.code,
          password: this.password2,
        });
        console.log(result);
        if (result.code == "400") {
          this.$toast("验证码输入错误，请重新输入！");
        } else {
          this.$store.commit("getInfo", result);
          this.$store.commit("getStatus", 1);
          this.$router.push("/profile");
        }
      }
    },
    async login2() {
      if (this.password3 != "") {
        let result = await zgaxios("GET", login, {
          username: this.phone,
          password: this.password3,
        });
        if (result.code == "400") {
          this.$toast("手机号或密码错误，请重新输入！");
        } else {
          this.$store.commit("getInfo", result);
          // console.log(this.$store.state.info);

          this.$store.commit("getStatus", 1);
          this.$router.push("/profile");
        }
      }
    },
  },
  created() {},
  watch: {
    async phone() {
      this.flag2 = false;
      if (this.phone) {
        this.flag = true;
      } else {
        this.flag = false;
      }
      if (this.phone.length == 11) {
        var reg = /^0{0,1}(13[0-9]|15[0-9])[0-9]{8}$/;
        if (!reg.test(this.phone)) {
          this.$toast("您的手机号码不正确，请重新输入");
          return false;
        }
        let symbol = await this.checkUsers();
        this.flag2 = true;
        this.flag3 = symbol;
      }
    },
    code() {
      if (this.code == "") {
        this.showcolor = false;
      }
      if (
        this.phone != "" &&
        this.code != "" &&
        this.password2 == this.password &&
        this.password != ""
      ) {
        this.showcolor = true;
      }
    },
    password() {
      if (this.password == "") {
        this.showcolor = false;
      }
      if (
        this.phone != "" &&
        this.code != "" &&
        this.password2 == this.password &&
        this.password != ""
      ) {
        this.showcolor = true;
      }
    },
    password2() {
      if (this.password2 == "") {
        this.showcolor = false;
      } else {
        this.showcolor = true;
      }
    },
    password3() {
      if (this.password3 == "") {
        this.showcolor2 = false;
      } else {
        this.showcolor2 = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(//at.alicdn.com/t/font_2074924_k55g23qs8oi.css);
.register {
  padding: 0px 20px;
  .top-img {
    margin-top: 80px;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      font-size: 60px;
      color: #d8d8d8;
    }
  }
  .main-register {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    .reg-phone {
      width: 90%;
      height: 40px;
      position: relative;
      input::-webkit-input-placeholder {
        color: #aab2bd;
        font-size: 14px;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      .phone {
        width: 100%;
        height: 100%;
        border-radius: 40px;
        background-color: #f0f0f0;
        text-indent: 2em;
        position: absolute;
        left: 0;
        top: 0;
      }
      i {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: #adadad;
      }
    }

    .main {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-top: 20px;
      // 验证码登录
      .codeLogin {
        width: 90%;
        .codeInput {
          width: 100%;
          height: 40px;
          position: relative;
          .code {
            width: 100%;
            height: 100%;
            border-radius: 40px;
            background-color: #f0f0f0;
            text-indent: 2em;
            position: absolute;
            left: 0;
            top: 0;
          }
          button {
            border: none;
            outline: none;
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 10px;
            color: rgb(240, 33, 33);
          }
        }
        .pwdCheck {
          width: 100%;
          margin-top: 20px;
          .password {
            width: 100%;
            height: 40px;
            border-radius: 40px;
            background-color: #f0f0f0;
            text-indent: 2em;
            margin-bottom: 20px;
          }
          .loginBtn {
            width: 100%;
            height: 40px;
            border-radius: 40px;
            outline: none;
            border: none;
            background-color: #e4aba9;
            color: #fff;
            font-size: 16px;
            font-weight: bolder;
            margin-top: 10px;
          }
          .logincolor {
            background-color: #f81111;
          }
        }
      }
      .pwdLogin {
        width: 90%;
        .password {
          width: 100%;
          height: 40px;
          background-color: #f0f0f0;
          border-radius: 40px;
          text-indent: 2em;
        }
        .loginBtn {
          width: 100%;
          height: 40px;
          border-radius: 40px;
          outline: none;
          border: none;
          background-color: #e4aba9;
          color: #fff;
          font-size: 16px;
          font-weight: bolder;
          margin-top: 20px;
        }
        .logincolor2 {
          background-color: #f81111;
        }
      }
    }
  }
}
</style>