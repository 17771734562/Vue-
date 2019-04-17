<template>
    <div class="goodsPresent_container">
        <h4>{{goodsPresent.title}}</h4>
        <div v-html="goodsPresent.content" class="imgmax"></div>
    </div>
</template>

<script>
    export default {
        name: "goodsPresent",
        data(){
            return{
                goodsPresent:[],
                id:this.$route.params.id,
            }
        },
        methods:{
            getGoodsPresent(){
                this.$http.get('api/goods/getdesc/'+this.id).then(result=>{
                    if (result.body.status===0){
                        console.log(result.body);
                        this.goodsPresent =result.body.message[0]
                    }
                })
            }
        },
        created(){
            this.getGoodsPresent()
        }
    }
</script>

<style scoped lang="scss">
    .goodsPresent_container{
        h4{
            color: blue;
            text-align: center;
        }

    }

</style>