<template>
    <div class="wrap">
        <header>
            <el-row >
                <el-col :xs={span:24} :md={span:18,offset:3} :lg={span:16,offset:4}>
                    <div class="grid-content bg-purple">
                        <el-menu class="el-menu-demo" mode="horizontal" router :default-active="key" @select="handleSelect">
                            <el-menu-item index="/home"><i class="el-icon-discover"></i>主页</el-menu-item>
                            <el-menu-item index="/noteBooks"><i class="el-icon-edit-outline"></i>写文章</el-menu-item>
                            <el-menu-item index="/message"><i class="el-icon-s-comment"></i>消息中心</el-menu-item>
                            <el-menu-item  >
                                <el-input
                                        placeholder="搜索"
                                        prefix-icon="el-icon-search"
                                        v-model="input"
                                        clearable
                                        @input="search">
                                </el-input>
                            </el-menu-item>
<!--                            根据flag判断是否登录-->
                            <el-submenu index="4" v-if="user">
                                <template slot="title">{{user.nickname}}</template>
                                <el-menu-item index="myPage"><i class="el-icon-user-solid"></i>我的主页</el-menu-item>
                                <el-menu-item index="2-2"><i class="el-icon-collection"></i>收藏的文章</el-menu-item>
                                <el-menu-item index="/settings"><i class="el-icon-setting"></i>设置</el-menu-item>
                                <el-menu-item index="/quit" @click="quit"><i class="el-icon-delete"></i>退出</el-menu-item>

                            </el-submenu>
                            <template v-else>
                                <el-menu-item index="/sign_in"> <el-button round>登录</el-button></el-menu-item>
                                <el-menu-item index="/sign_up"> <el-button type="danger" round>注册</el-button></el-menu-item>
                            </template>

                        </el-menu>
                    </div>
                </el-col>

            </el-row>

        </header>

    </div>
</template>

<script>
    import {request} from "../networks";

    export default {
        name: "topNav",
        data:function(){
            return{
                search:null,
                input:'',
                key:''
            }
        },
        methods:{
            //函数节流
            throttle(func, delay){
                let timer = null;

                return function(){
                    let context = this;
                    let args    = arguments;
                    if(!timer){
                        timer = setTimeout(function(){
                            func.apply(context, args);
                            timer = null;
                        }, delay);
                    }
                }
            },
            handleSelect(key,keypath){
                this.key = key
            },
            callback(){
                this.$router.push('/search/'+this.input)
            },
            quit(){
                request({
                    url:'quit'
                }).then(res=>{
                    if(res.err_code===0){
                        this.$store.commit('updateUser',res.user)
                        this.$router.push('/')
                    }
                })
            }
        },
        computed:{
            user(){
                return this.$store.state.user
            }
        },
        created() {
            this.search = this.throttle(this.callback,500)
        }
    }
</script>

<style scoped>
    .wrap{
        height: 60px;
    }
    header{
        position: fixed;
        width: 100%;
        background-color: #fff;
        z-index: 1;

    }

    .grid-content {

        height: 60px;
        border-bottom: 1px solid #B3C0D1;
    }
</style>