<template>
    <div class = "ui secondry pointing orange inverted massive menu">
        <!-- 基本的なコンテンツはここに記載する -->
        <img class="logoimg" src="src/components/sukusucook.png">
        <span class="comment">プロが作る子供のためのレシピサービス</span>
        <div class="right menu">
            <router-link active-class="active" class="item" exact to="/">
                レシピ集はこちら
            </router-link>
            <router-link active-class="active" class="item" exact to="/MyPage">
                MY PAGE
            </router-link>
            <a @click="logout" class="item">{{ loginText }}</a>
        </div>
    </div>
</template>
<script>
    export default{
        name:'Menu',
        computed:{
                loginText(){
      return this.isLogin ? 'LOGOUT' : 'LOGIN'
            },
        },
        
        
        methods:{
            logout(){
                this.$router.push({name:"Login"});
            }
        },
    };
</script>
<style scoped>
    .logoimg{
        width:10%;
        margin:1rem;
    }
    
    .comment{
        color: white;
        font-size: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        margin:1rem;
    }

</style>