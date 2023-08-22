<template>
    <div>
        <el-row>
            <el-col :span="4">
                <h2>学生信息</h2>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <studentFilter @getStudent="getStudent" ref="filter"></studentFilter>
            </el-col>
        </el-row>
        <spaceRow></spaceRow>
        <el-table :data="result" stripe class="studentList">
            <el-table-column type="expand">
                <template #default="props">
                    <studentCard :info="props.row"></studentCard>
                </template>
            </el-table-column>
            <el-table-column prop="sname" label="姓名" sortable></el-table-column>
            <el-table-column prop="major" label="专业" sortable></el-table-column>
            <el-table-column prop="sid" label="学号" sortable></el-table-column>
            <el-table-column prop="enrollment" label="入学时间" sortable></el-table-column>
            <el-table-column prop="graduation" label="毕业时间" sortable></el-table-column>
            <el-table-column :min-width="120">
                <template #header>
                    <el-row>
                        <el-col :span="4"><el-text type="info">操作</el-text></el-col>
                        <el-col :span="10">
                            <el-button type='success' size="small" @click="addStudent">
                                <el-icon><DocumentAdd /></el-icon>
                                &nbsp;
                                添加学生
                            </el-button>
                        </el-col>
                        <el-col :span="10">
                            <el-upload action="" 
                                       accept=".csv" 
                                       :http-request="uploadStudent"
                                       :on-success="uploadStudentSuccess"
                                       :on-error="uploadStudentError"
                                       :show-file-list="false">
                                <template #trigger>
                                    <el-button type='primary' size="small">
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
                    <el-button size="small" type="primary" @click="changeMessage(scope.row)">修改资料</el-button>
                    <el-popconfirm title="是否重置？" 
                                   confirm-button-text="确定" 
                                   cancel-button-text="取消"
                                   @confirm="resetStudent(scope.row.sid)">
                        <template #reference>
                            <el-button size="small" type="warning">重置密码</el-button>
                        </template>
                    </el-popconfirm>
                    <el-popconfirm title="是否删除？" 
                                   confirm-button-text="确定" 
                                   cancel-button-text="取消" 
                                   @confirm="deleteStudent(scope.row.sid)">
                        <template #reference>
                            <el-button size="small" type="danger">删除</el-button>
                        </template>
                    </el-popconfirm>
                    
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
import studentCard from '@/components/studentCard.vue';
import spaceRow from '@/components/spaceRow.vue';

import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';

export default {
    setup() {
        
    },
    components:{
        studentFilter,
        studentCard,
        spaceRow
    },
    data(){
        return{
            result:[]
        }
    },
    methods:{
        getStudent(datas){
            this.result=datas;
        },
        uploadStudent(csvFile){
            var pack=new FormData();
            pack.append('operator', sessionStorage.getItem('userId'));
            pack.append('file', csvFile.file);
            if(csvFile.file.size>524288){
                ElMessage.error('数据量大于512KB, 请分割数据');
                return;
            }
            axios.create({
                    baseURL:'/api'
                 })
                 .post('/add-student-group', pack)
                 .then((response)=>{
                    if(response.data.condition==true)
                        ElMessage({message:'操作成功', type:'success'});
                    else ElMessage.error(response.data.message);
                    this.$refs.filter.filterWork();
                 })
                 .catch(error=>ElMessage.error(JSON.stringify(error)));
        },
        uploadStudentSuccess(response){
            if(response.condition==true)
                ElMessage({message:'操作成功', type:'success'});
            else ElMessage.error(response.message);
            this.$refs.filter.filterWork();  
        },
        uploadStudentError(error){
            ElMessage.error(JSON.stringify(error));
        },
        changeMessage(message){
            this.$store.state.studentInfo=message;
            this.$emit('jump','change-student');
        },
        resetStudent(sid){
            if(sessionStorage.getItem('role')!='admin') 
                this.$router.push('/');
            var pack={
                operator: sessionStorage.getItem('userId'),
                sid: sid
            };
            axios.create({baseURL:'/api'})
                 .post('/reset-student', pack)
                 .then((response)=>{
                    if(response.data.condition==true)
                        ElMessage({message:'操作成功', type:'success'});
                    else ElMessage.error(response.data.message);
                 })
                 .catch(error=>ElMessage.error(error.toString()));
        },
        addStudent(){
            this.$emit('jump', 'create-student');
        },
        deleteStudent(sid){
            if(sessionStorage.getItem('role')!='admin') 
                this.$router.push('/');
            var pack={
                operator: sessionStorage.getItem('userId'),
                sid: sid
            };
            axios.create({baseURL:'/api'})
                 .post('/remove-student', pack)
                 .then((response)=>{
                    if(response.data.condition==true)
                        ElMessage({message:'操作成功', type:'success'});
                    else ElMessage.error(response.data.message);
                    this.$refs.filter.filterWork();
                 })
                 .catch(error=>ElMessage.error(error.toString()));
        }
    }
}
</script>

<style scoped>
.studentList{
    margin-left: 3%;
    width: 95%;
}
</style>