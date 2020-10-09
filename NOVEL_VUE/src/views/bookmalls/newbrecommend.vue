<template>
  <div id="newbrecommend">
    <div class="tabtoggle">
      <van-tabs
        v-model="active"
        animated
        swipeable
        swipe-threshold="7"
        background="#f7f8fa"
        title-active-color="#f7f8fa"
        title-inactive-color="#f7f8fa"
        color="#f7f8fa"
      >
        <van-tab v-for="(item,index) in books" :key="index">
          <template #title>
            <img
              class="topimg"
              :src="item.cover"
              alt
            />
          </template>

          <model v-bind:cbooks="item"></model>
        </van-tab>
        
      </van-tabs>
    </div>
  </div>
</template>

<script>
import model from "@/views/bookmalls/recommends/recmodel";
import zgaxios from "@/tools/zgaxios";
import {bookRecommend} from "@/tools/allApi";
export default {
  name: "newbrecommend",
  data() {
    return {
        books:[],
        active:1,
    };
  },
  created() {
      this.getrecommend()
  },
  mounted() {},
  methods: {
      async getrecommend(){
        let result = await zgaxios("GET", bookRecommend); 

        let res = result.data[0].books.filter(v=>{
            return v.title!="我只想当一个低调的男神"
        })
        if(res.length>5){
           res = res.slice(0,5)
        }
        res.forEach(v => {
        v.cover = "http://statics.zhuishushenqi.com" + v.cover;
      });
        this.books = res
      },
  },
  components: {
    model
  },
  
};
</script>

<style lang="scss" scoped>
#newbrecommend {
  background: #f7f8fa;
  .tabtoggle {
    background: #f7f8fa;
    height:calc(100vh - 144px);

    .van-tabs {
      height: 100px;

      /deep/.van-tabs__wrap {
        height: 90px;
        width: 260px;
        margin: 20px auto;

        .topimg {
          width: 42px;
          height: 60px;
          box-shadow: 3px 3px 6px #797676;
        }
        .van-tab {
          opacity: 0.6;
        }
        .van-tab--active {
          /* width: 50px;
            height: 70px; */
          opacity: 1;
          .topimg {
            width: 56px;
            height: 78px;
          }
        }
      }
    }
    .van-tabs::before {
      display: table;
      content: "";
    }
  }
}
</style>
