<template>
    <div>
        <el-row>
            <el-col :span="4"><h2>修改学生成绩</h2></el-col>
            <el-col :span="2">
                <el-button class="submitButton" @click="submit" type="success">
                    提交修改
                </el-button>
            </el-col>
        </el-row>
        <spaceRow></spaceRow>
        <el-row class="mainStudentCard">
            <el-col :span="2"><el-tag size="large" class="info_tag">学号</el-tag></el-col>
            <el-col :span="10">
                <el-tag class="info_bar" type="info" size="large" effect="plain">
                    {{ sid }}
                </el-tag>
            </el-col>
        </el-row>
        <spaceRow></spaceRow>
        <el-row class="mainStudentCard">
            <el-col :span="24">
                <el-table :data="result" stripe>
                    <el-table-column prop="cname" label="课程名称" sortable></el-table-column>
                    <el-table-column label="得分">
                        <template #default="scope">
                            <el-input v-model="scope.row.score" placeholder=" "></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="课程学分">
                        <template #default="scope">
                            <el-input v-model="scope.row.credit" placeholder=" "></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="课程属性">
                        <template #default="scope">
                            <el-input v-model="scope.row.prop" placeholder=" "></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="学时">
                        <template #default="scope">
                            <el-input v-model="scope.row.ctime" placeholder=" "></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template #header>
                            <el-row>
                                <el-col :span="6"><el-text type="info">操作</el-text></el-col>
                                <el-col :span="18">
                                    <el-button type='success' 
                                               size="small" 
                                               @click="addScoreDialog=true" 
                                               class="rowButton">
                                        <el-icon><DocumentAdd /></el-icon>
                                        &nbsp;
                                        添加
                                    </el-button>
                                </el-col>
                            </el-row>
                        </template>
                        <template #default="scope">
                            <el-popconfirm title="是否删除"
                                           confirm-button-text="确定" 
                                           cancel-button-text="取消"
                                           @confirm="deleteList(scope.row)">
                                <template #reference>
                                    <el-button size="small" 
                                               type="danger" 
                                               class="rowButton">删除
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-dialog v-model="addScoreDialog"
                   title="添加课程"
                   :before-close="newCourseName=''">
            <el-row class="mainStudentCard">
                <el-col :span="4"><el-tag size="large" class="info_tag">课程名称</el-tag></el-col>
                <el-col :span="18">
                    <el-input v-model="newCourseName" placeholder=" "></el-input>
                </el-col>
            </el-row>
            <template #footer>
                <el-button @click="addScoreDialog=false">取消</el-button>
                <el-button type="primary" @click="addScore">添加</el-button>
            </template>
        </el-dialog>    
    </div>
</template>

<script>
import spaceRow from '@/components/spaceRow.vue';

import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';

export default {
    components:{
        spaceRow
    },
    mounted(){
        if(this.$store.state.scoreSid==''){
            this.$emit('jump', 'student-score');
            return;
        }
        this.sid=this.$store.state.scoreSid;
        var pack={
            operator: sessionStorage.getItem('userId'),
            sid: this.$store.state.scoreSid
        };
        axios.create({baseURL:'/api'})
             .post('/get-score-list', pack)
             .then((response)=>{
                this.result=response.data.result;
              })
             .catch(error=>ElMessage.error(error.toString()));
    },
    data(){
        return{
            sid:'',
            result:[],
            addScoreDialog: false,
            newCourseName: ''
        }
    },
    methods: {
        deleteList(row) {
            for(var i=0;i<this.result.length;i++)
                if(this.result[i]==row) {
                    this.result.splice(i, 1);
                    return;
                }
        },
        addScore() {
            for(var i=0;i<this.result.length;i++)
                if(this.result[i].cname==this.newCourseName) {
                    ElMessage.error('存在重复名称的课程！');
                    this.newCourseName='';
                    return;
                }
                this.result.push({
                    cname: this.newCourseName,
                    score: '',
                    credit: '',
                    prop: '',
                    ctime: ''
                });
                ElMessage({message:'添加成功！', type:'success'});
                this.addScoreDialog=false;
        },
        submit() {
            var pack={
                operator: sessionStorage.getItem('userId'),
                sid: this.sid,
                result: this.result
            };
            axios.create({baseURL:'/api'})
                 .post('/change-score', pack)
                 .then((response)=>{
                    if(response.data.condition==true) {
                        ElMessage({message:'操作成功', type:'success'});
                        this.$emit('jump', 'student-score');
                    } else ElMessage.error(response.data.message);
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
.submitButton{
    max-width: 95%;
    max-height: 40%;
    min-width: 95%;
    min-height: 40%;
    margin-top: 25%;
}
.rowButton{
    max-width: 50%;
    min-width: 50%;
}
</style>