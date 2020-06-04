<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
    <el-form-item label="账号" prop="id">
        <el-input v-model.number="ruleForm.id" placeholder="请输入账号" ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" show-password></el-input>
    </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {request} from '../networks'
    export default {
        name: "sign_in",
        data(){
            var checkId = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                }
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('账号为数字'));
                    } else {
                        if (value <100000||value>9999999999) {
                            callback(new Error('账号为6-10位'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }
                else if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/.test(value)){
                    callback(new Error('密码必须为6-16位，至少一个字母和数字'));

                }
                    callback();
            }
            return{
                ruleForm:{
                    password:''
                },
                rules:{
                    id: [
                        { validator: checkId, trigger: 'blur' }
                    ],
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        request({
                            method:'post',
                            url:'login',
                            data:this.ruleForm
                        }).then(res=>{
                            var err_code = res.err_code
                            if (err_code !== 0) {
                                this.$message.error(res.message)
                                return
                            }
                            this.$message({
                                message: res.message,
                                type: 'success'
                            })
                            this.$store.commit('updateUser',res.user)
                            this.$router.push('/home')
                        },err=>{
                            console.log(err)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .el-form{
        text-align: left;
    }

</style>