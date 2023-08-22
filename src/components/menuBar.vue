<template>
    <el-affix class="affix">
        <el-menu class="menu" :default-active="nowSelect" @select="select">
            <el-menu-item index="certificate-message">
                <el-icon><Stamp /></el-icon>
                <span>证书/签章管理</span>
            </el-menu-item>
            <el-menu-item index="student-message">
                <el-icon><UserFilled /></el-icon>
                <span>学生信息管理</span>
            </el-menu-item>

            <el-menu-item index="create-student" v-if="createStudent">
                <el-icon><CirclePlusFilled /></el-icon>
                <span>新建学生信息</span>
            </el-menu-item>
            <el-menu-item index="change-student" v-if="changeStudent">
                <el-icon><Edit /></el-icon>
                <span>修改学生信息</span>
            </el-menu-item>

            <el-menu-item index="student-score" v-if="this.$store.state.secondStage">
                <el-icon><MessageBox /></el-icon>
                <span>学生成绩管理</span>
            </el-menu-item>

            <el-menu-item index="change-score" v-if="this.$store.state.secondStage && changeScore">
                <el-icon><Edit /></el-icon>
                <span>修改学生成绩</span>
            </el-menu-item>

            <el-menu-item index="upload-photos">
                <el-icon><Picture /></el-icon>
                <span>批量上传照片</span>
            </el-menu-item>
            <el-menu-item index="create-diploma">
                <el-icon><Printer /></el-icon>
                <span>学生证书生成</span>
            </el-menu-item>
            <el-menu-item index="operation-log" v-if="this.$store.state.secondStage">
                <el-icon><Odometer /></el-icon>
                <span>操作日志</span>
            </el-menu-item>
        </el-menu>
        <div class="littleImage">
            <el-image :src="ImageFN"></el-image>
        </div>      
    </el-affix>
</template>

<script>
export default {
    name:"menuBar",
    setup() {
        
    },
    data(){
        return{
            ImageFN:require('@/assets/fn.png')
        }
    },
    props:["createStudent","changeStudent","changeScore","nowSelect"],
    methods:{
        select(index){
            this.$emit('select',index)
        }
    }
}
</script>

<style>
    .affix{
        position: fixed;
        top:10%;
        width: 15%;
        height: 90%;
    }
    .menu{
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .littleImage{
        position: absolute;
        bottom: 0%;
        
    }
</style>