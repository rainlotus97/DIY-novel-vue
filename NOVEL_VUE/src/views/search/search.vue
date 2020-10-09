<template>
  <div class="container" v-cloak>
    <nav-bar>
      <i class="iconfont icon-xiaoyuhao" slot="left-item" @click="back"></i>
      <input
        type="text"
        slot="center-item"
        class="search"
        v-model="search.input"
        :placeholder="hotrecommend"
        ref="searchInput"
      />
      <button slot="right-item" v-show="search.input" @click="cancelInput" class="serach-btn">取消</button>
    </nav-bar>
    <div class="content">
      <!-- 搜索界面的默认推荐书籍 -->
      <div class="recommend" v-show="!search.input">
        <div class="hotword">
          <span>搜索热词</span>
          <span @click="getMore">
            更多
            <i class="iconfont icon-dayuhao" v-show="flag"></i>
            <i class="iconfont icon-xiajiantou" v-show="!flag"></i>
          </span>
        </div>
        <div :class="['bookname',flag?'line':'']">
          <span
            v-for="item in hotwords"
            :key="item.word"
            @click="searchHotWord(item.word)"
          >{{item.word}}</span>
        </div>
        <!-- 搜索历史 -->
        <div class="searchHistory">
          <div class="history">
            <span>搜索历史</span>
            <span @click="ClearHistory">
              <i class="iconfont icon-lajitong"></i>
            </span>
          </div>
          <div class="historyWords line">
            <span v-for="item in $store.state.searchHistory" :key="item">{{item}}</span>
          </div>
        </div>
        <!-- 全站热搜 -->
        <div class="Hotsearch">
          <div class="hotsearch">
            <img src="https://i.loli.net/2020/09/22/cJEQkRprYgjWtUi.png" alt />
          </div>
          <div
            :class="['booksInfo',index<3?`search-bg-${index}`:'']"
            v-for="(item,index) in hotBooks"
            :key="index"
            @click="searchHotWord(item.word)"
          >
            <img v-lazy="`http://statics.zhuishushenqi.com${item.cover}`" alt />
            <div class="bookinfo">
              <div :class="[index<3?'font-3':'']">{{item.word}}</div>
              <div :class="[index<3?'font-4':'']">
                <i class="iconfont icon-resou" v-show="index<3"></i>
                {{item.totalFollower|getFloat}}人气
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 精准搜索到的界面 -->
      <div class="searchInfo" v-show="search.input">
        <div class="success" v-if="flag2">
          <div
            class="bookDetail"
            v-for="(item,index) in sortBookList"
            :key="index"
            @click="sendMsg(item)"
          >
            <img v-lazy="item.cover" />
            <div class="detail">
              <div v-html="getColor(item.name)"></div>
              <div>{{item.author}}</div>
              <div>{{item.introduce}}</div>
              <div>
                <span>{{item.tag}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="failed" v-else>
          <img src="https://i.loli.net/2020/09/22/XbGrE1VyewzgsSp.gif" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navBar/NavBar";
import zgaxios from "@/tools/zgaxios";
import { hotWord, hotSearch, bookDetail } from "@/tools/allApi";
export default {
  name: "search",
  data() {
    return {
      search: {
        input: this.$store.state.searchinput,
        timer: null,
      },
      hotwords: [],
      flag: true,
      flag2: true,
      hotBooks: [],
      hotrecommend: "",
      sortBookList: [],
    };
  },
  methods: {
    sortBy(field) {
      return (a, b) => a[field].length - b[field].length;
    },
    back() {
      console.log("放开我，我要回去！！！");
      let str='';
      this.$store.commit("getSearchInput",str);
      this.$router.go(-1)
    },
    cancelInput() {
      this.search.input = "";
      this.sortBookList = "";
      this.flag2 = true;
    },
    async getList(bookname) {
      this.sortBookList = "";
      let result = await zgaxios("GET", bookDetail + bookname);
      if (result.code == "1") {
        this.flag2 = false;
      } else {
        let theEnd = result.list.filter(
          (v) => v.hasOwnProperty("cover") && v.introduce.length > 10
        );
        this.sortBookList = theEnd.sort(this.sortBy("name"));
      }
      // console.log(result);
    },
    getMore() {
      this.flag = !this.flag;
     

    },
    // 获取搜索历史数组
    getHistory() {
      let flag = this.$store.state.searchHistory.findIndex(
        (v) => v == this.search.input
      );
      if (flag == "-1") {
        this.$store.commit('setHistory',this.search.input)
      }
    },
    ClearHistory() {
      let arr=[]
      this.$store.commit('clearHistory',arr)
    },
    // 搜索热词
    async searchHotwords() {
      let result = await zgaxios("GET", hotWord);
      this.hotwords = result.searchHotWords;
      this.hotrecommend = result.searchHotWords[0].word;
    },
    // 全站热搜
    async HotRecommend() {
      let result = await zgaxios("GET", hotSearch);
      this.hotBooks = result.newHotWords;
    },
    // 搜索字体变色
    getColor(value) {
      let reg = new RegExp("(" + this.search.input + ")", "g");
      return (value = value.replace(reg, "<font color=#e95251>$1</font>"));
    },
    // 发送信息
    sendMsg(data) {
      this.$store.commit('getBookDetail',data)
         this.$router.push('/bookdetail')
    },
    searchHotWord(data) {
      this.search.input = data;
    },
  },
  created() {
    this.searchHotwords();
    this.HotRecommend();
    if( this.search.input){
         this.getList(this.search.input);
      }
  },
  beforeUpdate() {
    this.$refs.searchInput.focus();
  },
  mounted() {
  },
  components: {
    NavBar,
  },
  filters: {
    //   数据过滤
    getFloat(value) {
      if (value < 10000) {
        return (value = parseFloat(value / 1000).toFixed(1) + "千");
      } else {
        return (value = parseFloat(value / 10000).toFixed(1) + "万");
      }
    },
  },
  watch: {
    "search.input"() {
      this.flag2 = true;
      if (this.search.timer) {
        clearTimeout(this.search.timer);
      }
      this.search.timer = setTimeout(() => {
        if (this.search.input) {
          this.getList(this.search.input);
          this.getHistory();
        } else {
          this.sortBookList = "";
        }
      }, 1000);
      
    },
  },
};
</script>

<style lang="scss" scoped>
@import url(//at.alicdn.com/t/font_2074924_ww4r7tnpe6.css);

$colors: (
  "0": #fff1f0,
  "1": #fef5ee,
  "2": #fffaf4,
  "3": #f86109,
  "4": #f04e4e,
);
@each $colorKey, $color in $colors {
  .search-bg-#{$colorKey} {
    background-color: $color;
  }
  .font-#{$colorKey} {
    color: $color;
  }
}
[v-cloak] {
  display: none;
}

