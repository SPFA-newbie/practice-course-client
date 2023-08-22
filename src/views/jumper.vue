<template>
    
</template>

<script>
export default {
    mounted(){
        var role=sessionStorage.getItem('role');
        if(role==null) this.$router.push('/login'); else
        if(role=='admin') this.$router.push('/admin'); else
        if(role=='student') this.$router.push('student'); else
            this.$router.push('/login');
            // console.log("error","error");
    }
}
</script>