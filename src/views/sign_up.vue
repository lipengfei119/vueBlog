<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" >
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model.nickname="ruleForm.nickname" placeholder="请输入你的昵称"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="id">
                <el-input v-model.number="ruleForm.id" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请确认密码" show-password></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    import {request} from '../networks'
    export default {
        name: "sign_up",
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
                else {

                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    nickname:''
                },
                rules: {
                    nickname: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                    id: [
                        { validator: checkId, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        request({
                            method:'post',
                            data:{
                                id:this.ruleForm.id,
                                password:this.ruleForm.pass,
                                nickname:this.ruleForm.nickname
                            },
                            url:'/register'
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
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
    }
</script>

<style scoped>
    .el-form{
        text-align: left;
    }
</style>