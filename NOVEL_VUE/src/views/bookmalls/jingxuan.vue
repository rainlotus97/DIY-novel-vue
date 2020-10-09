<template>
  <div id="jingxuan">
    <div class="container">
      <div class="lunbobacg">
        <div class="lunboarea">
          <van-swipe :autoplay="3000">
            <van-swipe-item
              v-for="(image, index) in images"
              :key="index"
              @click="getbook(image.title)"
            >
              <img class="lunboimg" v-lazy="image.img" />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="wholesort">
        <van-grid class="routeto" clickable :column-num="5" :border="false">
          <van-grid-item
            v-for="(item, index) in wholesort"
            :key="index"
            :icon="item.img"
            :text="item.title"
            @click="changepage(index)"
          />
        </van-grid>
      </div>

      <rowscroll>
        <div
          class="bookrank"
          slot="bookrank2"
          v-for="(item,index) in rank2"
          @click="getbook(item.title)"
          :key="index"
        >
          <img class="rank" slot="rank2" v-if="index==0" src="@/assets/images/rank/1.png" alt />
          <img class="rank" slot="rank2" v-else-if="index==1" src="@/assets/images/rank/2.png" alt />
          <img class="rank" slot="rank2" v-else-if="index==2" src="@/assets/images/rank/3.png" alt />
          <img class="rank" slot="rank2" v-else-if="index==3" src="@/assets/images/rank/4.png" alt />
          <img class="rank" slot="rank2" v-else-if="index==4" src="@/assets/images/rank/5.png" alt />
          <div class="ign" slot="ign1">{{item.title}}</div>
        </div>

        <div
          class="bookrank"
          slot="bookrank1"
          v-for="(item,index) in rank1"
          @click="getbook(item.title)"
          :key="item.title"
        >
          <img class="rank" slot="rank1" v-if="index==0" src="@/assets/images/rank/1.png" alt />
          <img class="rank" slot="rank1" v-else-if="index==1" src="@/assets/images/rank/2.png" alt />
          <img class="rank" slot="rank1" v-else-if="index==2" src="@/assets/images/rank/3.png" alt />
          <img class="rank" slot="rank1" v-else-if="index==3" src="@/assets/images/rank/4.png" alt />
          <img class="rank" slot="rank1" v-else-if="index==4" src="@/assets/images/rank/5.png" alt />
          <div class="ign" slot="ign1">{{item.title}}</div>
        </div>
      </rowscroll>

      <div class="modules">
        <titlemore class="bookline">
          <div slot="left-title">重磅推荐</div>
          <div slot="right-title">更多</div>
        </titlemore>
        <div
          class="booklineone"
          v-for="(item,index) in zhongbang"
          @click="cpnClick(item.title)"
          :key="index"
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
          <div slot="left-title">小众优选</div>
          <div slot="right-title">更多</div>
        </titlemore>
        <div class="typetwo">
          <div class="spaceflex">
            <div
              class="booklinetwo"
              v-for="(item,index) in xiaozhong"
              @click="cpnClick(item.title)"
              :key="index"
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
          <div slot="left-title">非你莫属</div>
          <div slot="right-title">更多</div>
        </titlemore>
        <div v-for="item in nansheng" :key="item.bookId" @click="cpnClick(item.title)">
          <booklineone class="booklineone">
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
import booklinethree from "@/components/bookmall/bookdistributionthree/bookline";
import rowscroll from "@/components/bookmall/rowscroll/rows";
import {
  searchBook,
  hotWord,
  bookDetail,
  bookDirectory,
  hotSelect,
  bookSort
} from "@/tools/allApi";
export default {
  name: "jingxuan",
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
      rank2: []
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
      // console.log(result1);

      if (result1.data[3].advs) {
        this.ranks = result1.data[3].advs;
      } else if (result1.data[4].advs) {
        this.ranks = result1.data[4].advs;
      }

      this.images = result1.data[0].advs;
      this.wholesort = result1.data[1].advs;
      // console.log(this.wholesort);

      // console.log("result1----->", result1);
      this.rank1 = this.ranks[0].books;
      this.rank2 = this.ranks[1].books;
    },
    async getbookSort() {
      // console.log(
      //   "this.$store.state.yuenovel----->",
      //   this.$store.state.yuenovel
      // );

      if (
        this.$store.state.yuenovel.length != 0 &&
        typeof this.$store.state.yuenovel == "object"
      ) {
        for (let i = 0; i < 3; i++) {
          this.zhongbang.push(this.$store.state.yuenovel[i]);
        }
        for (let i = 3; i < 6; i++) {
          this.nansheng.push(this.$store.state.yuenovel[i]);
        }
        for (let i = 6; i < 10; i++) {
          this.xiaozhong.push(this.$store.state.yuenovel[i]);
        }
      } else {
        //vuex里没有数据才调用接口读取数据
        let result3 = await zgaxios("GET", bookSort, {
          channelId: 1,
          rankId: 101,
          pageNum: 1,
          pageSize: 100
        });
        //处理result3里的数据（字数大于20万的才保留）

        let result = result3.data.list.filter(v => {
          return parseInt(v.word) > 20;
        });

        // console.log("result--------->",result);

        this.$store.commit("getNovel", result);

        for (let i = 0; i < 3; i++) {
          this.zhongbang.push(this.$store.state.yuenovel[i]);
        }
        for (let i = 3; i < 6; i++) {
          this.nansheng.push(this.$store.state.yuenovel[i]);
        }
        for (let i = 6; i < 10; i++) {
          this.xiaozhong.push(this.$store.state.yuenovel[i]);
        }
      }
    },
    changepage(index) {
      // console.log("event------>", index);
      if (index == 0) {
        this.$router.push("/sort");
      } else if (index == 1) {
        this.$router.push("/rank");
      } else if (index == 2) {
        this.$toast("此功能正在开发中");
      } else if (index == 3) {
        this.$router.push("/daily");
      } else if (index == 4) {
        this.$toast("此功能正在开发中");
      }
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
#jingxuan {
  .container {
    padding-top: 0;
    padding-bottom: 0;

    /deep/.lunbobacg {
      height: 100px;
      width: 100%;
      border-bottom-left-radius: 50%;
      border-bottom-right-radius: 50%;
      background-color: #455473;

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
      height: 100px;
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
    /* /agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F3444659%2F3444659_d6093141103647418727ef2204b0f09c.jpg%2F */
    /* http://statics.zhuishushenqi.com/agent/http%3A%2F%2Fimg.1391.com%2Fapi%2Fv1%2Fbookcenter%2Fcover%2F1%2F3438190%2F3438190_4b51f61921814c4b91abac9abf59cae8.jpg%2F */
    /deep/.modules {
      border-bottom: 10px solid #e5e5e5;
      /deep/.booklineone {
        .bookp {
          width: 90px !important;
          height: 120px !important;
          box-shadow: 0 0 3px 3px #d3d1d1;
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
