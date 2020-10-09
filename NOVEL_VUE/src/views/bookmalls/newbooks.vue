<template>
  <div id="newbooks">
    <div class="container">
      <div class="lunbobacg">
        <div class="lunboarea">
          <van-swipe :autoplay="3000">
            <van-swipe-item>
              <img
                class="lunboimg"
                v-lazy="'https://'+'plf-new.zhuishushenqi.com/management/images/20191206/ef365b80c5c24ea99341a2218d41c65b.jpg'"
              />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="wholesort"></div>

      <div class="modules">
        <titlemore class="bookline">
          <div slot="left-title">大神新作</div>
          <div slot="right-title">更多</div>
        </titlemore>
        <div
          class="booklineone"
          v-for="(item,index) in nansheng"
          :key="index"
          @click="cpnClick(item.title)"
        >
          <booklineone>
            <div slot="bookpic">
              <img class="bookp" :src="'http://pt.yuenov.com:15555'+item.coverImg" alt />
            </div>
            <div slot="booktitle">
              <div slot="bookname" class="botleft">{{item.title}}</div>
            </div>
            <div slot="bookintro">{{item.desc}}</div>

            <div slot="bookauthor" class="botleft">{{item.author}}</div>
            <div slot="bookcate" class="botright">{{item.categoryName}}</div>
          </booklineone>
        </div>
      </div>

      <div class="modules">
        <titlemore class="bookline">
          <div slot="left-title">独家抢鲜</div>
          <div slot="right-title">更多</div>
        </titlemore>
        <div class="typetwo">
          <div class="spaceflex">
            <div
              class="booklinetwo"
              v-for="(item,index) in xiaozhong"
              :key="index"
              @click="cpnClick(item.title)"
            >
              <booklinetwo>
                <img
                  slot="bookpic"
                  class="bookp"
                  :src="'http://pt.yuenov.com:15555'+item.coverImg"
                  alt
                />

                <span class="namestyle" slot="bookname">{{item.title}}</span>
                <span class="typestyle" slot="booktype">{{item.categoryName|twowords}}</span>
                <span slot="bookwordcount">{{item.word}}</span>
              </booklinetwo>
            </div>
          </div>
        </div>
      </div>

      <div class="modules">
        <titlemore class="bookline">
          <div slot="left-title">最新爽文</div>
          <div slot="right-title">更多</div>
        </titlemore>
        <div
          class="booklineone"
          v-for="item in zhongbang"
          :key="item.bookId"
          @click="cpnClick(item.title)"
        >
          <booklineone>
            <div slot="bookpic">
              <img class="bookp" :src="'http://pt.yuenov.com:15555'+item.coverImg" alt />
            </div>
            <div slot="booktitle">
              <div slot="bookname" class="botleft">{{item.title}}</div>
            </div>
            <div slot="bookintro">{{item.desc}}</div>

            <div slot="bookauthor" class="botleft">{{item.author}}</div>
            <div slot="bookcate" class="botright">{{item.categoryName}}</div>
          </booklineone>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import zgaxios from "@/tools/zgaxios";
import NavBar from "@/components/navBar/NavBar";
import titlemore from "@/components/bookmall/titlemore/title";
import booklineone from "@/components/bookmall/bookdistributionone/bookline";
import booklinetwo from "@/components/bookmall/bookdistributiontwo/bookline";
import rowscroll from "@/components/bookmall/rowscroll/rows";
import {
  searchBook,
  hotWord,
  bookDetail,
  bookDirectory,
  hotSelect
} from "@/tools/allApi";
export default {
  name: "newbooks",
  data() {
    return {
      images: [],
      wholesort: [],
      zhongbang: [],
      nansheng: [],
      xiaozhong: [],
      ranks: [],
      rank1: [],
      rank2: []
    };
  },
  created() {
    this.gethotSelect();
    this.getbookSort();
  },
  mounted() {},
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
    //轮播图数据
    async gethotSelect() {
      let result1 = await zgaxios("GET", hotSelect);
      this.ranks = result1.data[4].advs;
      this.images = result1.data[0].advs;
      this.wholesort = result1.data[1].advs;
      this.rank1 = this.ranks[0].books;
      this.rank2 = this.ranks[1].books;
    },
    async getbookSort() {
      // console.log(
      //   "this.$store.state.yuenovel------->",
      //   this.$store.state.yuenovel
      // );

      for (let i = 25; i < 28; i++) {
        this.zhongbang.push(this.$store.state.yuenovel[i]);
      }
      for (let i = 29; i < 32; i++) {
        this.nansheng.push(this.$store.state.yuenovel[i]);
      }
      for (let i = 16; i < 20; i++) {
        this.xiaozhong.push(this.$store.state.yuenovel[i]);
      }
    }
  },
  components: {
    titlemore,
    booklineone,
    booklinetwo,
    rowscroll
  },
  filters: {
    twowords(words) {
      return words.slice(0, 2);
    }
  }
};
</script>

