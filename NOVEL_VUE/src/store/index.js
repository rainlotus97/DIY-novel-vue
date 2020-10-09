import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bookUrl: "",//默认书页，暂定
    bookList: [], //书籍列表
    name: '',  //书名称
    searchHistory: [], //搜索所产生的记录
    bookdetail: [],//书籍详情信息
    status: 0,
    info: {
      "code": 200,
      "msg": "登录成功",
      "data": {
        "id": 24,
        "username": "13063206329",
        "userpic": "http://himg.bdimg.com/sys/portrait/item/95fde99d96e584bf32303036c700.jpg",
        "password": "123456",
        "phone": "13063206329",
        "email": null,
        "status": "0",
        "create_time": 1601031031420,
        "userinfo": {
          "age": 18,
          "sex": "2",
          "job": "未设置",
          "path": null,
          "birthday": null
        }
      }
    },
    recommend: [],
    cartoonTitle:[],
    yuenovel:[],
    detailbooks:[],
    handledbooks:[],
    booktype:"",
    bookgender:"",
    searchinput:'',
  },
  mutations: {
    getBookUrl(state, url) {
      state.bookUrl = url
    },
    getSearchInput(state, value) {
      state.searchinput = value
    },
    getbookList(state, list) {
      state.bookList = list
    },
    getbookName(state, name) {
      state.name = name
    },
    getBookDetail(state, detail) {
      state.bookdetail = detail
    },
    setHistory(state, data) {
      state.searchHistory.unshift(data)
    },
    clearHistory(state, data) {
      state.searchHistory = data
    },
    // 登录
    getStatus(state, status) {
      state.status = status
    },
    getInfo(state, info) {
      state.info = info
    },
    getRecommend(state, recommend) {
      state.recommend = recommend
    },
    getCartoon(state,novel){
      state.cartoonTitle=novel
    },
    getNovel(state,novel){
      if(state.yuenovel){
        state.yuenovel=[];
        state.yuenovel=novel
      }else{
        state.yuenovel=novel
      }
    },
    getdetailBooks(state,alibooks){
      if(state.detailbooks){
        state.detailbooks=[];
        state.detailbooks=alibooks
        state.handledbooks=state.detailbooks
      }else{
        state.detailbooks=alibooks;
        state.handledbooks=state.detailbooks
      }
    },
    getbookType(state,type){
      if(state.booktype){
        state.booktype=[];
        state.booktype=type
      }else{
        state.booktype=type
      }
    },
    getbookGender(state,gender){
      if(state.bookgender){
        state.bookgender=[];
        state.bookgender=gender
      }else{
        state.bookgender=gender
      }
    },
    handledetailbooks(state,index){
      
      if(index=="评分"){
        state.detailbooks.sort((a, b) => b['weight'] - a['weight']);
      }else if(index=="字数"){
        state.detailbooks.sort((a, b) => b['wordCount'] - a['wordCount']);
      }else if(index=="人气"){
        state.detailbooks.sort((a, b) => b['latelyFollower'] - a['latelyFollower']);
      }else if(index!=undefined){
        state.detailbooks = state.handledbooks
        
        state.detailbooks = state.detailbooks.filter(v=>{
          return v['minorCate'] == index
        })
      }else if(index==undefined){
        state.detailbooks = state.handledbooks
      }
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