// 设置navbar
/deep/ #nav-bar {
  position: absolute;
  justify-content: space-around;
  border-bottom: 1px solid #f3eded;
  i {
    font-size: 18px;
    font-weight: 800;
    color: #414040;
  }
  .center {
    width: 250px;
  }
}
/deep/ .search {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  outline: none;
  border: none;
  text-indent: 2em;
  background-color: #e6e6e6;
}
/deep/ .serach-btn {
  width: 40px;
  height: 35px;
  font-size: 20px;
  font-weight: 600;
  outline: none;
  border: none;
  background-color: #fff;
  //   background-color: #f3eded;
  color: #363636;
}
.container {
  padding-bottom: 0 !important;
  .content {
    .recommend {
      padding: 0 10px;
      // 设置搜索热词
      .hotword {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 40px;
        span {
          font-size: 14px;
          color: #414040;
          font-weight: 500;
        }
      }
      .line {
        width: 100%;
        overflow: hidden !important;
        display: -webkit-box !important;
        -webkit-line-clamp: 3 !important;
        -webkit-box-orient: vertical !important;
      }
      .bookname {
        display: flex;
        flex-wrap: wrap;

        span {
          display: inline-block;
          border-radius: 20px;
          background-color: #e6e6e6;
          font-size: 12px;
          padding: 5px 10px;
          margin: 0 7px 5px;
        }
      }

      // 搜索历史
      .searchHistory {
        margin-bottom: 20px;
        .history {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 40px;
          // padding-right:10px;
          span {
            font-size: 14px;
            color: #d1d1d1;
            font-weight: 500;
            i {
              font-size: 18px;
            }
          }
        }
        .historyWords {
          display: flex;
          flex-wrap: wrap;
          span {
            display: inline-block;
            border-radius: 20px;
            background-color: #e6e6e6;
            font-size: 12px;
            padding: 4px 6px;
            margin: 0 7px 5px;
            color: #807f7f;
          }
        }
      }

      // 热搜推荐
      .Hotsearch {
        .booksInfo {
          height: 70px;
          margin-top: 15px;
          display: flex;
          align-items: center;
          border-radius: 2px;
          img {
            height: 100%;
            box-shadow: 0 2px 2px 0 #807f7f;
            border-radius: 4px;
          }
          .bookinfo {
            // width: 300px;
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            div {
              flex: 1;
              padding: 5px 0;
              &:nth-of-type(1) {
                font-size: 16px;
                font-weight: 600;
              }
              &:nth-of-type(2) {
                font-size: 12px;
              }
            }
          }
        }
      }
    }

    .searchInfo {
      // margin-top: 10px;
      width: 100%;
      padding: 0 10px;

      .success {
        background-color: #eeeeee;
        .bookDetail {
          background-color: #fff;
          display: flex;
          align-items: center;
          margin-top: 10px;
          border-radius: 4px;
          img {
            width: 100px !important;
            height: 125px !important;
            border-radius: 8px;
          }
          .detail {
            margin-left: 10px;
            div {
              padding: 4px 0;
              color: #6e6e6e;
              &:nth-of-type(1) {
                font-size: 16px;
                font-weight: 600;
                color: #000;
              }
              &:nth-of-type(2) {
                font-size: 12px;
              }
              &:nth-of-type(3) {
                padding: 0;
                font-size: 12px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
              &:nth-of-type(4) {
                display: flex;
                span {
                  font-size: 10px;
                  display: inline-block;
                  padding: 4px;
                  border-radius: 4px;
                  border: 1px solid #6e6e6e;
                }
              }
            }
          }
        }
      }
      .failed {
        width: 100%;
        height: 200px;
        display: flex;
        align-items: center;
        margin-top: 160px;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
    .searchInfo::before {
      display: table;
      content: "";
    }
  }
}
</style>