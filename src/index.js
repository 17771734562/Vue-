//1.导入
//导入vue
import Vue from 'vue'
import app from './app.vue'
//导入路由模板
import router from './router.js'
//导入mui模块
import './lib/mui/css/mui.min.css'

//导入mui扩展图标
import './lib/mui/css/icons-extra.css'
//导入mint-ui
import MintUi from 'mint-ui'
Vue.use(MintUi)
import 'mint-ui/lib/style.css'
//导入vue-resourece模块
import VueResource from 'vue-resource'
Vue.use(VueResource)
//全局配置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/'
//全局配置post请求时表单数据的格式为普通表单格式
Vue.http.options.emulateJSON = true;

//导入moment时间插件
import Moment from 'moment'
//全局使用
Vue.filter('dateFormat',function (dataStr,pattern='YYYY-MM-DD HH:mm:ss') {
    //参数①:需要格式化的时间的数据  ②:时间的格式
    return Moment(dataStr).format(pattern)
})
//导入图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import '../src/app.scss'


let vm = new Vue({
    el:'#app',
    render:c => c(app),
    router
})