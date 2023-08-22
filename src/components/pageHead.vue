<template>
    <el-affix class="pageHead">
        <div class="headFill"></div>
        <div class="headline">
            <el-row>
                <el-icon size="50px" class="headIcon"><Avatar /></el-icon>
                <h2 class="headText">电子证照管理系统</h2>
            </el-row>
        </div>
        <div class="headMessage">
            <div v-if="userName==''">
                <p>请先<router-link to="/login">登录</router-link></p>
            </div>
            <div v-if="userName!=''">
                <p>欢迎，{{userName}} <router-link to="/login" @click="logout">登出</router-link></p>
            </div>
        </div>
    </el-affix>
</template>

<script>
export default {
    name:'pageHead',
    setup() {
        
    },
    mounted(){
        var user=sessionStorage.getItem('userId');
        if(user==null) this.userName='';
            else this.userName=user;
    },
    data(){
        return{
            userName:''
        };
    },
    methods:{
        logout(){
            sessionStorage.clear();
        }
    }
}
</script>

<style>
 .pageHead{
    position: absolute;
    top: 0%;
    width: 95%;
    height: 10%;
 }
 .headline{
    position: absolute;
    top: 0%;
    width: 50%;
    height: 100%;
    text-align: left;
    background-color: #ffffff;
 }
 .headIcon{
    position: absolute;
    top:10px;
 }
 .headText{
    position: absolute;
    top:5%;
    left: 60px;
 }
 .headFill{
    position: absolute;
    top: 0%;
    width: 100%;
    height: 100%;
    left: 0%;
    background-color: #ffffff;
 }
 .headMessage{
    position: absolute;
    top: 50%;
    width: 15%;
    height: 50%;
    left: 85%;
    font-size: 12px;
    background-color: #ffffff;
 }
</style>