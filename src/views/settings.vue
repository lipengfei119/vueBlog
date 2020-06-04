<template>
    <div>
        <uploader :imageUrl="$store.state.user.avatar"></uploader>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" >
                <el-input v-model="ruleForm.id" disabled=""></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="ruleForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入手机号">
                </el-input>
            </el-form-item>

            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="ruleForm.gender">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="-1">女</el-radio>
                    <el-radio :label="0">隐藏</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model.number="ruleForm.age"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>

        </el-form>

    </div>

</template>

<script>
    import {request} from "../networks";
    import uploader from "@/components/uploader"
    export default {
        name: "settings",
        components:{
            uploader
        },
        data() {
            return {
                ruleForm:{},
                rules: {
                    nickname: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                    ],
                    resource: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    phone: [
                        { required: true, message: '请填写手机号', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        request({
                            url:'setting',
                            method:'post',
                            data:{
                                data:this.ruleForm
                            }
                        }).then(res=>{
                                var err_code = res.err_code
                                if (err_code !== 0) {
                                this.$message.error(res.message)
                                this.$router.push('/sign_in')
                                return
                                }
                                this.$message({
                                    message: '修改成功！',
                                    type: 'success'
                                })
                                this.$store.commit('updateUser',res.user)
                                // this.$router.go(0)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        computed:{
            user(){
                var user = this.$store.state.user

                return user
            }
        },
        created() {
            var user = this.user
            console.log(user)
            this.ruleForm = {
                id:user.id,
                nickname:user.nickname,
                phone:user.phone,
                gender:user.gender,
                age:user.age
            }
        }

    }
</script>

<style scoped>
    .el-form{
        text-align: left;
    }
</style>