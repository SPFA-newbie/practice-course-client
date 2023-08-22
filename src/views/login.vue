<template>
    <div class="wholePage">
        <div class="mainBorder">
            <el-row class="titleRow">
                <el-col :span="17">
                    <h2 class="titleText">电子证照管理系统 - 登录</h2>
                </el-col>
            </el-row>
            <el-divider class="divider" />
            <el-row class="firstRow">
                <el-col :span="6" class="inputTip">
                    <p>账号：</p>
                </el-col>
                <el-col :span="16" class="inputArea">
                    <el-input v-model="userId" placeholder="账号" />
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" class="inputTip">
                    <p>密码：</p>
                </el-col>
                <el-col :span="16" class="inputArea">
                    <el-input v-model="password" type="password" placeholder="密码" show-password />
                </el-col>
            </el-row>
            <el-row class="lastRow">
                <el-col :span="12" :offset="6">
                    <el-button type="primary" @click="login">登录</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
    setup() {
        
    },
    data(){
        return{
            userId:'',
            password:''
        }
    },
    methods:{
        login(){
            if(this.userId=='')this.loginFail('用户名不能为空');else
            if(this.password=='')this.loginFail('密码不能为空');
                else{
                    var pack={
                        user_id:this.userId,
                        password:this.password
                    };
                    axios.create({baseURL:'/api'})
                        .post('/login',pack)
                        .then((response)=>{
                            if(response.data.condition==false) {
                                ElMessage.error(response.data.message);
                                this.userId='';
                                this.password='';
                            } else{
                                sessionStorage.setItem('userId', pack.user_id);
                                sessionStorage.setItem('role', response.data.role);
                                console.log("role",response.data.role);
                                this.$router.push('/')
                            }
                        })
                        .catch(error=>ElMessage.error(error.toString()));
                }
        },
        loginFail(message){
            ElMessageBox.alert(message, '登录失败', {confirmButtonText: '确定'})
        }
    }
}
</script>

<style scoped>
.wholePage{
    background-image: url('../assets/background.png');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;

    height: 100%;
    width: 100%;
    position: absolute;
    top:0px;
    left:0px;
    right:0px;
    bottom:0px;
}

.mainBorder{
    border-radius: 20px;
    border: 1px solid var(--el-border-color);
    
    position: relative;
    height: 40%;
    width: 30%;
    margin-left: 67%;
    margin-top: 5%;

    background-color: rgba(255,255,255,0.8);
}
.titleRow{
    border-radius: 4px;

    /* background-color: #79bbff; */
    text-align: left;
}
.divider{
    margin-top: 0px;
}
.firstRow{
    margin-top: 5%;
}
.lastRow{
    margin-bottom: 10%;
}
.titleText{
    margin-left: 15%;
    /* color: #ffffff; */
}
.inputTip{
    text-align: right;
}
.inputArea{
    margin-top: 10px;
}
</style>