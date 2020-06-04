<template>
    <div class="mainWrap">
        <el-container>
                    <el-main>
                        <el-form :label-position="labelPosition" :rules="rules" label-width="80px" ref="formLabelAlign" :model="formLabelAlign">
                            <el-form-item label="标题" prop="title">
                                <el-input v-model="formLabelAlign.title" placeholder="请输入标题"></el-input>
                            </el-form-item>
                            <el-form-item label="简介" prop="introduction">
                                <el-input
                                        type="textarea"
                                        :autosize="{ minRows: 2, maxRows: 4}"
                                        placeholder="请输入文章内容简介"
                                        v-model="formLabelAlign.introduction">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="内容" prop="content">
                                <el-input
                                        type="textarea"
                                        :autosize="{ minRows: 5, maxRows: 10}"
                                        v-model="formLabelAlign.content"
                                        @blur="console">
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('formLabelAlign')">提交</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </el-main>
                </el-container>


    </div>


</template>

<script>
    import {request} from '@/networks'
    export default {
        name: "notebooks",
        data(){
            return{
                labelPosition:'left',
                formLabelAlign: {
                    title: '',
                    introduction: '',
                    content: ''
                },
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        { max: 50, message: '长度50个字符以内', trigger: 'blur'}
                    ],
                    content:[
                        { required: true, message: '请输入内容', trigger: 'blur' },
                    ]
                }
            }
        },
        methods:{
            submitForm(formLabelAlign) {
                this.$refs[formLabelAlign].validate((valid) => {
                    if (valid) {
                         request({
                             url:'publish',
                             method:'post',
                             data:this.formLabelAlign
                         }).then(res=>{
                             var err_code = res.err_code
                             if(err_code !== 0){
                                 return this.$message.error(res.message)
                             }
                             this.$message({
                                 message: '发布成功！',
                                 type: 'success'
                             })
                             this.$store.commit('updateUser',res.user)
                             this.$router.push('/home')
                         },rej=>{
                             console.log(rej)
                         })
                    } else {
                        this.$message.error('标题与内容必填！')
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            console(){
                console.log(this.formLabelAlign.content)
            }
        }
    }
</script>

<style>
   .mainWrap .el-form-item__label{
       color:#000;
       font-size: 20px  ;
       font-weight: 500;
   }
    .el-form{
        text-align: left;
    }
</style>