<template>
    <div>
        <!--图文列表-->
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media"
                v-for="item in newsArr"
                :key="item.id"
            >
                <router-link :to="'/home/newsInfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h2 class="size-bold">{{item.title}}</h2>
                        <p class="mui-ellipsis">
                            <span class="size-blue">发表时间: {{item.add_time | dateFormat('YYYY-MM-DD HH:mm:ss')}}</span>
                            <span class="size-blue" style="float: right">点击次数: {{item.click}}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        name: "newsList",
        data(){
            return{
                newsArr:[],
            }
        },
        methods:{
            getNews(){
                this.$http.get('http://www.liulongbin.top:3005/api/getnewslist').then(result=>{
                    console.log(result);
                    if (result.body.status===0){
                        this.newsArr = result.body.message
                    }else{
                        Toast('获取数据失败')
                    }
                })
            }
        },
        created(){
            this.getNews();
        }
    }
</script>

<style scoped>
    .size-blue{
        font-size: 12px;
        color: #226aff;
    }
    .size-bold{
        font-size: 14px;
    }
</style>