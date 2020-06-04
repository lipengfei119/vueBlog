<template>
  <div id="app">
    <TopNav></TopNav>
    <div class="main">
      <el-row>
        <el-col :xs={span:24} :md={span:18,offset:3} :lg={span:16,offset:4}>
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>


  </div>
</template>
<script>
  import {request} from './networks'
  import TopNav from "./components/topNav";
  import HomePage from "./views/homePage"
  export  default {
    components: {
      TopNav,
      HomePage
    },
    methods:{
      handleSelect(){
        console.log('a')
      }

    },
    beforeCreate(){
        request({
          url:'getUser'
        }).then(resolve=>{
          // var err_code = res.err_code
          // if (err_code !== 0) {
          //   this.$message.error(res.message)
          //   return
          // }
          this.$store.commit('updateUser',resolve.user)
        })
    }
  }
</script>
<style lang="less">

    *{
      margin: 0;
      padding: 0;
    }
    #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
      .main{
        margin-top:20px
      }
}



</style>
