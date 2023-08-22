<template>
    <div>
        <el-row>
            <el-col :span="4"><h2>批量上传照片</h2></el-col>
        </el-row>
        <el-row justify="start">
            <el-col :offset="1" :span="19">
                <el-upload action=""
                           accept="image/*"
                           ref="imgPack"
                           list-type="picture"
                           v-model:file-list="imgList"
                           :http-request="uploadPhotos"
                           :drag="true"
                           :multiple="true"
                           :auto-upload="false"
                           :on-change="checkImg"
                           :on-success="uploadSuccess"
                           :on-error="uploadError">
                    <template #trigger>
                        <el-icon size="large"><CirclePlus /></el-icon>
                    </template>
                    <template #tip>
                        <el-text type="info" size="small">
                            说明: 请将照片命名为学号, 例如: "200022331234.jpg"; 每张图片大小不超过1M
                        </el-text>
                    </template>
                </el-upload>
            </el-col>
            <el-col :offset="1" :span="3">
                <spaceRow></spaceRow>
                <el-row>
                    <el-button type="danger" @click="this.$refs.imgPack.clearFiles()" class="buttons">清空选择</el-button>
                </el-row>
                <spaceRow></spaceRow>
                <el-row>
                    <el-button type="success" @click="this.$refs.imgPack.submit()" class="buttons">全部提交</el-button>
                </el-row>
                <el-row>
                    <el-text type="info" size="small">
                        已选择{{ this.imgList.length }}张照片
                    </el-text>
                </el-row>
            </el-col>
        </el-row>
        <el-backtop :right="100" :bottom="100" />
    </div>
</template>

<script>
import spaceRow from '@/components/spaceRow.vue';

import axios from 'axios';
import { ElMessageBox, ElMessage } from 'element-plus';

export default {
    name:"uploadPhotos",
    components:{
        spaceRow
    },
    mounted(){
    },
    data(){
        return {
            imgList:[],
        };
    },
    methods:{
        uploadPhotos(photo){
            var pack=new FormData();
            pack.append('operator', sessionStorage.getItem('userId'));
            pack.append('img', photo.file);
            pack.append('sid', photo.file.name.split('.')[0]);

            axios.create({baseURL:'/api'})
                 .post('/upload-photo', pack)
                 .then((response)=>{
                    if(response.data.condition==true) {
                        this.$refs.imgPack.handleRemove(photo.file);
                        ElMessage({message: '上传成功', type:'success', grouping: true})
                    }else ElMessage.error({message: '上传失败', type:'error', grouping: true});
                        
                 })
                 .catch(error=>{ElMessage.error({message: '上传异常: '+error.toString(), type:'error', grouping: true})});
        },
        checkImg(img, imgList){
            if(img.size>1048576){
                ElMessage.error('图片'+img.name+'过大！');
                imgList.pop();
            }
        }
    }
}
</script>

<style scoped>
.buttons{
    max-width: 95%;
    min-width: 95%;
}
</style>