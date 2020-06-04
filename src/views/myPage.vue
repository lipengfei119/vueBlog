<template>
    <div>
        <ArticleIntroduction v-for = 'introduction in introductions'
                             :id="introduction.id"
                             :title="introduction.title"
                             :content="introduction.introduction"
                             :author="introduction.author"
                             :comment="introduction.comment"
                             :stars="introduction.stars">

        </ArticleIntroduction>
    </div>
</template>

<script>
    import {request} from "../networks";
    import ArticleIntroduction from "@/components/articleIntroduction"
    export default {
        name: "myPage",
        data(){
            return{
                introductions:[]
            }
        },
        components:{
            ArticleIntroduction
        },
        created() {
            request({
                url:'myArticles'
            }).then(res=>{
                this.introductions = res.articles
            })
        }
    }
</script>

<style scoped>

</style>