<template>
    <div>
        <el-row>
            <el-col :span="4">
                <h2>学生成绩</h2>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <studentFilter @getStudent="getStudent" ref="filter"></studentFilter>
            </el-col>
        </el-row>
        <spaceRow></spaceRow>
        <el-table :data="result"
                  stripe
                  ref="mainTable"
                  row-key="sid"
                  :expand-row-keys="expandsRow"
                  @expand-change="watchMessage"
                  class="studentList">
            <el-table-column type="expand">
                <template #default="props">
                    <el-row>
                        <el-col :offset="1" :span="4">
                            <h4>成绩表</h4>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :offset="1" :span="22">
                            <scoreTable :sid="props.row.sid" v-if="props.row.sid==this.expandsRow[0]">
                            </scoreTable>
                        </el-col>
                    </el-row>
                    <spaceRow></spaceRow>
                </template>
            </el-table-column>
            <el-table-column prop="sname" label="姓名" sortable></el-table-column>
            <el-table-column prop="major" label="专业" sortable></el-table-column>
            <el-table-column prop="sid" label="学号" sortable></el-table-column>
            <el-table-column prop="enrollment" label="入学时间" sortable></el-table-column>
            <el-table-column prop="graduation" label="毕业时间" sortable></el-table-column>
            <el-table-column :min-width="80">
                <template #header>
                    <el-row>
                        <el-col :span="8"><el-text type="info">操作</el-text></el-col>
                        <el-col :span="16">
                            <el-upload action="" 
                                       accept=".csv" 
                                       :http-request="uploadScore"
                                       :show-file-list="false">
                                <template #trigger>
                                    <el-button type='success' size="small">
                                        <el-icon><FolderAdd /></el-icon>
                                        &nbsp;
                                        批量导入
                                    </el-button>
                                </template>
                            </el-upload>
                        </el-col>
                    </el-row>
                </template>
                <template #default="scope">
                    <el-row>
                        <el-col :span="24">
                            <el-button size="small" 
                                       type="primary" 
                                       class="rowButton"
                                       @click="changeScore(scope.row.sid)">修改信息
                            </el-button>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <template v-slot:empty>
                <el-empty description="无查询结果" />
            </template>
        </el-table>
    </div>
</template>

<script>
import studentFilter from '@/components/studentFilter.vue';
import scoreTable from '@/components/scoreTable.vue';
import spaceRow from '@/components/spaceRow.vue';

import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';

export default {
    setup() {
        
    },
    components:{
        studentFilter,
        scoreTable,
        spaceRow
    },
    data(){
        return{
            result:[],
            expandsRow:[]
        }
    },
    methods:{
        getStudent(datas){
            this.result=datas;
        },
        watchMessage(row){
            if(this.expandsRow.length!=0 && this.expandsRow[0]==row.sid) 
                this.expandsRow=[];
            else
                this.expandsRow=[row.sid];
        },
        uploadScore(csvFile){
            var pack=new FormData();
            pack.append('operator', sessionStorage.getItem('userId'));
            pack.append('file', csvFile.file);

            if(csvFile.file.size>524288){
                ElMessage.error('数据量大于512KB, 请分割数据');
                return;
            }
            
            axios.create({baseURL: '/api'})
                 .post('/upload-score-list', pack)
                 .then((response)=>{
                    if(response.data.condition==true) {
                        ElMessage({message: '上传成功', type:'success'});
                        this.$refs.filter.filterWork();
                    }else ElMessage.error(response.data.message);
                  })
                 .catch(error=>ElMessage.error(error.toString()));
        },
        changeScore(sid){
            this.$store.state.scoreSid=sid;
            this.$emit('jump', 'change-score');
        }
        
    }
}
</script>

<style scoped>
.studentList{
    margin-left: 3%;
    max-width: 95%;
    min-width: 95%;
}
.rowButton{
    max-width: 95%;
    min-width: 95%;
}
</style>