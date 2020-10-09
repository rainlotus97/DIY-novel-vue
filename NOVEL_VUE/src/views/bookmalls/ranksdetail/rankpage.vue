<template>
  <div id="rankpage">
    <div class="wrap">
      <div class="cont">
        <div class="state">
          <van-sidebar @change="onChange" v-model="activeKey">
            <van-sidebar-item
              @click="changebooklist"
              v-for="(item,index) in bookslists"
              :key="index"
              :title="item.title"
            />
          </van-sidebar>
        </div>
      </div>
    </div>

    <div class="wrap">
      <div class="cont" ref="offsetzero">
        <div class="state">
          <div
            class="stateright"
            v-for="(item,index) in books"
            :key="index"
            @click="getbookname(item.title)"
          >
            <booklineone class="booklineone">
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
  </div>
</template>

<script>
import zgaxios from "@/tools/zgaxios";
import { rank1, rank2, bookDetail } from "@/tools/allApi";
import booklineone from "@/components/bookmall/bookdistributionone/bookline";
export default {
  name: "rankpage",
  props: {
    cactive: {
      type: Number
    }
  },
  data() {
    return {
      activeKey: 0,
      active: this.cactive,
      bookslists: [],
      index: 0,
      books: []
    };
  },
  components: {
    booklineone
  },
  created() {
    this.getbooklists();
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

    async getbookname(item) {
      //   console.log("点击获取到的书名是", item);
      let getbookdetail = await zgaxios("GET", bookDetail + item);
      console.log("搜索到的书籍", getbookdetail);
      /* let result = getbookdetail.filter(v=>{
          v.title==item
      }) */
      if (getbookdetail.code == 0) {
        let result = getbookdetail.list.filter(v => {
          return (
            (v.name == item &&
              v.cover &&
              v.introduce.length > 3 &&
              v.num &&
              v.tag &&
              v.url) ||
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
    onChange(index) {
      this.index = index;
    },
    changebooklist() {
      this.getbooklists();
      console.log(
        "this.$refs.offsetzero------->",
        this.$refs.offsetzero.scrollTop
      );
      this.$refs.offsetzero.scrollTop = 0;
    },
    async getbooklists() {
      let getlistresult = await zgaxios("GET", rank1);
      if (this.active == 0) {
        this.bookslists = getlistresult.data.nodes[2].nodes;
      } else if (this.active == 1) {
        this.bookslists = getlistresult.data.nodes[0].nodes;
      } else {
        this.bookslists = getlistresult.data.nodes[1].nodes;
      }
      let url1 = this.bookslists[this.index].id;
      let url2 =
        "&token=uvuNs0kRL7nag4AV4bec5f20df1872b61396568a7e04a1968b80f4a3932cdef2cca1efdaba506d9c6da10425affab84ba0cf4e3dc14bdeba6ab75e22385af3a74607a30ac1213586819bef887e07901940337d56d6dbb53f&type=&packageName=com.ushaqi.zhuishushenqi&userid=5f5f26bb2e7292430d2882a3";
      let getallbooklist = await zgaxios("GET", rank2 + url1 + url2);
      this.books = getallbooklist.book;
    }
  }
};
</script>

<style lang="scss" scoped>
#rankpage {
  .wrap {
    width: 80px;
    float: left;
    /* overflow: hidden; */
    height: calc(100vh -190px);
  }
  .wrap:nth-of-type(2) {
    width: calc(100vw - 80px);
    /* background-color: red; */
  }
  .cont {
    height: calc(100vh - 190px);
    /* overflow-x: hidden; */
    overflow-y: auto;
    position: relative;
  }
  .state {
    width: 100%;
    left: 0px;
    top: 0px;
    position: absolute;
    height: calc(100vh - 190px); /* 
    background-color: rgb(84, 46, 69); */
    /* overflow-x: auto; */
    white-space: nowrap;
  }
  .stateright {
    /* left: 80px;
    top: 0px;
    position: absolute; */
    /deep/.booklineone {
      width: 98%;
      border-bottom: 1px solid #d3d3d3;
      /* width: 60%; */
      .pic {
        margin-top: 10px;
        margin-left: 10px;
        width: 70px !important;
        height: 100px !important;
        .bookp {
          width: 70px !important;
          height: 100px !important;
          box-shadow: 0 0 3px 3px #d3d1d1;
        }
      }
      .info {
        width: 70%;
        .title {
          margin-top: 5px;
          width: 80%;
          .botleft {
            font-size: 16px;
            width: 100%;
            word-break: break-word;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            /* display: -webkit-box; */
            -webkit-box-orient: vertical;
          }
        }
        .intro {
          height: 48px;
          div {
            word-break: break-word !important;
            /* word-wrap: break-word; */
            white-space: normal;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            -webkit-line-clamp: 2 !important;
            display: -webkit-box !important;
            -webkit-box-orient: vertical !important;
          }
        }
        .author {
          .bookcate {
            border-radius: 12px;
            width: 60px;
            border: none;
            background-color: #efeff4;
            font-size: 3px;
          }
        }
      }
    }
  }

  .state van-sidebar-item {
    display: inline-block;
    font-size: 13px;
    text-decoration: none;
    color: #999;
    padding: 1px 5px;
    border-bottom: 2px solid rgb(84, 46, 69);
  }

  .state .active {
    font-weight: bold;
    color: #ff6c00;
    border-color: rgb(84, 46, 69);
  }
}
</style>
