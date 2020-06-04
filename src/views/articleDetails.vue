<template>
    <el-container>
        <el-header height="100px">
            <h1 >{{article.title}}</h1>
            <el-divider></el-divider>
            <div class="author">
                <el-avatar :size="40" :src="article.avatar"></el-avatar>
                <div class="name">
                    <span v-text="article.name"></span>
                    <span v-text="article.time"></span>
                </div>
            </div>
        </el-header>

        <el-main>
            <div v-html="article.content" style="white-space:pre-wrap"></div>
            <el-divider>评论区</el-divider>
            <div>
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="写下你的评论..."
                        v-model="inputComment">
                </el-input>
                <el-button type="primary" @click="submitComment">发布</el-button>
            </div>
            <div class="comment">
                <el-divider content-position="left">全部评论 <span class="commentNum">{{article.comment}}</span></el-divider>
                <div v-for="item in comments">
                    <el-avatar :size="40" :src="item.avatar"></el-avatar>
                    <div class="name">
                        <span v-text="item.userName"></span>
                        <span>{{time(item.created_time)}}</span>
                    </div>
                    <div>{{item.message}}</div>
                </div>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    import {request} from '@/networks'
    export default {
        name: "articleDetails",
        data:function(){
            return{
                article:{},
                comments:[],
                inputComment:''
            }
        },
        methods:{
            submitComment(){
              if(!this.$store.state.user){
                  this.$message.error('请先登录！')
                  this.$router.push('/sign_in')
              }
              request({
                  url:'submitComment',
                  method:'post',
                  data:{
                      message: this.inputComment,
                      authorID: this.article.authorID,
                      articleID:this.article.articleID
                  }
              }).then((res)=>{
                  var err_code = res.err_code
                  if (err_code !== 0) {
                      this.$message.error(res.message)
                      return
                  }
                  this.$message({
                      message: res.message,
                      type: 'success'
                  })
                  this.$router.go(0)
              })
          },
            time(T){
              return T.split('T')[0]
            }
        },
        computed:{
            userAvatar(){
                if(!this.$store.state.user) {
                    return ''
                }
                return this.$store.state.user.avatar
            }
        },
        created(){
            request({
                url:'article',
                params:{id:this.$route.params.id}
            }).then(res=>{
                    var err_code = res.err_code
                    if (err_code !== 0) {
                        this.$message.error(res.message)
                        return
                    }
                    this.article = res.article
                    this.comments = res.comments
                })
        }
    }
</script>

<style scoped>
    .el-header{
        margin-bottom: 30px;
    }
    h1{
        margin-bottom: 30px;
    }
    .el-container{
        text-align: left;
    }
    .author{
        display: flex;
        height: 40px;
        font-size: 14px;
        color: #909399;
        width: 200px;
        justify-content: space-around;
        background-color: #C0C4CC;
        border-radius: 20px;
    }
    .name{
        display:flex;
        flex-direction: column;
        justify-content: center;
    }
    .commentNum{
        font-size: 10px;
    }
</style>