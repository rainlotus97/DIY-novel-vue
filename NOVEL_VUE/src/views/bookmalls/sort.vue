<template>
  <div id="sortpage">
    <van-nav-bar title="分类" left-text="返回" left-arrow @click-left="onClickLeft" />

    <van-tabs v-model="active" scrollspy sticky color="#eee">
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
        <div class="topimg">
          <img
            src="https://plf-new.zhuishushenqi.com/management/images/20200401/413c0d7656bf4fb4a116b1119e30e35c.jpg"
            alt
          />
        </div>
        <div class="topimg">
          <img
            src="https://plf-new.zhuishushenqi.com/management/images/20200401/c374aa8b1cac49daa1fbe7b89ae9fb6e.png"
            alt
          />
        </div>
      </div>

      <van-tab title="男生">
        <sortdetail :cresult="male" :cgender="gender1"></sortdetail>
      </van-tab>
      <van-tab title="女生">
        <sortdetail :cresult="female" :cgender="gender2"></sortdetail>
      </van-tab>
      <van-tab title="出版">
        <sortdetail :cresult="press" :cgender="gender3"></sortdetail>
      </van-tab>
      <van-tab title="标签">
        <sortdetail :cresult="tag" :cgender="gender4"></sortdetail>
      </van-tab>
    </van-tabs>

    <div></div>
  </div>
</template>

<script>
import zgaxios from "@/tools/zgaxios";
import { Toast } from "vant";
import sortdetail from "@/components/sorts/sortdetail";
import {
  searchBook,
  hotWord,
  bookDetail,
  bookDirectory,
  hotSelect,
  bookSort,
  bookscatemajor,
  bookscover
} from "@/tools/allApi";
export default {
  data() {
    return {
      active: 0,
      male:[],
      female:[],
      press:[],
      tag:[],
      gender1:"男生",
      gender2:"女生",
      gender3:"出版",
      gender4:"标签",
    };
  },
  components: {
    sortdetail
  },
  created() {
      this.getcatedatadetail()
  },
  mounted() {},
  methods: {
    onClickLeft() {
      history.go(-1);
    },
    
    async getcatedatadetail(){
        let result2 = await zgaxios("GET", bookscover);
        console.log("result2----->",result2);
        this.male = result2.category.male;
        this.female = result2.category.female;
        this.press = result2.category.press;
        this.tag = result2.category.tag
        console.log(typeof this.tag);
        
    }
  }
};
</script>

<style lang="scss" scoped>
#sortpage {
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
  /deep/ .van-tabs {
    .van-sticky {
      .van-tabs__wrap {
        .van-tabs__nav {
          background-color: #ce5655;
          .van-tab {
            color: #fff;
          }
          .van-tab--active {
            color: #fff;
          }
        }
      }
    }
    .van-tabs__content {
      .top {
        width: 90%;
        margin: 15px auto 0;
        .topimg {
          width: 150px;
          border-radius: 5px;
          margin: 10px 10px;
          float: left;
          img {
            width: 150px;
            border-radius: 5px;
            box-shadow: 1px 1px 3px 3px #b6b4b4;
          }
        }
        .topimg:nth-of-type(2n){
            margin-right: 0;
        }
      }
      .top::after {
        display: table;
        content: "";
        clear: both;
      }
    }
  }
}
</style>
