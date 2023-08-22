<template>
    <div>
        <el-row>
            <el-col :span="4">
                <h2>个人成绩</h2>
            </el-col>
        </el-row>
        <el-row>
            <el-col :offset="1" :span="22">
                <scoreTable :sid="sid" v-if="showTable"></scoreTable>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import scoreTable from '@/components/scoreTable.vue'

export default {
    components:{
        scoreTable
    },
    mounted(){
        this.sid=sessionStorage.getItem('userId');
        this.showTable=true;
    },
    data(){
        return{
            sid: '',
            showTable: false
        }
    }
}
</script>