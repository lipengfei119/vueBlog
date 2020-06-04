<template>
    <div class="wrap">
        <router-link :to="path+id">{{title}}</router-link>
        <p>{{content}}</p>
        <div class="meta">
            <span>{{author}}</span>
            <span><i class="el-icon-chat-dot-square">{{comment}}</i></span>
            <span><i class="el-icon-star-off"></i>{{stars}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "articleIntroduction",
        props:['id','title','content','author','comment','stars'],
        data(){
            return{
                path:'/articleDetails/'
            }
        }
    }
</script>

<style scoped>
    a{
        text-decoration: none;
    }
    .wrap{
        border-bottom:1px solid #B3C0D1;
        text-align: left;
        margin-left:30px;
        margin-bottom: 30px;
    }
    .el-link{
        color:#000;
        font-size: 18px;
        font-weight: 700;
        line-height: 1.5;
    }

    p{
        margin: 0 0 8px;
        font-size: 13px;
        line-height: 24px;
        color: #999;
    }
    .meta{
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
    }
    .meta span{
        margin: 0 10px;
    }
</style>