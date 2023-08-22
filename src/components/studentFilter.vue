<template>
    <div class="filter">
        <el-row>
            <el-col :span="1"><el-tag size='large' type='primary' class="tag">姓名</el-tag></el-col>
            <el-col :span="3"><el-input v-model='this.$store.state.studentFilter.sname'></el-input></el-col>
            <el-col :span="2"><el-tag size='large' type='primary' class="tag">学位证</el-tag></el-col>
            <el-col :span="2">
                <el-select v-model='this.$store.state.studentFilter.diploma_condition.degree' placeholder=' '>
                    <el-option v-for='d in condition_list' :key='d' :label='d.label' :value='d.value'></el-option>
                </el-select>
            </el-col>
            <el-col :span="2"><el-tag size='large' type='primary' class="tag">修习专业</el-tag></el-col>
            <el-col :span="3">
                <el-select v-model='this.$store.state.studentFilter.major' placeholder=' ' :clearable='true'>
                    <el-option v-for='m in this.$store.state.majorList' :key='m' :label='m' :value='m'></el-option>
                </el-select>
            </el-col>
            <el-col :span="2"><el-tag size='large' type='primary' class="tag">入学时间</el-tag></el-col>
            <el-col :span="3">
                <el-date-picker v-model='this.$store.state.studentFilter.enrollment[0]'
                                type="date"
                                value-format="YYYY-MM-DD"
                                :editable="false"
                                :clearable="true"
                                @change="pickerCheck(this.$store.state.studentFilter.enrollment[0], 'e0')"
                                class="date_picker"/>
            </el-col>
            <el-col :span="3">
                <el-date-picker v-model='this.$store.state.studentFilter.enrollment[1]'
                                type="date"
                                value-format="YYYY-MM-DD"
                                :editable="false"
                                :clearable="true"
                                @change="pickerCheck(this.$store.state.studentFilter.enrollment[1], 'e1')"
                                class="date_picker"/>
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
            <el-col :span="1"><el-tag size='large' type='primary' class="tag">学号</el-tag></el-col>
            <el-col :span="3"><el-input v-model='this.$store.state.studentFilter.sid'></el-input></el-col>
            <el-col :span="2"><el-tag size='large' type='primary' class="tag">毕业证</el-tag></el-col>
            <el-col :span="2">
                <el-select v-model='this.$store.state.studentFilter.diploma_condition.graduation' placeholder=' '>
                    <el-option v-for='d in condition_list' :key='d' :label='d.label' :value='d.value'></el-option>
                </el-select>
            </el-col>
            <el-col :span="2"><el-tag size='large' type='primary' class="tag">成绩证明</el-tag></el-col>
            <el-col :span="3">
                <el-select v-model='this.$store.state.studentFilter.diploma_condition.transcript' placeholder=' '>
                    <el-option v-for='d in condition_list' :key='d' :label='d.label' :value='d.value'></el-option>
                </el-select>
            </el-col>
            <el-col :span="2"><el-tag size='large' type='primary' class="tag">毕业时间</el-tag></el-col>
            <el-col :span="3">
                <el-date-picker v-model='this.$store.state.studentFilter.graduation[0]'
                                type="date"
                                value-format="YYYY-MM-DD"
                                :editable="false"
                                :clearable="true"
                                @change="pickerCheck(this.$store.state.studentFilter.graduation[0], 'g0')"
                                class="date_picker"/>
            </el-col>
            <el-col :span="3">
                <el-date-picker v-model='this.$store.state.studentFilter.graduation[1]'
                                type="date"
                                value-format="YYYY-MM-DD"
                                :editable="false"
                                :clearable="true"
                                @change="pickerCheck(this.$store.state.studentFilter.graduation[1], 'g1')"
                                class="date_picker"/>
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
    mounted(){
        if(sessionStorage.getItem('userId')==null) return;
        // console.log(2, this.$store.state.majorList);
        if(this.$store.state.majorList==null || 
           typeof this.$store.state.majorList != typeof [] || 
           this.$store.state.majorList.length==0) {
            axios.create({baseURL:'/api'})
                .post('/get-major-list', {operator: sessionStorage.getItem('userId')})
                .then((response)=>{
                    this.$store.state.majorList=response.data.majors;
                    if(this.$store.state.majorList==null || typeof this.$store.state.majorList != typeof []) {
                        this.$store.state.majorList=[];
                        ElMessage.error('获取专业列表失败');
                    }
                    // console.log(1, response.data);
                    // console.log(2, this.$store.state.majorList);
                })
                .catch(error=>ElMessage.error(error.toString()));
        };
        var emptyFilter={
                sname:'',
                sid:'',
                major:'',
                enrollment:['', ''],
                graduation:['', ''],
                diploma_condition:{
                    graduation: 0,
                    degree: 0,
                    transcript: 0
                }
        };
        if(this.$store.state.studentFilter==null || typeof this.$store.state.studentFilter!= typeof {})
            this.$store.state.studentFilter=JSON.parse(JSON.stringify(emptyFilter));
        if(JSON.stringify(this.$store.state.studentFilter)!=JSON.stringify(emptyFilter))
            this.filterWork();
    },
    data(){
        return{
            // nowSelect:{
            //     sname:'',
            //     sid:'',
            //     major:'',
            //     enrollment:['', ''],
            //     graduation:['', ''],
            //     diploma_condition:{
            //         graduation: 0,
            //         degree: 0,
            //         transcript: 0
            //     }
            // },
            condition_list:[
                {label: '不筛选', value: 0}, 
                {label: '已生成', value: 1}, 
                {label: '未生成', value: -1}
            ]
        }
    },
    methods:{
        clearFilter() {
            this.$store.state.studentFilter={
                sname:'',
                sid:'',
                major:'',
                enrollment:['', ''],
                graduation:['', ''],
                diploma_condition:{
                    graduation: 0,
                    degree: 0,
                    transcript: 0
                }
            }
        },
        pickerCheck(value, tag) {
            // console.log(1, value);
            if(value==null){
                if(tag=='e0') this.$store.state.studentFilter.enrollment[0]='';else
                if(tag=='e1') this.$store.state.studentFilter.enrollment[1]='';else
                if(tag=='g0') this.$store.state.studentFilter.graduation[0]='';else
                if(tag=='g1') this.$store.state.studentFilter.graduation[1]='';
            }
        },
        filterWork() {
            var pack=JSON.parse(JSON.stringify(this.$store.state.studentFilter));
            pack.operator=sessionStorage.getItem('userId');
            pack.enrollment={
                start_time: pack.enrollment[0],
                end_time: pack.enrollment[1]
            };
            if(pack.enrollment.start_time!='' && 
               pack.enrollment.end_time!='' && 
               pack.enrollment.start_time>pack.enrollment.end_time) {
                ElMessage.error('入学时间过滤器的起始时间晚于结束时间');
                this.$store.state.studentFilter.enrollment=['',''];
                return;
            }
            pack.graduation={
                start_time: pack.graduation[0],
                end_time: pack.graduation[1]
            };
            if(pack.graduation.start_time!='' && 
               pack.graduation.end_time!='' && 
               pack.graduation.start_time>pack.graduation.end_time) {
                ElMessage.error('毕业时间过滤器的起始时间晚于结束时间');
                this.$store.state.studentFilter.graduation=['',''];
                return;
            }
            // console.log(1, pack);
            axios.create({baseURL:'/api'})
                 .post('/get-student', pack)
                 .then((response)=>{
                    this.$emit('getStudent', response.data.result);
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
.date_picker {
    max-width: 90%;
}
.filter_button {
    min-width: 90%;
    max-width: 90%;
}
</style>