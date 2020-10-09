<template>
  <div class="container">
    <nav-bar key="nav1" :style="style">
      <div class="nav-left" slot="left-item" @click="back">
        <i class="iconfont icon-xiaoyuhao icon-back"></i>
        <span class="back">返回</span>
      </div>

      <span slot="center-item" class="title">{{ $store.state.name }}</span>
      <div class="fenxiang" slot="right-item">
        <i class="iconfont icon-fenxiang" id="tofenxiang"></i>
      </div>
    </nav-bar>
    <div class="detail-info" v-show="!flag">
      <div class="bookInfo">
        <img :src="$store.state.bookdetail.cover" class="bookimg" />
        <div class="list">
          <div>{{ $store.state.bookdetail.name }}</div>
          <div>{{ $store.state.bookdetail.author }}</div>
          <div>{{ $store.state.bookdetail.tag }}</div>
        </div>
      </div>
      <div class="introduce">{{ $store.state.bookdetail.introduce }}</div>
      <div class="listNew" @click="toreadNew">
        <span>最新</span>
        <div>{{ $store.state.bookdetail.num }}</div>
        <div>{{ $store.state.bookdetail.time }}</div>
        <i class="iconfont icon-dayuhao"></i>
      </div>
      <!-- 目录列表 -->
      <div class="listtotal" @click="tobookList">
        <span>目录</span>
        <div>共{{ this.$store.state.bookList.length }}章</div>
        <div></div>
        <i class="iconfont icon-dayuhao"></i>
      </div>

      <!-- 热门推荐 -->
      <div class="recommend">
        <div class="rec-top">
          <span>热门推荐</span>
          <span>
            查看更多
            <i class="iconfont icon-dayuhao"></i>
          </span>
        </div>
        <div class="rec-list-box" v-if="recommend.length > 0">
          <div
            class="rec-list"
            v-for="item in recommend"
            :key="item.title"
            @click="toDetail(item)"
          >
            <img :src="`//pt.yuenov.com:15555/${item.coverImg}`" alt />
            <div>{{ item.title }}</div>
            <div>{{ item.author }}</div>
          </div>
        </div>
      </div>
      <div class="floor">
        <div class="collect" @click="collect">
          <i class="iconfont icon-shuji-copy"></i>
          <span v-show="flag2">加书架</span>
          <span v-show="!flag2">已存在</span>
        </div>
        <div class="read" @click="linkStart">开始阅读</div>
        <div class="download" @click="download">
          <i class="iconfont icon-xiazai"></i>
          <span>下载</span>
        </div>
      </div>
    </div>

    <transition name="drawLeft">
      <div class="booklist" v-show="flag">
        <nav-bar key="nav2" class="nav2">
          <div class="nav-left" slot="left-item" @click="back2">
            <i class="iconfont icon-xiaoyuhao icon-back"></i>
            <span class="back">返回</span>
          </div>

          <span slot="center-item" class="title">{{
            this.$store.state.name
          }}</span>
          <div class="fenxiang" slot="right-item">
            <i class="iconfont icon-fenxiang" id="tofenxiang"></i>
          </div>
        </nav-bar>

        <book-list :paramValue="componentName" class="listBook"></book-list>
      </div>
    </transition>
  </div>
</template>

