<template>
    <div>
        <!--3.渲染-->
        <comment :id="id"></comment>
    </div>
</template>

<script>
    //1.导入
    import comment from '../subcomponents/comment.vue'
    export default {
        name: "goodsComment",
        components:{
            //2.定义子组件
            comment,
        },
        data(){
            return{
                id:this.$route.params.id,
            }
        }
    }
</script>

<style scoped>

</style>