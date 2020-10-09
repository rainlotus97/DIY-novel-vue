<template>
  <div id="boylike">
    <div class="container">
      <div class="lunbobacg">
        <div class="lunboarea">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
              <img class="lunboimg" v-lazy="image.img" />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="wholesort"></div>

      <div class="modules">
        <titlemore class="bookline">
          <div slot="left-title">女神喜欢我</div>
          <div slot="right-title">更多</div>
        </titlemore>
        <div
          class="booklineone"
          v-for="item in one"
          :key="item.bookId"
          @click="cpnClick(item.title)"
        >
          <booklineone>
            <div slot="bookpic">
              <img class="bookp" :src="item.cover" alt />
            </div>
            <div slot="booktitle">
              <div slot="bookname" class="botleft">{{item.title}}</div>
            </div>
            <div slot="bookintro">{{item.shortIntro}}</div>

            <div slot="bookauthor" class="botleft">{{item.author}}</div>
            <div slot="bookcate" class="botright">{{item.minorCate}}</div>
          </booklineone>
        </div>

        <div class="typethree">
          <div
            class="floatleft"
            v-for="item in four"
            :key="item.bookId"
            @click="getbook(item.title)"
          >
            <booklinethree>
              <div slot="bookpic">
                <img class="bookp" :src="item.cover" alt />
              </div>

              <div class="bookname" slot="bookname">{{item.title}}</div>

              <div class="renqi" slot="bookwordcount">{{item.latelyFollower}}人气</div>
            </booklinethree>
          </div>
        </div>
      </div>

      <div class="modules">
        <titlemore class="bookline">
          <div slot="left-title">风水先生</div>
          <div slot="right-title">更多</div>
        </titlemore>
        <div
          class="booklineone"
          v-for="(item,index) in zhongbang"
          :key="index"
          @click="getbook(item.title)"
        >
          <booklineone>
            <div slot="bookpic">
              <img class="bookp" :src="item.cover" alt />
            </div>
            <div slot="booktitle">
              <div slot="bookname" class="botleft">{{item.title}}</div>
            </div>
            <div slot="bookintro">{{item.shortIntro}}</div>

            <div slot="bookauthor" class="botleft">{{item.author}}</div>
            <div slot="bookcate" class="botright">{{item.minorCate}}</div>
          </booklineone>
        </div>
      </div>

      <div class="modules">
        <titlemore class="bookline">
          <div slot="left-title">独家资源，火速更新</div>
          <div slot="right-title">更多</div>
        </titlemore>
        <div class="typetwo">
          <div class="spaceflex">
            <div
              class="booklinetwo"
              v-for="(item,index) in xiaozhong"
              :key="index"
              @click="getbook(item.title)"
            >
              <booklinetwo>
                <img slot="bookpic" class="bookp" :src="item.cover" alt />

                <span class="namestyle" slot="bookname">{{item.title}}</span>
                <span class="typestyle" slot="booktype">{{item.minorCate|twowords}}</span>
                <span slot="bookwordcount">{{item.latelyFollower}}人气</span>
              </booklinetwo>
            </div>
          </div>
        </div>
      </div>

      <div class="modules">
        <titlemore class="bookline">
          <div slot="left-title">无限剑制</div>
          <div slot="right-title">更多</div>
        </titlemore>
        <div
          class="booklineone"
          v-for="item in nansheng"
          :key="item.bookId"
          @click="getbook(item.title)"
        >
          <booklineone>
            <div slot="bookpic">
              <img class="bookp" :src="item.cover" alt />
            </div>
            <div slot="booktitle">
              <div slot="bookname" class="botleft">{{item.title}}</div>
            </div>
            <div slot="bookintro">{{item.shortIntro}}</div>

            <div slot="bookauthor" class="botleft">{{item.author}}</div>
            <div slot="bookcate" class="botright">{{item.minorCate}}</div>
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
import booklinethree from "@/components/bookmall/bookdistributionthree/bookline";
import booklinetwo from "@/components/bookmall/bookdistributiontwo/bookline";
import rowscroll from "@/components/bookmall/rowscroll/rows";
import {
  searchBook,
  hotWord,
  bookDetail,
  bookDirectory,
  boyBook,
  bookSort
} from "@/tools/allApi";
export default {
  name: "boylike",
  data() {
    return {
      active: 1,
      images: [],
      wholesort: [],
      zhongbang: [],
      nansheng: [],
      xiaozhong: [],
      ranks: [],
      rank1: [],
      rank2: [],
      oneplusfour: [],
      one: [],
      four: []
    };
  },
  components: {
    titlemore,
    booklineone,
    booklinetwo,
    booklinethree,
    rowscroll
  },
  mounted() {},
  beforeCreate() {},
  created() {
    this.gethotSelect();
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
      let result1 = await zgaxios("GET", boyBook);
      this.images = result1.data[0].advs;
      // console.log("result1----->", result1);
      this.zhongbang = result1.data[4].books;
      this.xiaozhong = result1.data[3].books;
      this.nansheng = result1.data[2].books;
      this.oneplusfour = result1.data[1].books;
      this.zhongbang.forEach(v => {
        v.cover = "http://statics.zhuishushenqi.com" + v.cover;
      });
      this.zhongbang = this.zhongbang.slice(0, 3);

      this.xiaozhong.forEach(v => {
        v.cover = "http://statics.zhuishushenqi.com" + v.cover;
      });
      this.xiaozhong = this.xiaozhong.slice(0, 4);

      this.nansheng.forEach(v => {
        v.cover = "http://statics.zhuishushenqi.com" + v.cover;
      });
      this.nansheng = this.nansheng.slice(0, 3);

      this.oneplusfour.forEach(v => {
        v.cover = "http://statics.zhuishushenqi.com" + v.cover;
      });
      this.one = this.oneplusfour.slice(0, 1);
      this.four = this.oneplusfour.slice(1, 5);
    }
  },
  filters: {
    twowords(words) {
      return words.slice(0, 2);
    }
  }
};
</script>

<style lang="scss" scoped>
#boylike {
  .container {
    padding-top: 0;
    padding-bottom: 0;

    /deep/.lunbobacg {
      height: 100px;
      width: 100%;
      border-bottom-left-radius: 50%;
      border-bottom-right-radius: 50%;
      background-color: #0f526f;

      .lunboarea {
        width: 90%;
        margin: 10px auto;
        .lunboimg {
          width: 100%;
        }
      }
    }
    /deep/::before {
      content: "";
      display: table;
    }
    /deep/.wholesort {
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
          box-shadow: 0 0 3px 3px #bbbaba;
        }
      }

      .typethree {
        width: 92%;
        margin: 0 auto;
        .floatleft {
          float: left;
          margin-right: 11.9px;
          margin-bottom: 16px;
        }
        .floatleft:nth-of-type(4n) {
          float: left;
          margin-right: 0;
        }

        .bookp {
          width: 75px !important;
          height: 100px;
          box-shadow: 0 0 3px 3px #d3d3d3;
        }
        .bookname {
          margin-top: 3px;
          font-size: 14px;
          font-weight: 500;
          color: black;
          word-break: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
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
              box-shadow: 0 0 3px 3px #bbbaba;
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