<style lang="scss" scoped>
#newbooks {
  .container {
    padding-top: 0;
    padding-bottom: 0;

    /deep/ #nav-bar {
      background-color: #303032;
      .left {
        width: 0;
        overflow: hidden;
      }
      .center {
        width: 72%;
        margin-left: 10px;
        background-color: #8792a6;
        position: relative;
        .picdv {
          width: 22px;
          height: 22px;
          margin-top: 7px;
          margin-left: 10px;
          .pic {
            width: 20px;
            height: 20px;
          }
        }
        .inputs {
          position: absolute;
          background-color: #8792a6;
          color: #fff;
          border: none;
          outline: none;
          width: 210px;
          height: 30px;
          top: 3px;
          left: 40px;
        }
        input::-webkit-input-placeholder {
          color: #fff;
        }
        input::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #fff;
        }
        input:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #fff;
        }
        input:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #fff;
        }
      }
      .right {
        width: 28%;
        // display: block;
        float: right;
        padding-right: 0;

        .chucheng {
          height: 25px;
          width: 40px;
          text-align: center;
          line-height: 25px;
          font-size: 14px;
          font-family: Helvetica;
          color: #d2686a;
          font-weight: 1000;
          background-color: #f8fff9;
          border-radius: 50px;
        }
      }
    }

    /deep/.lunbobacg {
      height: 100px;
      width: 100%;
      border-bottom-left-radius: 50%;
      border-bottom-right-radius: 50%;
      background-color: #303032;

      .lunboarea {
        width: 90%;
        margin: 10px auto;
        .lunboimg {
          width: 100%;
          border-radius: 10px;
        }
      }
    }
    /deep/::before {
      content: "";
      display: table;
    }
    .wholesort {
      width: 100%;
      height: 20px;
      margin-top: 47px;
      // background-color: #d3d3d3;
      .routeto {
        height: 100%;
        .van-grid-item {
          .van-grid-item__content {
            .van-grid-item__icon {
              font-size: 40px !important;
            }
          }
        }
      }
    }

    /deep/.modules {
      border-bottom: 10px solid #e5e5e5;
      /deep/.booklineone {
        .bookp {
          width: 90px !important;
          height: 120px !important;
          box-shadow: 0 0 3px 3px #d3d1d1;
        }
        .info{
          .title{
            word-break: break-word;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 1;
              display: -webkit-box;
              -webkit-box-orient: vertical;
          }
        }
      }

      .typetwo {
        width: 92%;
        margin: 0 auto;

        .spaceflex {
          padding-bottom: 10px;
          /deep/.booklinetwo {
            width: 47.5%;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            float: left;
            .namestyle {
              word-break: break-word;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2;
              display: -webkit-box;
              -webkit-box-orient: vertical;
            }

            /deep/.floatleft {
              float: left;
            }
            .bookp {
              width: 80px !important;
              height: 110px !important;
              box-shadow: 0 0 3px 3px #d3d1d1;
            }
          }
          /deep/.booklinetwo:nth-of-type(2n) {
            margin-right: 0;
          }
        }
      }
      ::after {
        content: "";
        display: table;
        clear: both;
      }
    }
  }
}
</style>
