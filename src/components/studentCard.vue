<template>
    <div>
        <el-row :align="bottom">
            <el-col :offset="1" :span="4"><h4>详细信息</h4></el-col>
        </el-row>
        <el-row class="mainStudentCard">
            <el-col :span="12">
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">姓名</el-tag></el-col>
                    <el-col :span="20">
                        <el-tag size="large" effect="plain" type="info" class="info_tag">{{ info.sname }}</el-tag>
                    </el-col>
                </el-row>
                <spaceRow></spaceRow>
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">学号</el-tag></el-col>
                    <el-col :span="20">
                        <el-tag size="large" effect="plain" type="info" class="info_tag">{{ info.sid }}</el-tag>
                    </el-col>
                </el-row>
                <spaceRow></spaceRow>
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">专业</el-tag></el-col>
                    <el-col :span="20">
                        <el-tag size="large" effect="plain" type="info" class="info_tag">{{ info.major }}</el-tag>
                    </el-col>
                </el-row>
                <spaceRow></spaceRow>
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">性别</el-tag></el-col>
                    <el-col :span="20">
                        <el-tag size="large" effect="plain" type="info" class="info_tag">{{ info.sex }}</el-tag>
                    </el-col>
                </el-row>
                <spaceRow></spaceRow>
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">出生日期</el-tag></el-col>
                    <el-col :span="20">
                        <el-tag size="large" effect="plain" type="info" class="info_tag">{{ info.birthday }}</el-tag>
                    </el-col>
                </el-row>
                <spaceRow></spaceRow>
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">入学时间</el-tag></el-col>
                    <el-col :span="20">
                        <el-tag size="large" effect="plain" type="info" class="info_tag">{{ info.enrollment }}</el-tag>
                    </el-col>
                </el-row>
                <spaceRow></spaceRow>
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">毕业时间</el-tag></el-col>
                    <el-col :span="20">
                        <el-tag size="large" effect="plain" type="info" class="info_tag">{{ info.graduation }}</el-tag>
                    </el-col>
                </el-row>
                <spaceRow></spaceRow>
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">证书生成情况</el-tag></el-col>
                    <el-col :span="5">
                        <el-tag size="large" type="danger" class="info_tag" v-if="info.diploma_condition.graduation==false">
                            毕业证书：未生成
                        </el-tag>
                        <el-tag size="large" type="success" class="info_tag" v-if="info.diploma_condition.graduation==true">
                            毕业证书：已生成
                        </el-tag>
                    </el-col>
                    <el-col :span="5">
                        <el-tag size="large" type="danger" class="info_tag" v-if="info.diploma_condition.degree==false">
                            学位证书：未生成
                        </el-tag>
                        <el-tag size="large" type="success" class="info_tag" v-if="info.diploma_condition.degree==true">
                            学位证书：已生成
                        </el-tag>
                    </el-col>
                    <el-col :span="5">
                        <el-tag size="large" type="danger" class="info_tag" v-if="info.diploma_condition.transcript==false">
                            成绩证明：未生成
                        </el-tag>
                        <el-tag size="large" type="success" class="info_tag" v-if="info.diploma_condition.transcript==true">
                            成绩证明：已生成
                        </el-tag>
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
                <spaceRow></spaceRow>
                <el-row justify="center">
                    <el-button type="primary" @click="loadImg">获取照片</el-button>
                </el-row>
            </el-col>
        </el-row>        
    </div>
</template>

<script>
import spaceRow from './spaceRow.vue';

import axios from 'axios';

export default {
    name:"studentCard",
    components:{
        spaceRow
    },
    props:["info"],
    data(){
        return {
            studentImg: '',
            fit:'fill'
        }
    },
    methods:{
        loadImg(){
            var pack={
                operator: sessionStorage.getItem('userId'), 
                sid:this.info.sid
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
                    // console.log(1, this.studentImg);
                 })
                 .catch(error=>ElMessage.error(error.toString()));
        }
    }
}
</script>

<style>
.mainStudentCard{
    margin-left: 5%;
    max-width: 95%;
}
.info_tag{
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