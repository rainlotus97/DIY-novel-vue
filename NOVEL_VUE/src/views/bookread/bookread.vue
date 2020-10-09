<template>
  <div class="readbook" ref="readbook">
    <!-- navbar -->
    <transition name="draw">
      <div class="nav" v-show="flag">
        <i class="iconfont icon-xiaoyuhao" @click="setHistory">{{
          $store.state.name
        }}</i>
        <div class="nav-right">
          <i class="iconfont icon-shuaxin" @click="refresh"></i>
          <i class="iconfont icon-xiazai"></i>
          <i class="iconfont icon-question"></i>
        </div>
      </div>
    </transition>

    <!-- 文章内容 -->
    <!-- 需要监听的内容 -->
    <div class="center" ref="center">
      <swiper id="swiperBox" :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item, index) in content" :key="index">
          <div class="page">
            <div class="con-title">
              <strong class="strong">{{ bookname }}</strong>
            </div>
            <div class="cent-core">
              <p v-for="(value, index) in item" :key="index">{{ value }}</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <!-- 中央隐藏区域 -->
    <div class="center-click" @click="showHide"></div>

    <!-- tabbar -->
    <transition name="drawTop">
      <div class="floor" v-show="flag">
        <i class="iconfont icon-mulu" @click="showList"></i>
        <i class="iconfont icon-jindutiao" @click="showProgress"></i>
        <i class="iconfont icon-taiyang" @click="changeColor"></i>
        <i class="iconfont icon-ziti" @click="changeFont"></i>
        <transition name="drawTop">
          <book-list
            v-if="flag2"
            class="booklist"
            :paramValue="componentName"
          ></book-list>
        </transition>
        <transition name="drawTop">
          <div class="progress" v-show="flag3">
            <div class="pro-top">{{ bookname }}</div>
            <div class="pro-floor" v-if="$store.state.bookList">
              <i class="iconfont icon-xiaoyuhao"></i>
              <van-slider
                class="slider"
                v-model="value"
                :min="0"
                :max="$store.state.bookList.length - 1"
                @change="changeChapter(value)"
              />
              <i class="iconfont icon-dayuhao"></i>
            </div>
          </div>
        </transition>
        <transition name="drawTop">
          <div class="progress" v-show="flag4">
            <ul class="ul">
              <li
                v-for="(item, index) in bgcolor"
                :key="index"
                @click="handleClick(index, item)"
                :style="{ 'background-color': item }"
                :class="{ activeColor: currentIndex === index }"
              ></li>
            </ul>
          </div>
        </transition>
        <transition name="drawTop">
          <div class="progress" v-show="flag5">
            <ul class="fontUl">
              <li
                v-for="(item, index) in fontStyle"
                :key="index"
                @click="handleClickFont(index, item)"
                :class="{ activeFont: CurrentIndex === index }"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import zgaxios from "@/tools/zgaxios";
import {
  novelContent,
  bookDirectory,
  history,
  delHistory,
  setHistory,
} from "@/tools/allApi";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import bookList from "@/components/bookList/bookList";

