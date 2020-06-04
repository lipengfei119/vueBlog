<template>

    <el-container>
                    <el-main>
                        <el-container>
                            <el-aside width="200px" ><img :src="img" alt=""></el-aside>
                            <el-main>
                                <ArticleIntroduction v-for = 'introduction in introductions'
                                        :id="introduction.id"
                                        :title="introduction.title"
                                        :content="introduction.introduction"
                                        :author="introduction.author"
                                        :comment="introduction.comment"
                                        :stars="introduction.stars">

                                </ArticleIntroduction>
                            </el-main>
                        </el-container>
                    </el-main>
                </el-container>


</template>

<script>
    import img from "@/assets/imgs/shanghai.jpg"
    import ArticleIntroduction from "@/components/articleIntroduction"
    import {request} from "@/networks"
    export default {
        name: "homePage",
        components:{ArticleIntroduction},
        data(){
            return{
                img,
                introductions:[]
            }
        },
        created() {
            request({
                url:'articles'
            }).then(res=>{
                var err_code = res.err_code
                if (err_code !== 0) {
                    this.$message.error(res.message)
                    return
                }
                this.introductions = res.articles
            })
        }
    }
</script>

<style scoped>
    .el-main{
        padding:0;
    }

    .el-aside>img{
        width: 100%;
    }
</style>