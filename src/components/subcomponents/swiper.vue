<template>
    <div>
        <!--轮播图-->
        <mt-swipe :auto="4000">
            <!--谁使用,谁就传递bannerList-->
            <mt-swipe-item v-for="item in bannerList" :key="item.id">
                <img :src="item.img" alt="" :class="{'width':bol}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        name: "swiper",
        props:['bannerList','bol'],

    }
</script>

<style scoped lang="scss">
    .width{
        width: 100%;
    }
    .mint-swipe{
        height: 200px;
        text-align: center;
        .mint-swipe-item{
            img{
                /*width: 100%;*/
                height: 100%;
            }
        }
    }
</style>