<template>
    <div>
        <el-row>
            <el-col :span="4"><h2>修改密码</h2></el-col>
        </el-row>
        <el-row class="messageRow">
            <el-col :span="4"><el-tag size="large" class="info_tag">学号</el-tag></el-col>
            <el-col :span="10">
                <el-input v-model="userId" 
                          placeholder="" 
                          class="info_input" 
                          :disabled="true">
                </el-input>
            </el-col>
        </el-row>
        <spaceRow></spaceRow>
        <el-row class="messageRow">
            <el-col :span="4"><el-tag size="large" class="info_tag">原密码</el-tag></el-col>
            <el-col :span="10">
                <el-input v-model="oldPassword" 
                          placeholder="" 
                          type="password"
                          show-password
                          class="info_input">
                </el-input>
            </el-col>
        </el-row>
        <spaceRow></spaceRow>  
        <el-row class="messageRow">
            <el-col :span="4"><el-tag size="large" class="info_tag">新密码</el-tag></el-col>
            <el-col :span="10">
                <el-input v-model="newPassword" 
                          placeholder="" 
                          type="password"
                          show-password
                          class="info_input">
                </el-input>
            </el-col>
        </el-row>
        <spaceRow></spaceRow>  
        <el-row class="messageRow">
            <el-col :span="4"><el-tag size="large" class="info_tag">重复新密码</el-tag></el-col>
            <el-col :span="10">
                <el-input v-model="repeatPassword" 
                          placeholder="" 
                          type="password"
                          show-password
                          class="info_input">
                </el-input>
            </el-col>
        </el-row>
        <spaceRow></spaceRow> 
        <spaceRow></spaceRow> 
        <el-row>
            <el-col :offset="5" :span="4">
                <el-button type="success" @click="submit" class="info_input">提交修改</el-button>
            </el-col>
        </el-row>  
    </div>
</template>

<script>
import spaceRow from '@/components/spaceRow.vue';

import axios from 'axios';
import { ElMessage } from 'element-plus';

export default {
    name:"createStudent",
    components:{
        spaceRow
    },
    mounted(){
        this.userId=sessionStorage.getItem('userId');
    },
    data(){
        return {
            userId: '',
            oldPassword: '',
            newPassword: '',
            repeatPassword: ''
        }
    },
    methods:{
        submit(){
            if(this.oldPassword==''){
                ElMessage.error('请输入原密码！');
            }else if(this.repeatPassword!=this.newPassword) {
                ElMessage.error('两次输入的密码不一致！');
                this.newPassword='';
                this.repeatPassword='';
            }else{
                var pack={
                    operator: sessionStorage.getItem('userId'),
                    sid: this.userId,
                    old_password: this.oldPassword,
                    new_password: this.newPassword
                };
                axios.create({baseURL:'/api'})
                     .post('/change-password', pack)
                     .then((response)=>{
                        if(response.data.condition==true) {
                            ElMessage({message: '修改成功', type:'success'});
                            sessionStorage.clear();
                            this.$router.push('/');
                        }else{
                            ElMessage.error(response.data.message);
                            this.oldPassword='';
                            this.newPassword='';
                            this.repeatPassword='';
                        }
                     })
                    .catch(error=>ElMessage.error(error.toString()));
            }
        }
    }
}
</script>

<style scoped>
.messageRow{
    margin-left: 5%;
    max-width: 95%;
}
.info_tag{
    max-width: 95%;
    min-width: 95%;
}
.info_input{
    max-width: 95%;
    min-width: 95%;
}
.studentPhotoBox{
    
    max-width: 147px;
    max-height: 206px;
    min-width: 147px;
    min-height: 206px;
}
</style>