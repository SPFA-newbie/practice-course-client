<template>
    <div>
        <div v-if="userId==''">
            <needLogin></needLogin>
        </div>
        <div v-if="userId!=''">
            <el-row>
                <el-col :span="4">
                    <h2>电子证章信息</h2>
                </el-col>
            </el-row>
            <el-row>
                <el-col :offset="1" :span="11">
                    <certificateCard certificateTitle="学校证章" certificateTag="school">
                    </certificateCard>
                </el-col>
                <el-col :span="11">
                    <certificateCard certificateTitle="校长证章" certificateTag="principal">
                    </certificateCard>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import certificateCard from '@/components/certificateCard.vue'
import needLogin from '@/components/needLogin.vue'
import spaceRow from '@/components/spaceRow.vue'

export default {
    name:'myMessage',
    setup() {
        
    },
    components:{
    certificateCard,
    needLogin,
    spaceRow
},
    mounted(){
        this.userId=sessionStorage.getItem('userId');
        if(this.userId==null) this.userId='';
    },
    data(){},
    methods:{
        jump(to){
            this.$emit('jump',to);
        }
    }
}
</script>

<style scoped>
.messageTip{
    text-align: right;
}
.messageArea{
    text-align: left;
}
</style>