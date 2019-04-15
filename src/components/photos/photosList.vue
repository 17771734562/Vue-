<template>
    <div>
        <!--顶部tabbar选项模块-->
        <div id="slider" class="mui-slider" data-slider="4">
            <div id="sliderSegmentedControl" class="mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mui-scroll-wrapper">
                <!--区域滚动模块-->
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id==0?'mui-active':'']"
                       href="#item1mobile"
                       v-for="item in cates" :key="item.id"
                       @click="getPhotosList(item.id)"
                    >
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <!--图文列表区域-->
        <ul class="photoList">
            <router-link tag="li" v-for="item in photosList" :key="item.id"
                :to="'/home/photoInfo/'+item.id"
            >
                <img v-lazy="item.img_url" alt="">
                <div class="textphotos">
                    <h4 class="mui-ellipsis-2">{{item.title}}</h4>
                    <span class="mui-ellipsis-2">{{item.zhaiyao}}</span>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
    //1.局部导入js文件
    import mui from '../../lib/mui/js/mui.min.js'
    // 报错 分析:1.mui.js可能用到了caller,callee,arguments等属性,但是webpack打包好的main.js中,可以能默认启用了严格模式,所以两者冲突
    //解决方案 1:把mui.js中的非严格模式的代码改掉,不现实
    //          2:把webpack打包时的严格模式禁用掉,用插件:babel-plugin-transform-remove-strict-mode
    export default {
        name: "photosList",
        data(){
            return {
                cates:[],
                photosList:[],
            }
        },

        //在mounted里面操作,代表DOM元素已经渲染完成
        mounted(){
            //2.初始化滑动控件 会有报错,要禁止浏览器自带的触摸事件
            mui('.mui-scroll-wrapper').scroll({
                deceleration:0.0005
            });
            //3.tabbar栏失效,样式与导入的mui.js冲突,修改了mui-tab-item的类名,样式不变
        },
        methods:{
            //4.获取图片分类的数据
            getAllCategory(){
                this.$http.get('api/getimgcategory').then(result=>{
                    if (result.body.status===0){
                        result.body.message.unshift({title:'全部',id:0})
                        this.cates = result.body.message;
                    }
                })
            },
            //5.点击图片分类显示对应的图片列表
            getPhotosList(id){
                this.$http.get('api/getimages/'+id).then(result=>{
                    if (result.body.status===0){
                        this.photosList=result.body.message
                    }
                })
            }
        },
        created(){
            this.getAllCategory()
            this.getPhotosList(0)
        }
    }
</script>

<style scoped lang="scss">
    /*禁止浏览器自带的触摸事件,但是pan-y可以触发*/
    *{
        touch-action:pan-y;
    }
    .photoList{
        margin: 0;
        padding: 5px;
        li{
            background-color: #ccc;
            text-align: center;
            list-style: none;
            margin-bottom: 10px;
            box-shadow: 0 0 20px #999;
            position: relative;
            img{
                width: 100%;
                display: block;
            }
            img[lazy=loading]{
                width: 40px;
                height: 300px;
                margin: auto;
            }
            .textphotos{
                position: absolute;
                bottom: 0;
                background-color: rgba(0,0,0,0.5);
                color: #fff;
                text-align: left;
            }
        }
    }
</style>