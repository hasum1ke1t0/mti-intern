<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div style="text-align: center;">
        <img class="logoimg" src="src/components/sukusucook.png" >
      </div>
      <div class="ui segment"  v-if="!isLogined">
        <!--ここにセグメントの中身を記述する -->
        <form class="ui large form" @submit.prevent="submit">
          <div class ="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" placeholder="ID" v-model="user.userId">
            </div>
          </div>
          
          <div class ="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" placeholder="Password" v-model="user.password">
            </div>
          </div>
          
          <div class ="field" v-if="!isLogin">
            <div class="ui left icon input">
              <i class="tag icon"></i>
              <input type="text" placeholder="Username" v-model="user.userName">
            </div>
          </div>
          
          <div class ="field" v-if="!isLogin">
            <div class="ui left icon input">
              <i class="calendar icon"></i>
              <input type="text" placeholder="birthday" v-model.number="user.birthday">
            </div>
          </div>
          <button class="ui huge green fluid button" type="submit">
            {{submitText}}
          </button>
        </form>
      </div>
      <button @click="toggleMode()" class="ui hoge grey fluid button" type="submit" v-if="!isLogined">
        {{toggleText}}
      </button>
        <div class="ui segment" v-if="isLogined">
          <p>ログイン中：{{userName}}さん</p>
        </div>
      <button @click="logout()" class="ui hoge grey fluid button" type="submit" v-if="isLogined">
        ログアウト
      </button>
        
      
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from '@/assets/config.js';

export default {
  name: 'Login',

  components: {
    // 読み込んだコンポーネント名をここに記述する
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      isLogin: true,
      isLogined:true,
      user:{
        userId:null,
        password:null,
        userName:null,
        birthday:null,
      },
    };
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    submitText(){
      
      return this.isLogin ? 'ログイン' : '新規登録';
    },
    toggleText(){
      return this.isLogin ? '新規登録' : 'ログイン';
    },
    userName(){
      return this.user.userName
    }
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    toggleMode(){
      console.log("toggleMode")
      this.isLogin = !this.isLogin
    },
    loginOrOut(){
      this.isLogined = !this.isLogined
    },
    logout(){
      this.isLogined = !this.isLogined
      
      console.log("トークン",window.localStorage.getItem('token'));
      window.localStorage.clear()
      console.log("userId",window.localStorage.getItem('userId'));
      /*global location*/
       location.reload();
      console.log("ログアウト完了")
    },
    // 非同期操作が入るのでasyncを付与する
    async submit(){
      if(this.isLogin){
        //ログイン処理はここに
        console.log('login')
        // リクエストボディを指定する
        const requestBody = {
          userId:this.user.userId,
          password:this.user.password,
        };
  
        try {
          /* global fetch */
          const res = await fetch(baseUrl + '/user/login',  {
            method: 'POST',
            body: JSON.stringify(requestBody),
          });
  
          const text = await res.text();
          const jsonData = text ? JSON.parse(text) : {}
  
          // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
          if (!res.ok) {
            const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
            throw new Error(errorMessage);
          }
          
          window.localStorage.setItem('token',jsonData.token);
          window.localStorage.setItem('userName',jsonData.userName);
          window.localStorage.setItem('birthday',jsonData.birthday);
          
          window.localStorage.setItem('userId',this.user.userId)
          console.log("ローカルストレージ",window.localStorage)
          this.isLogined=true
          
          // 成功時の処理
          console.log("ログイン完了")
          //ページ遷移
          console.log("ページ遷移開始")

          await this.$router.push('/MyPage')
          this.$router.go({path:'/MyPage',force:true})
          //ページ遷移終了
          console.log("ページ遷移終了")

        } catch (e) {
          // エラー時の処理
          console.log("エラー")
          console.log(e)
        }
        return
      }
      //新規登録処理はここに
      console.log("signup")
      // headerを指定する
      const headers = {'Authorization': 'mtiToken'};
      // リクエストボディを指定する
      const requestBody = {
        userId:this.user.userId,
        password:this.user.password,
        userName:this.user.userName,
        birthday:this.user.birthday,
      };
      console.log(requestBody)

      try {
        /* global fetch */
        const res = await fetch(baseUrl + '/user/signup',  {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers
        });

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {}

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
          throw new Error(errorMessage);
        }
        
        // 成功時の処理
        console.log("サインアップ完了",jsonData);
      } catch (e) {
        // エラー時の処理
        console.log(e)
      }
      },
    
  },
  created : async function(){
      console.log("クリエイテッド")
      console.log("トークン",window.localStorage)
      if (window.localStorage.getItem('token') == null){
        console.log("トークンがないのでログアウト状態です")
        this.isLogined = false
      }
      else{
        console.log("トークンがあるのでログイン状態です")
        this.isLogined =true
        this.user.userName=window.localStorage.getItem('userName');
      }
    }
}
</script>

<style scoped>
/* このコンポーネントだけに適用するCSSはここに記述する */
.logoimg{
        width:350px;
        margin:1rem;
    }
</style>
