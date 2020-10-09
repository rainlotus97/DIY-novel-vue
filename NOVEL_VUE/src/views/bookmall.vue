<template>
  <div id="bookmall" class="container">
    <nav-bar ref="changenavcolor" :class="`navcolor-${navNum}`">
      <div :class="`micolor-${navNum}`" slot="center-item">
        <div class="picdv">
          <img class="pic" src="@/assets/images/fangdajing/fangdajing.png" alt />
        </div>
        <input type="text" name :class="`inputcolor-${navNum}` " class="inputs" placeholder="重生之顶级人生" @click="toSearch"/>
      </div>
      <div slot="right-item">
        <div class="shucheng">书城</div>
      </div>
    </nav-bar>
    <div class="tabs">
      <van-tabs
        v-model="active"
        :background="vantBgcolor"
        title-active-color="#fff"
        title-inactive-color="#fff"
        color="#fff"
        line-width="20"
        ref="changecolor"
        @click="changecolor"
        animated 
        
      >
        <van-tab title="新人推荐">
          <newbrecommend></newbrecommend>
        </van-tab>
        <van-tab title="精选">
          <jingxuan></jingxuan>
        </van-tab>
        <van-tab title="新书">
          <newbooks></newbooks>
        </van-tab>
        <van-tab title="男频">
          <boylike></boylike>
        </van-tab>
        <van-tab title="女频">
          <girllike></girllike>
        </van-tab>
      </van-tabs>
      <router-view></router-view>
    </div>
  </div>

  <!-- http://statics.zhuishushenqi.com/ -->
</template>

<script>
import NavBar from "@/components/navBar/NavBar";
import titlemore from "@/components/bookmall/titlemore/title";
import jingxuan from "@/views/bookmalls/jingxuan";
import newbooks from "@/views/bookmalls/newbooks";
import boylike from "@/views/bookmalls/boylike";
import girllike from "@/views/bookmalls/girllike";
import newbrecommend from "@/views/bookmalls/newbrecommend";
export default {
  name: "bookmall",
  data() {
    return {
      active: 1,
      vantBgcolor: "#455473",
      colorList: ["#ce5655", "#455473", "#303032", "#0f526f", "#eb423d"],
      navNum: 1
    };
  },
  components: {
    NavBar,
    titlemore,
    jingxuan,
    newbooks,
    boylike,
    girllike,
    newbrecommend
  },
  methods: {
    changecolor(event) {
      console.log(event);
      this.vantBgcolor = this.colorList[event];
      this.navNum = event;
    },
    toSearch(){
      this.$store.commit("getSearchInput","")
      this.$router.push("/search")
    }
  },
  mounted() {},
  beforeCreate() {},
  created() {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
$colors: (
  "0": #ce5655,
  "1": #455473,
  "2": #303032,
  "3": #0f526f,
  "4": #eb423d
);
@each $colorkey, $color in $colors {
  /deep/ .navcolor-#{$colorkey} {
    background-color: $color;
  }
}

$colors2: (
  "0": #e19393,
  "1": #8792a6,
  "2": #7b7b7d,
  "3": #6590a3,
  "4": #e19393
);
@each $colorkey2, $color2 in $colors2 {
  /deep/ .inputcolor-#{$colorkey2} {
    background-color: $color2;
  }
}

$colors3: (
  "0": #e19393,
  "1": #8792a6,
  "2": #7b7b7d,
  "3": #6590a3,
  "4": #e19393
);
@each $colorkey3, $color3 in $colors3 {
  /deep/ .micolor-#{$colorkey3} {
    background-color: $color3;
    height: 36px;
    /* position: absolute;
    top: 0; */
  }
}

.container {
  /deep/ #nav-bar {
    z-index: 20;
    .left {
      width: 0;
      overflow: hidden;
    }
    .center {
      width: 72%;
      margin-left: 10px;
      /* background-color: #8792a6; */
      position: relative;
      .picdv {
        width: 22px;
        height: 33px;
        margin-top: 0px;
        margin-left: 10px;
        padding-top:7px;
        .pic {
          width: 20px;
          height: 20px;
        }
      }
      .inputs {
        position: absolute;
        /* background-color: #8792a6; */
        color: #fff;
        border: none;
        outline: none;
        width: 210px;
        height: 32px;
        top: 2px;
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

      .shucheng {
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

  /deep/ .tabs {
    .van-tab {
      font-size: 14px;
    }
    .van-tab--active {
      font-size: 16px;
    }
  }
}
</style>