<template>
    <div class="filter">
        <el-row>
            <el-col :span="2"><el-tag size='large' type='primary' class="tag">日志编号</el-tag></el-col>
            <el-col :span="5"><el-input v-model='logId' class="input" clearable></el-input></el-col>
            <el-col :span="2"><el-tag size='large' type='primary' class="tag">操作者</el-tag></el-col>
            <el-col :span="5"><el-input v-model='operator' class="input" clearable></el-input></el-col>
            <el-col :span="2"><el-tag size='large' type='primary' class="tag">操作内容</el-tag></el-col>
            <el-col :span="5">
                <el-select v-model='operation' placeholder=' ' clearable class="input">
                    <el-option v-for='m in apiList' :key='m' :label='m' :value='m'></el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-button type='danger' @click="clearFilter" class="filter_button">
                    <el-icon size="large"><Delete /></el-icon>
                    &nbsp;
                    清空条件
                </el-button>
            </el-col>
        </el-row>
        <spaceRow></spaceRow>
        <el-row>
            <el-col :span="2"><el-tag size='large' type='primary' class="tag">时间戳</el-tag></el-col>
            <el-col :span="9">
                <el-date-picker v-model='timestamp[0]'
                                type="datetime"
                                format="YYYY-MM-DD hh:mm:ss"
                                :editable="false"
                                :clearable="true"
                                @change="pickerCheck(timestamp[0], 0)"
                                class="picker"/>
            </el-col>
            <el-col :span="1"><el-text>____</el-text></el-col>
            <el-col :span="9">
                <el-date-picker v-model='timestamp[1]'
                                type="datetime"
                                format="YYYY-MM-DD hh:mm:ss"
                                :editable="false"
                                :clearable="true"
                                @change="pickerCheck(timestamp[1], 1)"
                                class="picker"/>
            </el-col>
            <el-col :span="3">
                <el-button type='primary' @click="filterWork" class="filter_button">
                    <el-icon size='large'><Filter /></el-icon>
                    &nbsp;
                    筛选
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import spaceRow from './spaceRow.vue';

import axios from 'axios'
import { ElMessage } from 'element-plus';

export default {
    name:'studentFilter',
    components:{
        spaceRow
    },
    setup() {
        
    },
    data(){
        return{
            apiList:[
                'login', 'get-student',
                'get-photo', 'add-student',
                'get-score-list', 'add-student-group',
                'get-certificate-info', 'remove-student',
                'get-certificate', 'reset-student',
                'set-certificate', 'change-student',
                'get-major-list', 'upload-photo',
                'upload-score-list', 'change-score',
                'create-diploma', 'get-log',
                'show-student', 'download-diploma',
                'change-password'
            ],
            logId: '',
            operator: '',
            operation: '',
            timestamp:[0, 0]
        }
    },
    methods:{
        clearFilter() {
            this.logId='';
            this.operator='';
            this.operation='';
            this.timestamp=['', ''];
        },
        pickerCheck(value, tag){
            console.log(1, value);
            if(value==null){
                if(tag==0) this.timestamp[0]='';else
                if(tag==1) this.timestamp[1]='';
            }
        },
        filterWork() {
            if(this.timestamp[0]!='' && 
               this.timestamp[1]!='' && 
               this.timestamp[0]>this.timestamp[1]){
                ElMessage.error('时间戳过滤器的起始时间晚于结束时间');
                this.timestamp=['', ''];
                return;
            }
            var start_time= -1;
            var end_time= -1;
            if(this.timestamp[0]!='') start_time=this.timestamp[0].valueOf();
            if(this.timestamp[1]!='') end_time=this.timestamp[1].valueOf();
            var pack={
                operator: sessionStorage.getItem('userId'),
                log_id: this.logId,
                log_operator: this.operator,
                operation: this.operation,
                timestamp:{
                    start_time:start_time,
                    end_time: end_time
                }
            }
            // console.log(1, pack);
            axios.create({baseURL:'/api'})
                 .post('/get-log', pack)
                 .then((response)=>{
                    this.$emit('getLog', response.data.result);
                 })
                 .catch(error=>ElMessage.error(error.toString()));
        }

    }
}
</script>

<style>
.filter {
    margin-left: 5%;
    width: 95%;
}
.tag{
    min-width: 90%;
    max-width: 90%;
}
.input{
    min-width: 90%;
    max-width: 90%;
}
.picker {
    min-width: 95%;
    max-width: 95%;
}
.filter_button {
    min-width: 90%;
    max-width: 90%;
}
</style>