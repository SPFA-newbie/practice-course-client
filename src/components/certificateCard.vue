<template>
    <el-card class="certificateCard" shadow="hover">
    <template #header>
      <div class="cardHeader">
        <span>
            <h4>{{ certificateTitle }}</h4>
        </span>
        <span>
            <el-upload action="" 
                       accept=".pdf" 
                       :http-request="uploadCertificate"
                       :show-file-list="false">
                <template #trigger>
                    <el-button type="primary">上传证章</el-button>
                </template>
            </el-upload>
        </span>
      </div>
    </template>
    <el-row>
        <el-col :span="4">
            <el-tag size="large" class="info_tag">证书序列号</el-tag>
        </el-col>
        <el-col :span="20">
            <el-tag size="large" type="info" effect="plain" class="info_tag">{{ certificate.cid }}</el-tag>
        </el-col>
    </el-row>
    <spaceRow></spaceRow>
    <el-row>
        <el-col :span="4">
            <el-tag size="large" class="info_tag">颁发者主题</el-tag>
        </el-col>
        <el-col :span="20">
            <el-tag size="large" type="info" effect="plain" class="info_tag">{{ certificate.caTag }}</el-tag>
        </el-col>
    </el-row>
    <spaceRow></spaceRow>
    <el-row>
        <el-col :span="4">
            <el-tag size="large" class="info_tag">使用者主题</el-tag>
        </el-col>
        <el-col :span="20">
            <el-tag size="large" type="info" effect="plain" class="info_tag">{{ certificate.ownerTag }}</el-tag>
        </el-col>
    </el-row>
    <spaceRow></spaceRow>
    <el-row>
        <el-col :span="4">
            <el-tag size="large" class="info_tag">证书有效时间</el-tag>
        </el-col>
        <el-col :span="9">
            <el-tag size="large" type="info" effect="plain" class="info_tag_short">{{ certificate.startData }}</el-tag>
        </el-col>
        <el-col :span="2">
            <el-text class="middleText">____</el-text>
        </el-col>
        <el-col :span="9">
            <el-tag size="large" type="info" effect="plain" class="info_tag_short">{{ certificate.endData }}</el-tag>
        </el-col>
    </el-row>
    <spaceRow></spaceRow>
    <el-row>
        <el-col :offset="10" :span="4">
            <el-button type="primary" 
                       :disabled="certificateFile==''" 
                       @click="watchCertificate=true">预览证章
            </el-button>
            <el-dialog v-model="watchCertificate" title="证章预览" :fullscreen="true">
                <iframe :src="certificateFile" class="subFrame" frameborder="no"></iframe>
            </el-dialog>
        </el-col>
        <!-- <el-col :span="4">
            <el-tag size="large" class="info_tag">电子签章预览</el-tag>
        </el-col>
        <el-col :span="20">
            <el-card class="info_tag">
                <iframe v-if="certificate.file!=''" :src="certificate.file"></iframe>
                <div v-else></div>
            </el-card>
        </el-col> -->
    </el-row>
  </el-card>
</template>

<script>
import spaceRow from '@/components/spaceRow.vue';
// import PDF from "pdf-vue3";

// import * as PdfJs from 'pdfjs-dist/legacy/build/pdf.js'
import { ElMessageBox,ElMessage } from 'element-plus';
import axios from 'axios';

export default {
    setup() {
    },
    mounted() {
        this.getCertificateInfo();
        this.getCertificate();
    },
    components:{
         spaceRow
    },
    props: ["certificateTitle", "certificateTag"],
    data() {
        return {
            certificate: {
                cid:'',
                caTag:'',
                ownerTag:'',
                startData:'',
                endData:''},
                certificateFile: '',
            watchCertificate: false
        };
    },
    methods:{
        getCertificateInfo(){
            var pack={
                operator: sessionStorage.getItem('userId'),
                certificateTag: this.certificateTag
            };
            axios.create({baseURL:'/api'})
                 .post('/get-certificate-info', pack)
                 .then((response)=>{
                    this.certificate=response.data;
                 })
                 .catch(error=>ElMessage.error(error.toString()));
        },
        getCertificate() {
            var pack={
                operator: sessionStorage.getItem('userId'),
                certificate_tag: this.certificateTag
            };
            // PdfJs.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry');
            axios.create({baseURL:'/api'})
                .request({
                    url: '/get-certificate',
                    responseType: 'blob',
                    method: 'post',
                    data: pack
                })
                .then((response)=>{
                    // const task = PdfJs.getDocument(window.URL.createObjectURL(response.data));
                    // task.promise.then((pdf)=>{
                    //     this.certificate.file = pdf;
                    //     this.renderPage(1);
                    // })
                    this.certificateFile=window.URL.createObjectURL(new Blob([response.data]));
                    // console.log(1, this.certificate.file);
                })
                .catch(error=>ElMessage.error(error.toString()));
        },
        // renderPage (num) {
        //     this.certificate.file.getPage(num).then((page) => {
        //         const canvas = document.getElementById(this.certificateTag);
        //         const ctx = canvas.getContext('2d')
        //         const dpr = window.devicePixelRatio || 1
        //         const bsr = ctx.webkitBackingStorePixelRatio ||
        //                     ctx.mozBackingStorePixelRatio ||
        //                     ctx.msBackingStorePixelRatio ||
        //                     ctx.oBackingStorePixelRatio ||
        //                     ctx.backingStorePixelRatio ||
        //                     1
        //         const ratio = dpr / bsr
        //         const viewport = page.getViewport({ scale:1.0 })
        //         canvas.width = viewport.width * ratio
        //         canvas.height = viewport.height * ratio
        //         canvas.style.width = viewport.width + 'px'
        //         canvas.style.height = viewport.height + 'px'
        //         ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
        //         const renderContext = {
        //             canvasContext: ctx,
        //             viewport: viewport
        //         }
        //         page.render(renderContext)
        //     })
        // }
        uploadCertificate(certificateFile){
            var pack=new FormData();
            pack.append('operator', sessionStorage.getItem('userId'));
            pack.append('certificate_tag', this.certificateTag);
            pack.append('file', certificateFile.file);
            // this.certificate.file=window.URL.createObjectURL(certificateFile.file);
            // console.log(1, this.certificate.file);
            axios.create({baseURL:'/api'})
                 .post('/set-certificate', pack)
                 .then((response)=>{
                    if(response.data.condition==true)
                        ElMessage({message:'操作成功', type:'success'});
                    else ElMessage.error(response.data.message);   
                    this.getCertificateInfo();
                    this.getCertificate();         
                 })
                 .catch(error=>ElMessage.error(JSON.stringify(error)));
        }
    }
}
</script>

<style>
.signCard{
  margin-left: 3%;
  margin-right: 10%;
  text-align: left;
}

.cardHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info_tag {
    max-width: 95%;
    min-width: 95%;
}

.info_tag_short {
    max-width: 89%;
    min-width: 89%;
}

.image {
    max-width: 80%;
    max-height: 80%;
    min-width: 80%;
    min-height: 80%;
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