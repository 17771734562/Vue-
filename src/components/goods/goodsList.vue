<template>
    <div class="goods_List">
        <!--<router-link tag="div" :to="'/home/goodsInfo'+item.id" class="goods_item" v-for="item in goodsList" :key="item.id">-->
            <!--<img :src="item.img_url">-->
            <!--<h2 class="title">{{item.title}}</h2>-->
            <!--<div class="info">-->
                <!--<p class="price">-->
                    <!--<span class="now">¥{{item.sell_price}}元</span>-->
                    <!--<span class="old">¥{{item.market_price}}元</span>-->
                <!--</p>-->
                <!--<p class="sell">-->
                    <!--<span>热卖中</span>-->
                    <!--<span>剩余{{item.stock_quantity}}件</span>-->
                <!--</p>-->
            <!--</div>-->
        <!--</router-link>-->
        <div @click="goDetail(item.id)" class="goods_item" v-for="item in goodsList" :key="item.id">
            <img :src="item.img_url">
            <h2 class="title">{{item.title}}</h2>
            <div class="info">
                <p class="price">
                    <span class="now">¥{{item.sell_price}}元</span>
                    <span class="old">¥{{item.market_price}}元</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <button class="mint-button mint-button--danger mint-button--large">
            <label class="mint-button-text" @click="getMore">加载更多</label>
        </button>
    </div>
</template>

<script>
    export default {
        name: "goodsList",
        data(){
            return{
                goodsList:[],
                pageindex:1
            }
        },
        methods:{
            getGoodsList(){
                this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result=>{
                    console.log(result.body);
                    if (result.body.status===0){
                        // this.goodsList=result.body.message
                        this.goodsList = this.goodsList.concat(result.body.message)
                    }
                })
            },
            getMore(){
                this.pageindex++;
                this.getGoodsList();
            },
            //使用js跳转路由
            goDetail(id){
                console.log(this);
                // this.$route  :路由的参数对象
                //this,$router :路由的导航对象,用他可以方便的使用js代码，实现路由前进go，后退forback，跳转到新的url地址
                //1.最简单的
                this.$router.push('/home/goodsInfo/'+id);
                //2.传递对象
                // this.$router.push({path:'/home/goodsInfo/'+id});
                //3.传递命名的路由
                // this.$router.push({name:'goodsInfo',params:{id:id}})

            }
        },
        created(){
            this.getGoodsList();
        }
    }
</script>

<style scoped lang="scss">
    .goods_List{
        display: flex;
        /*两端对齐*/
        justify-content: space-between;
        /*让子元素在必要时拆行*/
        flex-wrap:wrap;
        padding: 8px;
        .goods_item{
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 10px #ccc;
            margin: 5px 0;
            display: flex;
            /*设置垂直方向*/
            flex-direction: column;
            /*垂直分配上下布局*/
            justify-content: space-between;
            img{
                width: 100%;
            }
            .title{
                font-size: 14px;
            }
            .info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 5px;
                    .now{
                        color: red;
                        font-weight: bolder;
                        font-size: 16px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 15px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
</style>