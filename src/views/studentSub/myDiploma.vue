<template>
    <div>
        <el-row>
            <el-col :span="4"><h2>证书状态</h2></el-col>
        </el-row>
        <el-row class="mainStudentCard">
            <el-col :span="4"><el-tag size="large" class="info_tag">毕业证</el-tag></el-col>
            <el-col :span="4">
                <el-tag class="info_bar" type="info" size="large" effect="plain">
                    {{ switchCondition(diplomaCondition.graduation) }}
                </el-tag>
            </el-col>
            <el-col :span="4">
                <el-button class="info_bar" 
                           @click="downloadDiploma('graduation')" 
                           type="success" 
                           :disabled="diplomaCondition.graduation!=true">预览并下载证书
                </el-button>
            </el-col>
        </el-row>
        <spaceRow></spaceRow>
        <el-row class="mainStudentCard">
            <el-col :span="4"><el-tag size="large" class="info_tag">学位证</el-tag></el-col>
            <el-col :span="4">
                <el-tag class="info_bar" type="info" size="large" effect="plain">
                    {{ switchCondition(diplomaCondition.degree) }}
                </el-tag>
            </el-col>
            <el-col :span="4">
                <el-button class="info_bar" 
                           @click="downloadDiploma('degree')" 
                           type="success" 
                           :disabled="diplomaCondition.degree!=true">预览并下载证书
                </el-button>
            </el-col>
        </el-row>
        <spaceRow></spaceRow>
        <el-row class="mainStudentCard">
            <el-col :span="4"><el-tag size="large" class="info_tag">成绩证明</el-tag></el-col>
            <el-col :span="4">
                <el-tag class="info_bar" type="info" size="large" effect="plain">
                    {{ switchCondition(diplomaCondition.transcript) }}
                </el-tag>
            </el-col>
            <el-col :span="4">
                <el-button class="info_bar" 
                           @click="downloadDiploma('transcript')" 
                           type="success" 
                           :disabled="diplomaCondition.transcript!=true">预览并下载证书
                </el-button>
            </el-col>
        </el-row>
        <el-dialog v-model="watchDiploma" title="证书预览" :fullscreen="true">
            <iframe :src="diplomaFile" class="subFrame" frameborder="no"></iframe>
        </el-dialog>
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
    },
    data(){
        return {
            diplomaFile: '',
            watchDiploma: false,
            diplomaCondition: {
                graduation: false,
                degree: false,
                transcript: false
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
                    this.diplomaCondition=response.data.diploma_condition;
                 })
                 .catch(error=>ElMessage.error(error.toString()));
        },
        switchCondition(condition){
            if(condition==true) return '已生成';else
            if(condition==false) return '未生成';else
                return '状态错误';
        },
        downloadDiploma(diplomaType){
            var pack={
                operator: sessionStorage.getItem('userId'),
                sid: sessionStorage.getItem('userId'),
                type: diplomaType
            };
            axios.create({baseURL:'/api'})
                .request({
                    url: '/download-diploma',
                    responseType: 'blob',
                    method: 'post',
                    data: pack
                })
                .then((response)=>{
                    this.diplomaFile=window.URL.createObjectURL(new Blob([response.data]));
                    this.watchDiploma=true;
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
.subFrame{
    position: fixed;
    top: 10%;
    left: 5%;
    max-width: 90%;
    max-height: 90%;
    min-width: 90%;
    min-height: 90%;
}
</style>