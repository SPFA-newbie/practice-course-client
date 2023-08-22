<template>
  <div>
    <el-header>
      <page-head></page-head>
    </el-header>
    <el-aside>
        <menuBar  :createStudent="createStudent"
                  :changeStudent="changeStudent"
                  :changeScore="changeScore" 
                  :nowSelect="nowSelect"
                  @select="select"
                  v-if="refreash">
        </menuBar>
    </el-aside>
    <el-main>
        <div class="mainWindow" v-if="userId==''">
          <needLogin></needLogin>
        </div>
        <div class="mainWindow" v-if="userId!=''">
          <router-view @jump="jump"></router-view>
        </div>        
    </el-main>
  </div>
</template>

<script>
import menuBar from '@/components/menuBar.vue'
import pageHead from '@/components/pageHead.vue'
import needLogin from '@/components/needLogin.vue';

export default {
    name:'home',
    components:{
        menuBar,
        pageHead,
        needLogin
    },
    setup() {},
    mounted(){
      if(sessionStorage.getItem('role')!='admin') this.$router.push('/');
      this.userId=sessionStorage.getItem('userId');
      if(this.userId==null) this.userId='';
      else this.select(this.$route.path.substring(1));
      
    },
    data(){
      return {
        userId:'',
        refreash:true,
        nowSelect:'',
        createStudent:false,
        changeStudent:false,
        changeScore:false
      }
    },
    methods:{
        select(index){
          this.nowSelect=index;
          this.createStudent=false;
          this.changeStudent=false;
          this.changeScore=false;
          this.$router.push(index);
          if(index=='create-student')this.createStudent=true;else
          if(index=='change-student')this.changeStudent=true;else
          if(index=='change-score')this.changeScore=true;
        },
        jump(to){
          this.$router.push(to);
          this.refreash=false;
          this.nowSelect=to;
          this.createStudent=false;
          this.changeStudent=false;
          this.changeScore=false;
          if(to=='create-student')this.createStudent=true;else
          if(to=='change-student')this.changeStudent=true;else
          if(to=='change-score')this.changeScore=true;
          this.refreash=true;
        }
    }
}
</script>

<style scoped>
.mainWindow{
  position: absolute;
  top: 10%;
  width: 82%;
  left: 15%;
  height: 90%;
}
</style>