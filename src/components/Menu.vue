<template>
    <div class = "ui secondry pointing orange inverted massive menu stackable">
        <!-- 基本的なコンテンツはここに記載する -->
        <img class="logoimg" src="src/components/sukusucook.png">
        <span class="comment">プロが作る子供のためのレシピサービス</span>
        <div class="right menu">
            <router-link active-class="active" class="item" exact to="/">
                レシピ集はこちら
            </router-link>
            <router-link active-class="active" class="item" exact to="/MyPage" v-if="orLogin">
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
                return this.orLogin ? 'LOGOUT' : 'LOGIN'
            },
            
            orLogin(){
                var ABC = window.localStorage.getItem( "token" );
                if ( ABC ){
                	//alert('あり');
                	return true;
                } else {
                	//alert('なし');
                	return false;
                }
            }
            
        },
        created: async function () {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    // apiからarticleを取得する
	
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
        width:120px;
        height:70px;
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