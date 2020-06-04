<template>

    <el-container style="height: 500px; border: 1px solid #eee">
                <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                    <el-menu
                            default-active="1"
                            class="el-menu-vertical-demo"
                            >
                        <el-menu-item index="1" >
                            <i class="el-icon-menu"></i>
                            <span slot="title">评论</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-document"></i>
                            <span slot="title">简信</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-setting"></i>
                            <span slot="title">喜欢</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">关注</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>

                <el-container>
                    <el-main>
                        <el-table
                                :data="tableData"
                                style="width: 100%">
                            <el-table-column
                                    prop="userName"
                                    label="评论者"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="message"
                                    label="评论">
                            </el-table-column>
                        </el-table>
                    </el-main>
                </el-container>
            </el-container>
</template>

<script>
    import  {request} from "../networks";

    export default {
        name: "message",
        data(){
            return{
                tableData:[

                ]
            }
        },
        created(){
            request({
                url:'message',
            }).then(res=>{
                var err_code = res.err_code
                if (err_code !== 0) {
                    this.$message.error(res.message)
                    return
                }
                this.tableData = res.comments
            })
        },
    }
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>