<template>
    <div>
        <el-row>
            <el-col :span="4">
                <h2>操作日志</h2>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <logFilter @getLog="getLog"></logFilter>
            </el-col>
        </el-row>
        <el-table :data="result" stripe class="logList">
            <el-table-column type="expand">
                <template #default="props">
                    <el-row><el-col :span="24"><el-card>
                        <template #header>
                            <el-text size="large">详细信息</el-text>
                        </template>
                        <el-text>{{ props.row.detail }}</el-text>
                    </el-card></el-col></el-row>
                </template>
            </el-table-column>
            <el-table-column prop="log_id" label="日志编号" sortable></el-table-column>
            <el-table-column prop="operator" label="操作者" sortable></el-table-column>
            <el-table-column prop="operation" label="操作类型" sortable></el-table-column>
            <el-table-column prop="datetime" label="时间戳" sortable sort-by="timestamp"></el-table-column>
            <template v-slot:empty>
                <el-empty description="无查询结果" />
            </template>
        </el-table>
    </div>
</template>

<script>
import logFilter from '@/components/logFilter.vue'

import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';
import logFilterVue from '@/components/logFilter.vue';

export default {
    setup() {
        
    },
    components:{
        logFilter
    },
    data(){
        return{
            result:[]
        }
    },
    methods:{
        getLog(result){
            this.result=result;
            this.result.forEach(element => {
                element.datetime=new Date(element.timestamp);
                element.datetime=element.datetime.toString();
            });
        }
    }
}
</script>

<style scoped>
.logList{
    margin-left: 3%;
    width: 95%;
}
</style>