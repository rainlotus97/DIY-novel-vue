import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Cell,CellGroup,Tabbar, TabbarItem, NavBar, Icon, List, Slider, Lazyload, SwipeCell, Toast, Form, Field, Button, Tab, Tabs, Swipe, SwipeItem, Grid, GridItem, Sidebar, SidebarItem, Popup } from 'vant';
import 'lib-flexible'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueTouch from "vue-touch";
import moment from 'moment'

//点击图片放大
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
Vue.use(VueDirectiveImagePreviewer)

Vue.use(VueTouch, { name: "v-touch" });
Vue.use(Popup);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tab);
Vue.use(Tabs);

Vue.use(Cell);
Vue.use(CellGroup);

Vue.use(Lazyload);
Vue.use(Slider);
Vue.use(List);

Vue.use(Button);

Vue.use(Icon);
Vue.use(NavBar);
Vue.use(Tabbar);
Vue.use(Toast);
Vue.use(TabbarItem);
Vue.use(VueAwesomeSwiper)

Vue.use(SwipeCell);
Vue.use(Field);
Vue.use(Form);


Vue.filter('formatTime', function (data, format) {
  return moment(data).format(format);
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.afterEach((to, from, next) => {

  window.scrollTo(0, 0);

});