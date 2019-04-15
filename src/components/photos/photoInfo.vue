<template>
    <div class="photoInfo_container">
        <h4 class="title">{{photoInfo.title}}</h4>
        <p class="subTitle">
            <span>发表时间:{{photoInfo.add_time | dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
            <span>点击次数:{{photoInfo.click}}次</span>
        </p>
        <hr>
        <!--缩略图区域-->
        <div class="thumbs">
            <vue-preview :slides="list" ></vue-preview>
        </div>

        <!--图片内容区域-->
        <div v-html="photoInfo.content" style="margin-bottom: 20px;font-size: 14px"></div>

        <!--评论区域-->
        <!--3.调用子组件-->
        <comment :id="id">

        </comment>
    </div>
</template>

<script>
    //1.导入子组件  评论
    import comment from '../subcomponents/comment.vue'

    export default {
        name: "pootoInfo",
        components:{
            //2.定义子组件
            comment:comment,
        },
        data(){
            return{
                id:this.$route.params.id,
                list:[], //存放缩略图
                photoInfo:[]
            }
        },
        methods:{
            //获取详情数据
            getPhotoInfo(){
                this.$http.get('api/getimageInfo/'+this.id).then(result=>{
                    if (result.body.status===0){
                        this.photoInfo=result.body.message[0];
                    }
                })
            },
            //获取缩略图的数据
            getThumbs(){
                this.$http.get('api/getthumimages/'+this.id).then(result=>{
                    if (result.body.status===0){
                        console.log(result.body.message);
                        //遍历的补全图片的参数, 宽,高,和小图
                        result.body.message.forEach(item=>{
                            //设置每条数据的小图,宽,高
                            item.msrc = item.src;
                            item.w = 600;
                            item.h =400;

                        })
                        //保存到list中
                        this.list=result.body.message
                    }
                })
            }
        },
        created(){
            this.getThumbs()
            this.getPhotoInfo()
        }
    }
</script>

<style scoped lang="scss">
    .photoInfo_container{
        padding:0px 5px;
        .title{
            font-size: 16px;
            text-align: center;
            color: blue;
            margin: 20px 0;
            text-align: left;
        }
        .subTitle{
            display: flex;
            justify-content: space-between;
            color: #999;
            font-size: 14px;
        }
    }
    /*//缩略图的样式*/
    /*figure{*/
        /*display: inline-block;*/
        /*img{*/
            /*width: 80px;*/
            /*height: 55px;*/
        /*}*/
    /*}*/
</style>