export default {
  name: "bookread",
  data() {
    let self = this;
    return {
      flag: false,
      flag2: false,
      flag3: false,
      flag4: false,
      flag5: false,
      value: 0,
      componentName: "bookread",
      bookname: "",
      content: [], // 小说内容
      bgcolor: ["#e3e2df", " #fcf7d1", "#cddff7", "#d9e8d6", "#2c2a2a"],
      currentIndex: 1,
      fontStyle: [
        "Sans-serif",
        "楷体",
        "黑体",
        "仿宋",
        "圆体",
        "宋体",
        "隶书",
        "Verdana",
      ],
      CurrentIndex: 0,
      // swiper组件
      swiperOption: {
        // swiper configs 所有的配置同swiper官方api配置
        notNextTick: true, //notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        // direction: "vertical", //垂直方向移动
        grabCursor: true, //鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
        setWrapperSize: true, //Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
        // autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化
        slidesPerView: 1, //设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
        resistanceRatio: 0, //抵抗率。边缘抵抗力的大小比例。值越小抵抗越大越难将slide拖离边缘，0时完全无法拖离。本业务需要
        loop: true,
        on: {
          // 下一页回调函数
          slideNextTransitionStart(swiper) {
            // console.log("chufale1", swiper.activeIndex, self.content.length);
            if (swiper.activeIndex > self.content.length) {
              let url = self.$store.state.bookUrl;
              let list = self.$store.state.bookList;
              for (let i = 0; i < list.length; i++) {
                if (list[i].url === url) {
                  let newUrl = list[i + 1].url;
                  self.swiper.slideTo(1, 1000, false);
                  self.$store.commit("getBookUrl", newUrl);
                }
              }
            }
          },
          // 上一页回调函数
          slidePrevTransitionStart(swiper) {
            // console.log("chufale3", swiper.activeIndex, self.content.length);
            if (swiper.activeIndex == 0) {
              let url = self.$store.state.bookUrl;
              let list = self.$store.state.bookList;
              for (let i = 0; i < list.length; i++) {
                if (list[i].url === url) {
                  let newUrl = list[i - 1].url;
                  self.swiper.slideTo(swiper.activeIndex, 1000, false);
                  self.$store.commit("getBookUrl", newUrl);
                }
              }
            }
          },
        },
      },
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    bookList,
  },
  methods: {
    async getContent(num) {
      let result = await zgaxios("GET", novelContent + num);
      if (result.content) {
        let length = result.content.length;
        for (let i = 0; i < length; i = i + 9) {
          this.content.push(result.content.slice(i, i + 9));
        }
        this.bookname = result.num;
      }
    },
    showHide() {
      this.flag = !this.flag;
      this.flag5 = false;
      this.flag4 = false;
      this.flag3 = false;
      this.flag2 = false;
    },
    showList() {
      this.flag2 = !this.flag2;
      this.flag3 = false;
      this.flag4 = false;
      this.flag5 = false;
    },
    showProgress() {
      this.flag3 = !this.flag3;
      this.flag2 = false;
      this.flag4 = false;
      this.flag5 = false;
    },
    changeColor() {
      this.flag4 = !this.flag4;
      this.flag3 = false;
      this.flag2 = false;
      this.flag5 = false;
    },
    changeFont() {
      this.flag5 = !this.flag5;
      this.flag4 = false;
      this.flag3 = false;
      this.flag2 = false;
    },
    // 刷新页面
    refresh() {
      this.$router.go(0)
      this.getContent(this.$store.state.bookUrl);
    },
    // 改变章节
    changeChapter(value) {
      let url = this.$store.state.bookList[value].url;
      this.$store.commit("getBookUrl", url);
    },
    // 改变背景颜色
    handleClick(index, value) {
      this.currentIndex = index;
      this.$refs.readbook.style.backgroundColor = value;
      if (value == "#2c2a2a") {
        this.$refs.center.style.color = "#fff";
      } else {
        this.$refs.center.style.color = "#000";
      }
    },
    // 改变字体
    handleClickFont(index, item) {
      this.CurrentIndex = index;
      this.$refs.center.style.fontFamily = item;
    },
    // 向数据库中存储浏览历史
    async setHistory() {
      let user_id = this.$store.state.info.data.id;
      let allhistory = await zgaxios("GET", history, {
        user_id,
      });
      let url = this.$store.state.bookUrl; //当前章节的url
      let list = this.$store.state.bookList;

      let flag = list.some((v) => v.url === url); //单章章节名称

      if (flag.length == 0) {
        this.$router.go(-1);
      } else {
        let num_title = list.filter((v) => v.url == url)[0].num; //单章章节名称
        let book_name = this.$store.state.name; //获取书名
        let searchOut = allhistory.history.filter(
          (v) => v.book_name == book_name
        ); //从历史中查找是否有当前书
        let bookinfo = this.$store.state.bookdetail;
        let pic = bookinfo.cover; //书的封面

        if (searchOut.length == 0) {
          //没有书
          let history = await this.sethistory(
            num_title,
            user_id,
            book_name,
            pic,
            url
          );
          //  console.log('history',history);
        } else {
          // 有相同的书名，不同的章节
          let theend = searchOut.filter((v) => v.num_title == num_title); //判断书名相同时，章节是否相同
          if (theend.length == 0) {
            //章节不同
            let delhistory = await this.delHistory(
              searchOut[0].num_title,
              user_id
            );
            let sethistory = await this.sethistory(
              num_title,
              user_id,
              book_name,
              pic,
              url
            );
          } else {
            //章节名和书名称都相同
            console.log("无需添加数据了！");
          }
        }
        this.$router.go(-1);
      }
    },
    async delHistory(num_title, user_id) {
      let delhistory = await zgaxios("GET", delHistory, {
        num_title,
        user_id,
      });
      return delhistory;
    },
    async sethistory(num_title, user_id, book_name, pic, url) {
      let sethistory = await zgaxios("GET", setHistory, {
        num_title,
        user_id,
        book_name,
        pic,
        url,
      });
      return sethistory;
    },
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  // created() {},
  async created() {
    await this.getContent(this.$store.state.bookUrl); //单章内容
    console.log(this.$store.state.bookList);
  },
  watch: {
    async "$store.state.bookUrl"() {
      this.content = [];
      // console.log(this.swiper.activeIndex);
      await this.getContent(this.$store.state.bookUrl);
      this.flag = false;
      this.flag2 = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(//at.alicdn.com/t/font_2074924_osnexacken.css);
.readbook {
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #fcf7d1;
  .nav {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 10vh;
    padding: 0px 5px;
    // border: 1px solid black;
    z-index: 2;
    background-color: #d1d0cc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .nav-right {
      width: 120px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
  .center {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    z-index: 1;
    padding: 0 10px;
    overflow: auto;
    .con-title {
      font-size: 14px;
      height: 30px;
      text-align: left;
      line-height: 30px;
    }
    .cent-core {
      p {
        text-indent: 2em;
        font-size: 16px;
      }
    }
    .page {
      height: 100vh;
      overflow: auto;
    }
  }
  .center-click {
    width: 150px;
    height: 250px;
    // border: 1px solid black;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  .floor {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 10vh;
    background-color: #d1d0cc;
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 2;
    .booklist {
      width: 100%;
      height: 80vh;
      // border: 1px solid black;
      position: absolute;
      z-index: 2;
      background-color: #d1d0cc;
      top: -80vh;
      left: 0;
    }
    .progress {
      z-index: 2;
      width: 100%;
      height: 15vh;
      position: absolute;
      top: -15vh;
      left: 0;
      background-color: #d1d0cc;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .pro-top {
        width: 100%;
        height: 5vh;
        text-align: center;
        line-height: 5vh;
      }
      .pro-floor {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        .slider {
          width: 250px;
        }
      }
      ul {
        list-style: none;
      }
      .ul {
        display: flex;
        justify-content: space-around;
        align-items: center;
        li {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
      .fontUl {
        overflow: auto;
        border-bottom: 1px solid rgb(230, 230, 230);
        li {
          width: 100%;
          height: 35px;
          font-size: 16px;
          border-top: 1px solid rgb(230, 230, 230);
          line-height: 35px;
        }
      }
    }
  }
}

.activeColor {
  border: 2px solid rgb(243, 118, 118);
}
.activeFont {
  color: red;
}
</style>>
