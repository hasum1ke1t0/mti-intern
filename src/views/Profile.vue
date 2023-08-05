<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <!--ここにセグメントの中身を記述する -->
        <form class="ui large form" @submit.prevent="submit">
          <div class ="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" placeholder="ID" v-model="user.userId" required disabled>
            </div>
          </div>
          
          <div class ="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" placeholder="Password" v-model="user.password">
            </div>
          </div>
          
          <div class ="field">
            <div class="ui left icon input">
              <i class="tag icon"></i>
              <input type="text" placeholder="Nickname" v-model="user.nickname">
            </div>
          </div>
          
          <div class ="field">
            <div class="ui left icon input">
              <i class="calendar icon"></i>
              <input type="text" placeholder="Age" v-model.number="user.age">
            </div>
          </div>
          <button class="ui huge green fluid button" type="submit">
            更新
          </button>
        </form>
      </div>
      <button @click="deleteUser" class="ui hoge grey fluid button" type="submit">
        退会
      </button>
        
      
    </div>
  </div>
</template>

<script>
import {baseUrl} from '@/assets/config.js';
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';

export default {
  name: 'Profile',

  components: {
    // 読み込んだコンポーネント名をここに記述する
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      user:{
        userId: window.localStorage.getItem('userId'),
        password: null,
        nickname:null,
        age:null,
      },
    };
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
  },

  methods: {
    async deleteUser(){
      const headers = {'Authorization':'mtiToken'};
      try{
        /* global fetch*/
        const res = await fetch(`${baseUrl}/user?userId=${this.user.userId}`,{
          method:"DELETE",
          headers
        });
        const text = await res.text();
        const jsonData = text ? JSON.parse(text):{}
        
        if(!res.ok){
          const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
          throw new Error(errorMessage)
        }
        this.$router.push({name:'Login'});
        
      }catch(e){
        //エラー時の処理
      }
    },
    // Vue.jsで使う関数はここで記述する
    async submit() {
      // headerを指定する
      const headers = {'Authorization': 'mtiToken'};
      // リクエストボディを指定する
      const {userId, password, nickname, age}=this.user;
      const requestBody = {
        userId,
        password,
        nickname,
        age
      };

      try {
        /* global fetch */
        const res = await fetch(baseUrl + '/user',  {
          method: 'PUT',
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
        console.log(jsonData);
      } catch (e) {
        // エラー時の処理
      }
    },
    
  },
  
  created : async function(){
    console.log("created")
    const headers={'Authorization': 'mtiToken'};
    
    try{
      /*global  fetch*/
      const res = await fetch(baseUrl + `/user?userId=${this.user.userId}`,{
        method:'GET',
        headers
      });
      
      const text = await res.text();
      const jsonData  = text ? JSON.parse(text):{}
      
      //fetchではネットワークエラー以外のエラーはthorwされないため、明示的にthrowする
      if(!res.ok){
        const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
        throw new Error(errorMessage)
      }
      
      //成功時の処理
      this.user.nickname = jsonData.nickname;
      this.user.age = jsonData.age
    } catch(e){
      //エラー時の処理
    }
  }
}
</script>

<style scoped>
/* このコンポーネントだけに適用するCSSはここに記述する */
</style>
