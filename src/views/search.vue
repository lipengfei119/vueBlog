<template>
    <div>
        <ul>
            <li v-for="item in list">
                <router-link :to="'/articleDetails/'+item.id">{{item.title}}</router-link>
                <span>作者：{{item.author}}</span>
                <hr>
            </li>
        </ul>
    </div>
</template>

<script>
    import {request} from "../networks";

    export default {
        name: "search",
        data(){
            return{
                list:[
                    {
                        id:'9527',
                        title:'hello',
                        author:'li'
                    },
                    {
                        id:'9527',
                        title:'hello',
                        author:'fei'
                    }
                    ]
            }
        },
        created(){
            request({
                url:'search',
                data:{input:this.$route.params.input},
                method:'post'
            }).then((res)=>{
                var err_code = res.err_code
                if (err_code !== 0) {
                    this.$message.error(res.message)
                    return
                }
                this.list = res.list
            })
        }
    }
</script>

<style scoped>
    li>a{
        margin-left: 0;
        text-decoration: none;
        color: #409EFF;
    }

    ul{
        margin: 0 auto;
        padding: 0;
        list-style: none;
        width: 400px;
        font-size: 20px;
    }
    ul>li{
        height: 25px;
        line-height: 25px;
        margin-bottom: 5px;
        width: 100%;
        text-align: left;
    }
    li>span{
        font-size: 15px;
        float: right;
        margin-right: 10px;
    }
</style>