<template>
  <div class="container">
    <nav-bar>
      <div class="nav-left" slot="left-item" @click="back">
        <i class="iconfont icon-xiaoyuhao icon-back"></i>
        <span class="back">返回</span>
      </div>
      <span slot="center-item" class="title">阅读历史</span>
      <div class="clear" slot="right-item">
        <span @click="dellAll">清空历史</span>
      </div>
    </nav-bar>
    <van-swipe-cell
      class="swiper-cell"
      v-for="item in allhistory"
      :key="item.book_name"
    >
      <div class="hist-list" @click="linkStart(item.url, item.book_name)">
        <img :src="item.pic" alt="" />
        <div class="info">
          <div>{{ item.book_name }}</div>
          <div>阅读到：{{ item.num_title }}</div>
          <div>上次阅读时间：{{ item.createtime | formatTime('MM-DD HH:mm') }}</div>
        </div>
      </div>
      <template #right>
        <van-button
          square
          type="danger"
          text="删除"
          @click="delHistory(item.num_title)"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import NavBar from "@/components/navBar/NavBar";
import zgaxios from "@/tools/zgaxios";
import {
  bookDetail,
  bookDirectory,
  history,
  delHistory,
  delALLHistory,
} from "@/tools/allApi";
export default {
  name: "history",
  data() {
    return {
      allhistory: [],
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    sortByTime(field){
      return (a,b)=>b[field]-a[field];
    },
    async getHistory() {
      let user_id = this.$store.state.info.data.id;
      let allhistory = await zgaxios("GET", history, {
        user_id,
      });
      this.allhistory = allhistory.history.sort(this.sortByTime('createtime'));
      // console.log(allhistory);
    },
    async delHistory(num_title) {
      let user_id = this.$store.state.info.data.id;
      let result = await zgaxios("GET", delHistory, {
        user_id,
        num_title,
      });
      this.allhistory = result.history;
    },
    async dellAll() {
      let user_id = this.$store.state.info.data.id;
      let result = await zgaxios("GET", delALLHistory, {
        user_id,
      });
      this.getHistory();
      // console.log(result);
    },
    // 页面跳转
    async linkStart(bookUrl, book_name) {
      this.$store.commit("getBookUrl", bookUrl);
     let url=  await this.toDetail(book_name);
    //  console.log(url);
     let list= await this.bookList(url);
    //  console.log(list);
      this.$router.push("/bookread");
    },
    async bookList(num) {
      let result = await zgaxios("GET", bookDirectory + num);
      this.$store.commit("getbookName", result.data.name);
      this.$store.commit("getbookList", result.list);
      return result.list
    },
    async toDetail(data) {
      let result = await zgaxios("GET", bookDetail + data);
      let theEnd = result.list.filter(
        (v) =>
          v.hasOwnProperty("cover") && v.introduce.length > 10 && v.name == data
      )[0];
      this.$store.commit("getBookDetail", theEnd);
      return theEnd.url
    },
  },
  created() {
    this.getHistory();
  },
  components: {
    NavBar,
  },
};
</script>

<style lang="scss" scoped>
@import url(//at.alicdn.com/t/font_2074924_z8ur20y0oqa.css);

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
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  overflow: auto !important;
}
.nav-left {
  display: flex;
  align-items: center;
  .icon-back {
    font-size: 22px;
    font-weight: 800;
    color: #f71919;
  }
  .back {
    padding-left: 6px;
    font-size: 14px;
    color: #f71919;
    font-weight: normal;
  }
}
.title {
  font-size: 16px;
  font-weight: bold;
}
.clear {
  position: absolute !important;
  color: #f71919;
  right: 20px;
  top: 50%;
  font-size: 14px;
  transform: translateY(-50%);
}
.container {
  margin-top: 60px;
  /deep/ .swiper-cell {
    width: 100%;
    height: 90px;
    // margin: 10px 0;
    // background-color: red;
    .van-swipe-cell__wrapper {
      width: 100%;
      height: 90px;
      .hist-list {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 12px;
        border-bottom: 1px solid #d8d8d8;
        img {
          width: 60px;
          height: 80px;
          box-shadow: 2px 1px 6px 1px #d8d8d8;
        }
        .info {
          display: flex;
          flex-direction: column;
          height: 80px;
          margin-left: 10px;
          div {
            flex: 1;
            align-items: center;
            display: flex;
            &:nth-of-type(1) {
              font-size: 16px;
              font-weight: 800;
            }
            &:nth-of-type(2) {
              font-size: 12px;
              color: #858585;
            }
            &:nth-of-type(3) {
              font-size: 8px;
              color: #aaa9a9;
            }
          }
        }
      }
    }
    .van-button {
      height: 100%;
    }
  }

  // .historyList {
  //   margin-top: 25px;
  //   width: 100%;

  //   .hist-list {
  //     display: flex;
  //     align-items: center;
  //     border-bottom: 1px solid #d8d8d8;
  //     height: 90px;
  //     padding: 0 12px;
  //     img {
  //       width: 60px;
  //       height: 80px;
  //       box-shadow: 2px 1px 6px 1px #d8d8d8;
  //     }
  //     .info {
  //       display: flex;
  //       flex-direction: column;
  //       height: 80px;
  //       margin-left: 10px;
  //       div {
  //         flex: 1;
  //         align-items: center;
  //         display: flex;
  //         &:nth-of-type(1) {
  //           font-size: 16px;
  //           font-weight: 800;
  //         }
  //         &:nth-of-type(2) {
  //           font-size: 12px;
  //           color: #858585;
  //         }
  //         &:nth-of-type(3) {
  //           font-size: 8px;
  //           color: #aaa9a9;
  //         }
  //       }
  //     }
  //   }
  // }
}
</style>