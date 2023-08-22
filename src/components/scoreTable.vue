<template>
    <el-table :data="result" stripe>
        <el-table-column prop="cname" label="课程名称" sortable></el-table-column>
        <el-table-column prop="score" label="得分" sortable></el-table-column>
        <el-table-column prop="credit" label="课程学分" sortable></el-table-column>
        <el-table-column prop="prop" label="课程属性" sortable></el-table-column>
        <el-table-column prop="ctime" label="学时" sortable></el-table-column>
    </el-table>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';

export default {
    props:['sid'],
    mounted(){
        var pack={
            operator: sessionStorage.getItem('userId'),
            sid: this.sid
        };
        axios.create({baseURL:'/api'})
             .post('/get-score-list', pack)
             .then((response)=>{
                this.result=response.data.result;
              })
             .catch(error=>ElMessage.error(error.toString()));
    },
    data(){
        return {
            result: []
        }
    }

}
</script>