<template>
    <div>
        <el-row>
            <el-col :span="4">
                <h2>学生证书生成</h2>
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
                  class="studentList">
            <el-table-column type="expand" width="1" class-name="expandRow">
                <template #default="props">
                    <studentCard :info="props.row"></studentCard>
                </template>
            </el-table-column>
            <el-table-column type="selection" :selectable="checkDiplomaProp">
            </el-table-column>
            <el-table-column prop="sname" label="姓名" sortable :min-width="80"></el-table-column>
            <el-table-column prop="major" label="专业" sortable></el-table-column>
            <el-table-column prop="sid" label="学号" sortable :min-width="140"></el-table-column>
            <el-table-column prop="enrollment" label="入学时间" sortable></el-table-column>
            <el-table-column prop="graduation" label="毕业时间" sortable></el-table-column>
            <el-table-column :min-width="100">
                <template #header>
                    <el-row>
                        <el-col :span="9"><el-text type="info">证书状态</el-text></el-col>
                        <el-col :span="15">
                            <el-select v-model="selectType" 
                                       placeholder="" 
                                       size="small" 
                                       @change="this.$refs.mainTable.clearSelection()">
                                <el-option key="graduation" value="graduation" label="毕业证书"></el-option>
                                <el-option key="degree" value="degree" label="学位证书"></el-option>
                                <el-option key="transcript" value="transcript" label="成绩证明"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </template>
                <template #default="scope">
                    <el-row><el-col :offset="8">
                        <el-text>{{ getCondition(scope.row.diploma_condition) }}</el-text>
                    </el-col></el-row>
                </template>
            </el-table-column>
            <el-table-column :min-width="80">
                <template #header>
                    <el-row>
                        <el-col :span="8"><el-text type="info">操作</el-text></el-col>
                        <el-col :span="16">
                            <el-button type='success' size="small" @click="createDiplomas">
                                <el-icon><MessageBox /></el-icon>
                                &nbsp;
                                生成证书
                            </el-button>
                        </el-col>
                    </el-row>
                </template>
                <template #default="scope">
                    <el-row>
                        <el-col :span="24">
                            <el-button size="small" 
                                       type="primary" 
                                       class="rowButton"
                                       v-if="expandsRow[0]!=scope.row.sid" 
                                       @click="watchMessage(scope.row)">详细信息
                            </el-button>
                            <el-button size="small" 
                                       type="primary" 
                                       class="rowButton"
                                       v-else 
                                       @click="watchMessage(scope.row)">收起
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
            result:[],
            expandsRow:[],
            selectType:'graduation'
        }
    },
    methods:{
        getStudent(datas){
            this.result=datas;
        },
        checkDiplomaProp(row, index){
            if(row.diploma_condition[this.selectType]==false) return true;
            return false;
        },
        switchDiplomaCondition(condition){
            if(condition==true) return '已生成';
            if(condition==false) return '未生成';
            return '状态错误';
        },
        getCondition(row){
            if(this.selectType=='graduation') return this.switchDiplomaCondition(row.graduation);
            if(this.selectType=='degree') return this.switchDiplomaCondition(row.degree);
            if(this.selectType=='transcript') return this.switchDiplomaCondition(row.transcript);
            return '状态错误';
        },
        watchMessage(row){
            if(this.expandsRow.length!=0 && this.expandsRow[0]==row.sid) 
                this.expandsRow=[];
            else
                this.expandsRow=[row.sid];
        },
        createDiplomas(){
            var pack={
                operator: sessionStorage.getItem('userId'),
                students: [],
                type: this.selectType
            };
            var selectStudent=this.$refs.mainTable.getSelectionRows();
            selectStudent.forEach(element => {
                pack.students.push(element.sid);
            });
            axios.create({baseURL:'/api'})
                 .post('/create-diploma', pack)
                 .then((response)=>{
                    if(response.data.fail_number==0) ElMessage({message:'所有证书生成完成!', type:'success'});
                        else ElMessage({message:''+response.data.fail_number+'份证书生成失败!', type: 'warning'});
                    this.$refs.mainTable.clearSelection();
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
    max-width: 95%;
    min-width: 95%;
}
.expandRow{
    visibility: hidden;
}
.rowButton{
    max-width: 95%;
    min-width: 95%;
}
</style>