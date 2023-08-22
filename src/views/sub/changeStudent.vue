<template>
    <div>
        <el-row>
            <el-col :span="4"><h2>修改学生信息</h2></el-col>
        </el-row>
        <el-row class="mainStudentCard">
            <el-col :span="12">
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">学号</el-tag></el-col>
                    <el-col :span="20">
                        <el-input v-model="info.sid" placeholder="" class="info_input" :disabled="true"></el-input>
                    </el-col>
                </el-row>
                <spaceRow></spaceRow>
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">姓名</el-tag></el-col>
                    <el-col :span="20">
                        <el-input v-model="info.sname" placeholder="" class="info_input"></el-input>
                    </el-col>
                </el-row>
                <spaceRow></spaceRow>
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">专业</el-tag></el-col>
                    <el-col :span="20">
                        <el-select v-model='info.major' placeholder=' ' :filterable='true' :allow-create="true" class="info_input">
                            <el-option v-for='m in majorList' :key='m' :label='m' :value='m'></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <spaceRow></spaceRow>
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">性别</el-tag></el-col>
                    <el-col :span="20">
                        <el-select v-model='info.sex' placeholder=' ' :filterable='true' :allow-create="true" class="info_input">
                            <el-option v-for='m in sexList' :key='m' :label='m' :value='m'></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <spaceRow></spaceRow>
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">出生日期</el-tag></el-col>
                    <el-col :span="20">
                        <el-date-picker v-model='info.birthday'
                                type="date"
                                placeholder=" "
                                value-format="YYYY-MM-DD"
                                :editable="false"
                                class="info_input"/>
                    </el-col>
                </el-row>
                <spaceRow></spaceRow>
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">入学时间</el-tag></el-col>
                    <el-col :span="20">
                        <el-date-picker v-model='info.enrollment'
                                type="date"
                                placeholder=" "
                                value-format="YYYY-MM-DD"
                                :editable="false"
                                class="info_input"/>
                    </el-col>
                </el-row>
                <spaceRow></spaceRow>
                <el-row>
                    <el-col :span="4"><el-tag size="large" class="info_tag">毕业时间</el-tag></el-col>
                    <el-col :span="20">
                        <el-date-picker v-model='info.graduation'
                                type="date"
                                placeholder=" "
                                value-format="YYYY-MM-DD"
                                :editable="false"
                                class="info_input"/>
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
                    <el-upload action=""
                               accept="image/*"
                               ref="imgPack"
                               :http-request="uploadStudent"
                               :show-file-list="false"
                               :auto-upload="false"
                               :on-change="switchImg"
                               :on-error="uploadError">
                        <template #trigger>
                            <el-button type="primary">选择照片</el-button>
                        </template>
                    </el-upload>
                </el-row>
                <el-row justify="center">
                    <el-text type="danger" size="small">请选择正面一寸免冠照, 大小小于1MB</el-text>
                </el-row>
            </el-col>
        </el-row>
        <spaceRow></spaceRow>
        <spaceRow></spaceRow>
        <el-row justify="center">
            <el-col :span="4">
                <el-button type="success" @click="prepareUpload" class="info_input">提交修改</el-button>
            </el-col>
        </el-row>       
    </div>
</template>

<script>
import spaceRow from '@/components/spaceRow.vue';

import axios from 'axios';
import { ElMessage } from 'element-plus';
import { genFileId } from 'element-plus';
import { UploadRawFile } from 'element-plus'

export default {
    name:"createStudent",
    components:{
        spaceRow
    },
    mounted(){
        this.majorList=this.$store.state.majorList;
        if(this.majorList==[])
            axios.create({baseURL:'/api'})
                 .post('/get-major-list', {operator: sessionStorage.getItem('userId')})
                 .then((response)=>{
                    this.$store.state.majorList=response.data.majors;
                    if(this.$store.state.majorList==null || typeof this.$store.state.majorList != typeof []) {
                        this.$store.state.majorList=[];
                        ElMessage.error('获取专业列表失败');
                    }
                    // console.log(1, response.data);
                    // console.log(2, this.$store.state.majorList);
                 })
                 .catch(error=>ElMessage.error(error.toString()));
        this.info=this.$store.state.studentInfo;
        this.loadImg();
    },
    data(){
        return {
            studentImg: '',
            majorList:[],
            sexList:['男', '女'],
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
        prepareUpload(){
            if(this.studentImg=='') ElMessage.error('未选择照片'); else
            if(this.info.sid=='') ElMessage.error('未填写学号'); else
            if(this.info.sname=='') ElMessage.error('未填写姓名'); else
            if(this.info.major=='') ElMessage.error('未填写专业'); else
            if(this.info.sex=='') ElMessage.error('未填写性别'); else
            if(this.info.birthday=='') ElMessage.error('未填写出生日期'); else
            if(this.info.enrollment=='') ElMessage.error('未填写入学时间'); else
            if(this.info.graduation=='') ElMessage.error('未填写毕业时间'); else
                this.$refs.imgPack.submit();
        },
        uploadStudent(img){
            var pack=new FormData();
            pack.append('operator', sessionStorage.getItem('userId'));
            pack.append('img', img.file, 'img.png');
            pack.append('sid', this.info.sid);
            pack.append('sname', this.info.sname);
            pack.append('major', this.info.major);
            pack.append('sex', this.info.sex);
            pack.append('birthday', this.info.birthday);
            pack.append('enrollment', this.info.enrollment);
            pack.append('graduation', this.info.graduation);

            axios.create({baseURL:'/api'})
                 .post('/change-student', pack)
                 .then((response)=>{
                    if(response.data.condition==true) {
                        ElMessage({message:'操作成功', type:'success'});
                        this.$store.state.majorList=[];
                        this.$emit('jump', 'student-message');
                    }else ElMessage.error(response.data.message);
                 })
                 .catch(error=>ElMessage.error(error.toString()));
        },
        uploadError(error){
            ElMessage.error(error.toString());
        },
        loadImg(){
            var pack={
                operator: sessionStorage.getItem('userId'),
                sid: this.info.sid
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
                    var defaultImg=new File([response.data], 'default', {type: response.data.type});
                    defaultImg.uid=genFileId();
                    this.$refs.imgPack.handleStart(defaultImg);
                 })
                 .catch(error=>ElMessage.error(error.toString()));
        },
        switchImg(img, imgList){
            if(img.size>1048576){
                ElMessage.error('图片过大, 请重新选择！');
                if(imgList.length>1) imgList.splice(1, 1);
                    else imgList.splice(0, 1);
            }
            if(imgList.length>1) imgList.splice(0, 1);
            if(imgList.length==1) this.studentImg=window.URL.createObjectURL(imgList[0].raw);
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