<template>
    <div>
        <el-header>
          <page-head></page-head>
        </el-header>
        <el-aside>
          <el-affix class="affix">
            <el-menu class="menu" :default-active="nowSelect" @select="select">
                <el-menu-item index="my-message">
                    <el-icon><Postcard /></el-icon>
                    <span>查看信息</span>
                </el-menu-item>
                <el-menu-item index="my-score" v-if="this.$store.state.secondStage">
                  <el-icon><Memo /></el-icon>
                    <span>查看成绩</span>
                </el-menu-item>
                <el-menu-item index="my-diploma">
                    <el-icon><CreditCard /></el-icon>
                    <span>证书状态</span>
                </el-menu-item>
                <el-menu-item index="change-password">
                    <el-icon><Lock /></el-icon>
                    <span>修改密码</span>
                </el-menu-item>
            </el-menu>
            <div class="littleImage">
                <el-image :src="ImageCY"></el-image>
            </div>      
        </el-affix>
        </el-aside>
        <el-main>
            <div class="mainWindow">
              <router-view @jump="jump"></router-view>
            </div>
        </el-main>
    </div>
</template>

<script>
import menuBar from '@/components/menuBar.vue'
import pageHead from '@/components/pageHead.vue'
export default {
    name:'home',
    components:{
        menuBar,
        pageHead
    },
    setup() {},
    mounted(){
      if(sessionStorage.getItem('role')!='student') this.$router.push('/');
      this.select(this.$route.path.substring(1));
    },
    data(){
      return {
        refreash:true,
        nowSelect:'',
        ImageCY:require('@/assets/cy.png')
      }
    },
    methods:{
        select(index){
          this.nowSelect=index;
          this.$router.push(index);
        },
        jump(to){
          this.$router.push(to);
          this.nowSelect=to;
          this.refreash=false;
          this.refreash=true;
        }
    }
}
</script>

<style scoped>
.mainWindow{
  position: absolute;
  top: 10%;
  width: 85%;
  left: 15%;
  height: 90%;
}
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
    left: -5%
    
}
</style>