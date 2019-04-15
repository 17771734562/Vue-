//1.导入路由模块
import VueRouter from 'vue-router'
//导入vue
import Vue from 'vue'
//安装路由
Vue.use(VueRouter)
//2.导入对应的路由组件
import Home from './components/tabbar/home.vue'
import Member from './components/tabbar/member.vue'
import Shopcar from './components/tabbar/shopcar.vue'
import Search from './components/tabbar/search.vue'
import NewsList from './components/news/newsList.vue'
import NewsInfo from './components/news/newsInfo.vue'
import PhotosList from './components/photos/photosList.vue'
import PhotoInfo from './components/photos/photoInfo.vue'

//3.创建路由对象
let router = new VueRouter({
    //设置路由切换高亮显示
    linkActiveClass:'mui-active',
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:Home},
        {path:'/member',component:Member},
        {path:'/shopcar',component:Shopcar},
        {path:'/search',component:Search},
        {path:'/home/newsList',component:NewsList},
        {path:'/home/newsInfo/:id',component:NewsInfo},
        {path:'/home/photosList/',component:PhotosList},
        {path:'/home/photoInfo/:id/',component:PhotoInfo},
    ]
})

//4.把路由对象暴露出去
export default router