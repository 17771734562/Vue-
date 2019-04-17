<template>
    <div class="goodsIngo_container">
        <!--点击购物车小球-->
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="flag"></div>
        </transition>



        <!--商品轮播图区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :bannerList="banner"></swiper>
                </div>
            </div>
        </div>
        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header">{{content.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价: <del>{{content.market_price}}元</del>
                        销售价: <span class="nowPrice">{{content.sell_price}}元</span>
                    </p>
                    <p>
                        购买数量:个
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!--商品参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{content.goods_no}}</p>
                    <p>商品情况:{{content.stock_quantity}}</p>
                    <p>上架时间:{{content.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="getText(content.id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="getComment(content.id)">商品评论</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
    import swiper from '../subcomponents/swiper.vue'
    import comment from '../subcomponents/comment.vue'
    export default {
        name: "goodsInfo",
        components:{
            swiper,
            comment
        },
        data(){
            return{
                id:this.$route.params.id,
                banner:[],//轮播图数据
                content:[],//内容数据
                flag:false,
            }
        },
        methods:{
            //1.获取轮播图数据
            getBanner(){
                this.$http.get('api/getthumimages/'+this.id).then(result=>{
                    if (result.body.status===0){
                        //封装好的组件设置的是item.img ,这里是src 不一致,所以遍历的追加一个item.img
                        this.banner = result.body.message.forEach(item=>{
                            item.img=item.src
                        })
                        this.banner=result.body.message
                    }
                })
            },
            getContent(){
                this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                    if (result.body.status===0){
                        console.log(result.body);
                        this.content=result.body.message[0]
                    }
                })
            },
            /*点击跳转图文介绍*/
            getText(id){
                this.$router.push('/home/goodsPresent/'+id)
            },
            /*点击跳转评论*/
            getComment(id){
                this.$router.push('/home/goodsComment/'+id)
            },
            //点击添加购物车小球
            addCar(){
                this.flag=!this.flag
            },
            //设置小球的动画
            beforeEnter(el){
                // if (!this.isShow)return false;
                // this.isShow = true ;
                el.style.transform='translate(0,0)'
            },
            enter(el,done){
                el.offsetWidth;//强制刷新过度效果

                //解决因分辨率不同,需要计算坐标值 Element.getBoundingClientRect()
                //获取小球的位置
                let ball = document.querySelector(".ball").getBoundingClientRect()
                //获取徽标的位置 :关于DOM元素和所在的组件没有任何关系
                let badge = document.querySelector(".mui-badge").getBoundingClientRect()
                console.log(ball,badge);
                //求差
                let x=badge.left -ball.left;
                let y=badge.top -ball.top;

                el.style.transform=`translate(${x}px,${y}px)`;
                el.style.transition='all 1s cubic-bezier(.52,-0.07,.89,.67)'
                done();
            },
            afterEnter(){
                this.flag=!this.flag
            },
        },
        created(){
            this.getBanner()
            this.getContent()
        }
    }
</script>

<style scoped lang="scss">
    .goodsIngo_container{
        background-color: #eee;
        /*解决垂直方向外边距塌陷的问题*/
        overflow: hidden;
        .nowPrice{
            color: red;
            font-weight: bolder;
            font-size: 16px;
        }
        .mui-card-footer{
            display: block;
            button{
                margin: 10px 0;
            }
        }
        .ball{
            width: 15px;
            height: 15px;
            background-color: red;
            border-radius: 50%;
            position: absolute;
            left: 140px;
            top:420px;
            z-index: 999;
        }
    }
</style>