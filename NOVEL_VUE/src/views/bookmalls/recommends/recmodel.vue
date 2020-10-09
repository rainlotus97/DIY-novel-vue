<template>
  <div id="model">
    <div class="left">
      <div class="top"></div>
      <div class="bottom"></div>
    </div>
    <div class="center">
      <div class="top">
        <div class="arrow-left">
          <img class="arrowsize" src="@/assets/images/shuchengxinren/left.png" alt />
        </div>
        <div class="bookpic">
          <img
            class="picsize"
            :src="newbooks.cover"
            alt
          />
        </div>
        <div class="arrow-right">
          <img class="arrowsize" src="@/assets/images/shuchengxinren/right.png" alt />
        </div>
      </div>
      <div class="bottom">
        <div class="bookname">{{newbooks.title}}</div>
        <div class="bookinfo">
          <span>{{newbooks.author}}</span>
          <span>|</span>
          <span>{{newbooks.majorCate}}</span>
        </div>
        <div class="bookintro">{{newbooks.editorComment}}</div>
        <van-button round type="info" color="#fce4e2"  @click="getbook(newbooks.title)" >去阅读</van-button>
      </div>
    </div>

    <div class="right">
      <div class="top"></div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
import zgaxios from "@/tools/zgaxios";
import {
  searchBook,
  hotWord,
  bookDetail,
  bookDirectory,
  hotSelect,
  bookSort
} from "@/tools/allApi";
export default {
  name: "model",
  props: {
    cbooks: {
      type:Object
    }
  },
  data() {
    return {
      newbooks:this.cbooks
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    async getbook(item) {
      let getbookdetail = await zgaxios("GET", bookDetail + item);
      console.log("搜索到的书籍", getbookdetail);
      if (getbookdetail.code == 0) {
        let result = getbookdetail.list.filter(v => {
          return (
            v.name == item &&
            v.cover &&
            v.introduce.length > 3 &&
            v.num &&
            v.tag &&
            v.url
          );
        });
        if (result.length == 0) {
          this.$toast("抱歉，未找到此书");
        } else {
          let res = result.slice(0, 1);
          this.$store.commit("getBookDetail", res[0]);
          this.$router.push("/bookdetail");
          // console.log("this.$store.state.bookdetail--->",this.$store.state.bookdetail);
        }
      } else if (getbookdetail.code == 1) {
        this.$toast("抱歉，未找到此书");
        // console.log("抱歉，未找到此书");
      }
    },
    async cpnClick(item) {
      let getbookdetail = await zgaxios("GET", bookDetail + item);
      console.log("搜索到的书籍", getbookdetail);
      if (getbookdetail.code == 0) {
        let result = getbookdetail.list.filter(v => {
          return (
            v.name == item &&
            v.cover &&
            v.introduce.length > 3 &&
            v.num &&
            v.tag &&
            v.url &&
            v.author
          );
        });
        if (result.length == 0) {
          this.$toast("抱歉，未找到此书");
        } else {
          let res = result.slice(0, 1);
          this.$store.commit("getBookDetail", res[0]);
          this.$router.push("/bookdetail");
          // console.log("this.$store.state.bookdetail--->",this.$store.state.bookdetail);
        }
      } else if (getbookdetail.code == 1) {
        this.$toast("抱歉，未找到此书");
        // console.log("抱歉，未找到此书");
      }
    },
  },
  
};
</script>

<style lang="scss" scoped>
#model {
  height: 390px;
  .left {
    float: left;
    margin-top: 25px;
    width: 20px;
    height: 356px;
    background-color: #ffffff;
    box-shadow: 1px 0 10px 2px #d3d3d3;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    .top {
      height: 186px;
      width: 100%;
      border-top-right-radius: 15px;
      background-color: #fcfcfc;
    }
    .bottom {
      height: 170px;
      width: 100%;
      border-bottom-right-radius: 15px;
    }
  }
  .center {
    float: left;
    height: 356px;
    width: 295px;
    margin: 25px 20px 0 20px;
    border: 1px solid #d3d3d3;
    border-radius: 15px;
    box-shadow: 0 0 10px 2px #d3d3d3;
    background-color: #ffffff;
    .top {
      height: 186px;
      width: 100%;
      border-top-right-radius: 15px;
      border-top-left-radius: 15px;
      background-color: #fcfcfc;
      .arrow-left {
        float: left;
        width: 30%;
        height: 100%;
        text-align: center;
        position: relative;
        .arrowsize {
          width: 25px;
          height: 34px;
          position: absolute;
          top: 55%;
          left: 30%;
        }
      }
      .bookpic {
        float: left;
        width: 40%;
        height: 100%;
        text-align: center;
        position: relative;
        .picsize {
          width: 90px;
          position: absolute;
          margin-left: -44px;
          left: 50%;
          bottom: 0;
          border-radius: 3px;
          box-shadow: 0 -3px 14px 3px #c2c1c1;
        }
      }
      .arrow-right {
        float: left;
        width: 30%;
        height: 100%;
        text-align: center;
        position: relative;
        .arrowsize {
          width: 25px;
          height: 34px;
          position: absolute;
          top: 55%;
          right: 30%;
        }
      }
    }
    .bottom {
      height: 170px;
      width: 100%;
      border-bottom-right-radius: 15px;
      border-bottom-left-radius: 15px;
      position: relative;
      .bookname {
        width: 100%;
        text-align: center;
        height: 40px;
        line-height: 50px;
        font-size: 16px;
        font-weight: bolder;
      }
      .bookinfo {
        width: 100%;
        text-align: center;
        height: 30px;
        line-height: 25px;
        color: #949494;

        span {
          padding: 3px;
        }
      }
      .bookintro {
        width: 100%;
        text-align: center;
        height: 40px;
        font-size: 17px;
        font-weight: bold;
      }
      .van-button {
        width: 150px;
        position: absolute;
        left: 50%;
        margin-left: -75px;
        .van-button__content {
          .van-button__text {
            font-weight: bolder;
            color: #ee6a6e;
            font-size: 16px;
          }
        }
      }
    }
  }
  .right {
    float: left;
    margin-top: 25px;
    width: 20px;
    height: 356px;
    background-color: #ffffff;
    box-shadow: 1px 0 10px 2px #d3d3d3;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    .top {
      height: 186px;
      width: 100%;
      border-top-left-radius: 15px;
      background-color: #fcfcfc;
    }
    .bottom {
      height: 170px;
      width: 100%;
      border-bottom-left-radius: 15px;
    }
  }
}
#model::before {
  display: table;
  content: "";
}
</style>
