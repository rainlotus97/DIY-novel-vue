<template>
  <div class="container">
    <h2>书架</h2>
  </div>
</template>

<script>
// import NavBar from '../components/navBar/NavBar'
import zgaxios from "../tools/zgaxios";
// import {sendcode,codePhoneLogin} from '../tools/allApi'
/* import {
  searchBook,
  hotWord,
  bookDetail,
  bookDirectory,
  hotSelect,
  bookSort
} from "../tools/allApi"; */

export default {
  name: "shelf",
  data() {
    return {
      res: []
    };
  },
  created() {
    // this.sendcode(13063206312)
    // this.login(13063206312,9113,123)
    // this.getBook();
    // this.gethotWord()
    //  await this.getbookDetail();
    //  await this.getbookDirectory();
    //  this.gethotSelect();
    // this.getbookSort();
  },
  components: {
    // NavBar
  },
  mounted() {},
  methods: {
    //   async getBook(){
    //     let result = await zgaxios("POST",searchBook,{
    //       'keyWord':'斗罗大陆',
    //       'pageNum':1,
    //       'pageSize':10
    //     })
    //     console.log(result);
    //   },
    // async getbookDetail() {
    //   let result2 = await zgaxios("GET", bookDetail + "斗罗大陆");
    //   //筛选优质书籍
    //   let res = result2.list.filter(v => {
    //     if (
    //       v.url &&
    //       v.cover &&
    //       v.introduce.length > 10 &&
    //       v.time &&
    //       v.tag &&
    //       v.author
    //     ) {
    //       return true;
    //     }
    //   });
    //   this.res=res
    // },
    // async getbookDirectory() {
    //   let bookName = this.res[0]['url']
    //   let result3 = await zgaxios("GET",bookDirectory + bookName);
    //   console.log("result3--->",result3);
    // }
    // async gethotSelect(){
    //   let result3 = await zgaxios("GET",hotSelect);
    //   console.log(result3);
    // }
    // async getbookSort() {
    //   let result3 = await zgaxios("GET", bookSort, {
    //     'channelId': 1,
    //     'rankId': 101,
    //     'pageNum': 1,
    //     'pageSize': 20
    //   });
    //   console.log(result3);
      
    // }
  //   async sendcode(phone){
  //     let result = await zgaxios("get",sendcode,{
  //       phone
  //     });
  //     console.log(result);
  //   },
  //   async login(phone,code,password){
  //     let result = await zgaxios("get",codePhoneLogin,{
  //       phone,
  //       code,
  //       password
  //     });
  //     console.log(result);
  //   }
  }
};
</script>

<style lang='scss' scoped>
</style>