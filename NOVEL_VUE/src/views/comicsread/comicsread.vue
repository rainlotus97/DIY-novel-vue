<template>
  <div class="comics">
    <!-- navBar -->
    <transition name="draw">
      <div class="nav" v-show="flag">
        <i class="iconfont icon-xiaoyuhao" @click="back">{{$store.state.name}}</i>
        <div class="nav-right">
          <i class="iconfont icon-shuaxin" @click="refresh"></i>
          <i class="iconfont icon-xiazai"></i>
          <i class="iconfont icon-question"></i>
        </div>
      </div>
    </transition>

    <!-- 中央阅读区域 -->
    <div class="center">
      <div class="center-img" v-for="(item,index) in content" :key="index" :ref="`list${index}`">
        <img v-lazy="item.img" :style="{opacity:luminance/100}"/>
      </div>
    </div>

    <!-- 中央隐藏区域 -->
    <div class="center-click" @click="showHide"></div>

    <!-- tabBar -->
    <transition name="drawTop">
      <div class="floor" v-show="flag">
        <i class="iconfont icon-mulu" @click="showList"></i>
        <i class="iconfont icon-jindutiao" @click="showProgress"></i>
        <i class="iconfont icon-taiyang" @click="changelight"></i>

        <transition name="drawTop">
          <book-list v-if="flag2" class="booklist" :paramValue="componentName"></book-list>
        </transition>
         <transition name="drawTop" v-if="content">
          <div class="progress" v-show="flag3">
            <div class="pro-floor">
              <i class="iconfont icon-xiaoyuhao"></i>
              <van-slider
                class="slider"
                v-model="value"
                :min="0"
                :max="(content.length-1)"
                @change="changeProgress(value)"
              />
              <i class="iconfont icon-dayuhao"></i>
            </div>
          </div>
        </transition>
       <transition name="drawTop">
          <div class="progress" v-show="flag4">
              <div class="pro-floor">
              <i class="iconfont icon-xiaoyuhao"></i>
              <van-slider
                class="slider"
                v-model="luminance"
                :min="20"
                :max="100"
                @change="changeLight(luminance)"
              />
              <i class="iconfont icon-dayuhao"></i>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import bookList from "@/components/bookList/bookList";
import zgaxios from "@/tools/zgaxios";
import { cartoonDirectory, cartoonContent } from "@/tools/allApi";
export default {
  name: "comicsread",
  data() {
    return {
      flag: false,
      flag2: false,
      flag3: false,
      flag4: false,
      content: [], //漫画内容
      componentName: "comicsread",
      value: 0,
      luminance:100,
    };
  },
  components: {
    bookList,
  },
  methods: {
    // tabBar动态设置动画
    showHide() {
      this.flag = !this.flag;
      this.flag4 = false;
      this.flag3 = false;
      this.flag2 = false;
    },
    showList() {
      this.flag2 = !this.flag2;
      this.flag3 = false;
      this.flag4 = false;
    },
    showProgress() {
      this.flag3 = !this.flag3;
      this.flag2 = false;
      this.flag4 = false;
    },
    changelight() {
      this.flag4 = !this.flag4;
      this.flag3 = false;
      this.flag2 = false;

    },
    // 刷新页面
   async refresh() {
     await this.getContent(this.$store.state.bookUrl);
      console.log(this.$store.state.bookUrl);
    },
    // async bookList(num) {
    //   let result = await zgaxios("GET", cartoonDirectory + num);
    //   this.$store.commit("getbookName", result.data.name);
    //   this.$store.commit("getbookList", result.list);
    // },
    async getContent(num) {
      let result = await zgaxios("GET", cartoonContent + num);
     if(result.code!='1'){
       this.content = result.list;
     }
      
    },
    // 滚动监听函数
    onScroll() {
      let scrollTop = Math.round(
        window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
      ); // 滚动条偏移量
      let windowHeight = Math.round(
        document.documentElement.clientHeight || document.body.clientHeight
      );
      let scrollHeight = Math.round(
        document.documentElement.scrollHeight || document.body.scrollHeight
      );
      let per=parseFloat((scrollTop+windowHeight)/scrollHeight).toFixed(2)
        this.value=parseInt(per*(this.content.length-1))
      if (scrollTop + windowHeight == scrollHeight) {
        let url = this.$store.state.bookUrl;
        let list = this.$store.state.bookList;
        let index = list.findIndex((item) => item.url == url) + 1;
        if (index == list.length) {
          index = 0;
        }
        this.$store.commit("getBookUrl", list[index].url);
      }
      if (scrollTop == 0) {
        // console.log("来到顶部了");
        let url = this.$store.state.bookUrl;
        let list = this.$store.state.bookList;
       if(list!=[]){
          let index = list.findIndex((item) => item.url == url) - 1;
        if (index == -1) {
          index = list.length - 1;
        }
        this.$store.commit("getBookUrl", list[index].url);
       }
      }
    
    },
    // 进度条跳转
    changeProgress(i) {
      this.$refs[`list${i}`][0].scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
      this.value=i;
    },
    // 改变亮度
    changeLight(i){
        this.luminance=i
    },
    back(){

      this.$router.go(-1)
    }
  },
  // created() {},
  async created() {
  //  await this.bookList("https://www.u17.com/comic/71064.html");
   await this.getContent(this.$store.state.bookUrl); //单章内容
   window.addEventListener("scroll", this.onScroll, true);
  },
  watch: {
    "$store.state.bookUrl"() {
      this.content = [];
      this.getContent(this.$store.state.bookUrl);
      this.flag = false;
      this.flag2 = false;
    },
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollToTop, true);
  },
};
</script>
<style lang='scss' scoped>
@import url(//at.alicdn.com/t/font_2074924_osnexacken.css);
.comics {
  width: 100%;
  height: 100vh;
  position: relative;
  .nav {
    position: fixed;
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
    // height: 100vh;
    z-index: 1;
    // overflow: auto;
     background-color:#000;
    .center-img {
      width: 100%;
      img {
        width: 100%;
       
      }
    }
  }
  .center-click {
    width: 150px;
    height: 250px;
    // border: 1px solid black;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  .floor {
    position: fixed;
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
    }
  }
}
</style>