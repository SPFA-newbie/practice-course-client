<template>
    <div>
        <el-row>
            <el-col :span="4"><h2>个人信息</h2></el-col>
        </el-row>
        <el-row class="mainStudentCard">
            <el-col :span="12">
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">学号</el-tag></el-col>
                    <el-col :span="20">
                        <el-tag class="info_bar" type="info" size="large" effect="plain">{{ info.sid }}</el-tag>
                    </el-col>
                </el-row>
                <spaceRow></spaceRow>
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">姓名</el-tag></el-col>
                    <el-col :span="20">
                        <el-tag class="info_bar" type="info" size="large" effect="plain">{{ info.sname }}</el-tag>
                    </el-col>
                </el-row>
                <spaceRow></spaceRow>
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">专业</el-tag></el-col>
                    <el-col :span="20">
                        <el-tag class="info_bar" type="info" size="large" effect="plain">{{ info.major }}</el-tag>
                    </el-col>
                </el-row>
                <spaceRow></spaceRow>
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">性别</el-tag></el-col>
                    <el-col :span="20">
                        <el-tag class="info_bar" type="info" size="large" effect="plain">{{ info.sex }}</el-tag>
                    </el-col>
                </el-row>
                <spaceRow></spaceRow>
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">出生日期</el-tag></el-col>
                    <el-col :span="20">
                        <el-tag class="info_bar" type="info" size="large" effect="plain">{{ info.birthday }}</el-tag>
                    </el-col>
                </el-row>
                <spaceRow></spaceRow>
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">入学时间</el-tag></el-col>
                    <el-col :span="20">
                        <el-tag class="info_bar" type="info" size="large" effect="plain">{{ info.enrollment }}</el-tag>
                    </el-col>
                </el-row>
                <spaceRow></spaceRow>
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">毕业时间</el-tag></el-col>
                    <el-col :span="20">
                        <el-tag class="info_bar" type="info" size="large" effect="plain">{{ info.graduation }}</el-tag>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :offset="2" :span="8">
                <el-row justify="center">
                    <el-card>
                        <div v-if="studentImg==''" class="studentPhotoBox"></div>
                        <img v-if="studentImg!=''" :src="studentImg" width="147" height="206">
                    </el-card>
                </el-row>
            </el-col>
        </el-row> 
    </div>
</template>

<script>
import spaceRow from '@/components/spaceRow.vue';

import axios from 'axios';
import { ElMessage } from 'element-plus';

export default {
    name:"myMessage",
    components:{
        spaceRow
    },
    mounted(){
        this.getMessage();
        this.loadImg();
    },
    data(){
        return {
            studentImg: '',
            info:{
                sid: '',
                sname: '',
                major: '',
                sex: '',
                birthday: '',
                enrollment: '',
                graduation: ''
            }
        }
    },
    methods:{
        getMessage(){
            var pack={
                operator: sessionStorage.getItem('userId'),
                sid: sessionStorage.getItem('userId')
            };
            axios.create({baseURL: '/api'})
                 .post('/show-student', pack)
                 .then((response)=>{
                    this.info=response.data;
                 })
                 .catch(error=>ElMessage.error(error.toString()));
        },
        loadImg(){
            var pack={
                operator: sessionStorage.getItem('userId'),
                sid: sessionStorage.getItem('userId')
            };
            axios.create({baseURL:'/api'})
                 .request({
                        url:'/get-photo',
                        responseType: 'blob',
                        method: 'post',
                        data: pack
                    })
                 .then((response)=>{
                    this.studentImg=window.URL.createObjectURL(response.data);
                 })
                 .catch(error=>ElMessage.error(error.toString()));
        }
    }
}
</script>

<style scoped>
.mainStudentCard{
    margin-left: 5%;
    max-width: 95%;
}
.info_tag{
    max-width: 95%;
    min-width: 95%;
}
.info_bar{
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