<script>
import NavBar from "@/components/navBar/NavBar";
import zgaxios from "@/tools/zgaxios";
import {
  bookDirectory,
  recommend,
  bookDetail,
  setBooks,
  books,
  delBook,
} from "@/tools/allApi";
import bookList from "@/components/bookList/bookList";
export default {
  name: "bookdetail",
  data() {
    return {
      flag: false,
      componentName: "bookread",
      recommend: [],
      style: {},
      opacity: 0,
      flag2: true,
    };
  },
  methods: {
    // 返回上一页
    back() {
      let name = this.$store.state.name;
      this.$store.commit("getSearchInput", name);
      let detail = [];
      this.$store.commit("getBookDetail", detail);

      this.$router.go(-1);
    },
    back2() {
      this.flag = false;
    },
    tobookList() {
      console.log("出来吧，神龙！");
      this.flag = !this.flag;
      window.scrollTo(0, 0);
    },
    async getrecommend() {
      // console.log(this.$store.state.recommend);
      if (
        this.$store.state.recommend.length != 0 &&
        typeof this.$store.state.recommend != "number"
      ) {
        this.recommend = this.$store.state.recommend;
      } else {
        console.log(2);
        let result2 = await zgaxios("GET", recommend, {
          bookId: 35707,
          pageNum: 1,
          pageSize: 10,
        });
        if (result2.data) {
          let recommend = result2.data.list.slice(0, 6);
          this.recommend = recommend;
          this.$store.commit("getRecommend", recommend);
        }
      }
    },
    async bookList(num) {
      let result = await zgaxios("GET", bookDirectory + num);
      if (result.data) {
        this.$store.commit("getbookName", result.data.name);
        this.$store.commit("getbookList", result.list);
      }
    },
    // 点击阅读
    linkStart() {
      let url = this.$store.state.bookList[0].url;
      this.$store.commit("getBookUrl", url);
      this.$router.push("/bookread");
    },
    toreadNew() {
      let num = this.$store.state.bookdetail.num.trim();
      let url = this.$store.state.bookList.filter((v) => v.num == num)[0].url;
      this.$store.commit("getBookUrl", url);
      this.$router.push("/bookread");
    },
    windowScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.opacity = Math.abs(Math.round(scrollTop)) / 250;
      this.style = { background: `rgba(255, 255, 255,${this.opacity})` };
    },
    async toDetail(data) {
      let result = await zgaxios("GET", bookDetail + data.title);
      let theEnd = result.list.filter(
        (v) =>
          v.hasOwnProperty("cover") &&
          v.introduce.length > 10 &&
          v.name == data.title
      )[0];
      this.$store.commit("getBookDetail", theEnd);
    },
    // 添加/取消书架功能
    async collect() {
      let { id } = this.$store.state.info.data;
      let allbooks = await zgaxios("GET", books, {
        user_id: id,
      });
      let data = this.$store.state.bookdetail;
      let flag = allbooks.books.some((v) => v.name == data.name);
      //   console.log(id,flag);
      if (this.$store.state.status == "0") {
        this.$router.push("/profile");
      } else {
        if (this.$store.state.info.data.status == "1" && flag == false) {
          let result = await zgaxios("GET", setBooks, {
            user_id: id,
            name: data.name,
            pic: data.cover,
            url: data.url,
          });
          if (result.code == "200") {
            this.$toast("添加成功！");
            this.flag2 = false;
          }
        } else {
          let delbook = await zgaxios("GET", delBook, {
            user_id: id,
            name: data.name,
          });
          this.$toast("取消成功");
          this.flag2 = true;
        }
      }
    },
    download() {
      this.$toast("功能暂未开放！");
    },
    // onScroll(){
    //   let scrollTop = Math.round(
    //     window.pageYOffset ||
    //       document.documentElement.scrollTop ||
    //       document.body.scrollTop
    //   ); // 滚动条偏移量
    //   let windowHeight = Math.round(
    //     document.documentElement.clientHeight || document.body.clientHeight
    //   );
    //   let scrollHeight = Math.round(
    //     document.documentElement.scrollHeight || document.body.scrollHeight
    //   );
    //   console.log(scrollTop,windowHeight,scrollHeight);
    // }
  },
  created() {
    this.getrecommend();
    this.bookList(this.$store.state.bookdetail.url);
  },
  mounted() {
    window.addEventListener("scroll", this.windowScroll); //监听页面滚动
    //  window.addEventListener("scroll", this.onScroll, true);
  },
  destroyed() {
    window.removeEventListener("scroll", this.windowScroll); //销毁滚动事件
  },
  components: {
    NavBar,
    bookList,
  },
  watch: {
    "$store.state.bookdetail"() {
      this.bookList(this.$store.state.bookdetail.url);
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(//at.alicdn.com/t/font_2074924_z8ur20y0oqa.css);
/deep/ #nav-bar {
  justify-content: center;
  z-index: 2;
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
  }
  .back {
    padding-left: 6px;
    font-size: 16px;
    color: #888787;
    font-weight: normal;
  }
}
.title {
  font-size: 16px;
  font-weight: bold;
}
.fenxiang {
  position: absolute !important;
  color: #888787;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
.bookInfo {
  width: 100%;
  height: 200px;
  background: url(https://i.loli.net/2020/09/23/N3Wql9muwJbsi2U.jpg) no-repeat;
  background-size: 100% 100%;
  position: relative;
  .bookimg {
    width: 105px;
    height: 135px;
    box-shadow: 1px 3px 3px 0 rgba($color: #353434, $alpha: 0.6);
    position: absolute;
    bottom: 0;
    left: 16px;
  }
  .list {
    height: 135px;
    color: #fff;
    position: absolute;
    bottom: 0;
    left: 134px;
    div {
      padding: 8px 0;
      font-size: 14px;
      &:nth-of-type(1) {
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      &:nth-of-type(2) {
        color: #ba9e4f;
      }
    }
  }
}
.introduce {
  margin: 20px 12px;
  text-indent: 2em;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  border: 2px solid #fbead7;
  background-color: #fdfafa;
  font-size: 14px;
  border-radius: 2px;
  padding: 0 5px;
  color: #353434;
}
.listNew,
.listtotal {
  display: flex;
  font-size: 14px;
  padding: 0px 10px;
  align-items: center;
  justify-content: space-around;
  height: 40px;
  border-bottom: 1px solid #cfcfcf;
  span {
    font-weight: bold;
  }
  div {
    // text-align: center;
    &:nth-of-type(1) {
      width: 200px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      color: #a1a1a1;
    }
    &:nth-of-type(2) {
      color: #84c7aa;
      width: 73px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}
.booklist {
  width: 100%;
  // height: 100vh;
  // overflow: auto;
  padding-top: 40px;
  .nav2 {
    z-index: 10;
    background-color: #fff;
  }
}
.recommend {
  margin-top: 30px;
  border-top: 10px solid #eeecec;
  .rec-top {
    height: 35px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eeecec;
    padding: 0 10px;
    span {
      &:nth-of-type(1) {
        color: #000;
        font-weight: 600;
      }
      &:nth-of-type(2) {
        color: #646464;
      }
    }
  }
  .rec-list-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: 14px 0 63px;
    .rec-list {
      width: 105px;
      height: 170px;
      margin-bottom: 4px;
      img {
        width: 100%;
        height: 130px;
        border-radius: 4px;
        box-shadow: 0 0 6px 2px #d3d3d3;
      }
      div {
        &:nth-of-type(1) {
          color: #000;
          font-size: 14px;
          font-weight: bold;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        &:nth-of-type(2) {
          color: #646464;
        }
      }
    }
  }
}
.floor {
  width: 100%;
  height: 49px;
  display: flex;
  margin-top: 20px;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 2;
  background-color: #fff;
  .collect,
  .download {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #23b382;
  }
  .read {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    border-radius: 40px;
    background-color: #23b382;
    color: #fff;
    font-size: 18px;
  }
}
</style>