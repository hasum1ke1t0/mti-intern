<template>
  <div class="ui segment">
    <form class="ui form">
      <div class="field">
        <label for="nickname">ユーザー名</label>
        <input v-model="nickname" type="text" name="nickname" placeholder="Nickname"/>
      </div>
      
      <div class="field">
        <label>年齢</label>
        <div class="inline fields">
          <div class ="field">
            <input v-model.number="start" type="text" name="agestart"/>
            <label for="agestart">歳から</label>
          </div>
          
          <div class="field">
            <input v-model.number="end" type="text" name="ageend"/>
            <label for="ageend">歳まで</label>
          </div>
        </div>
      </div>
    </form>
  </div>
  
  <div>
    <div class="ui main container">
      <!-- ユーザー一覧 -->
      <ul class="ui three column grid">
        <template v-for="(item,index) in filteredUsers" :key="index">
          <li class ="column">
            <div class="ui card fluid">
              <div class = "content">
                <h2 class = "header">
                  {{item.nickname}}
                  <span class ="ui green label">{{item.age}}</span>
                </h2>
                <span class="meta">{{item.userId}}</span>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import {baseUrl} from '@/assets/config.js';
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';

export default {
  name: 'User',

  components: {
    // 読み込んだコンポーネント名をここに記述する
    filteredUsers() {
      let result = this.users;
      if (this.nickname) {
        result = result.filter(target => {
          return target.nickname.match(this.nickname);
        });
      }
      if (this.start) {
        result = result.filter(target => {
         return target.age >= this.start;
        });
      }
      if (this.end) {
        result = result.filter(target => {
          return target.age <= this.end;
        });
      }
        return result;
    }
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      users:[],
      nickname:"",
      start:0,
      end:100,
    };
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    filteredUsers() {
      let result = this.users;
      if (this.nickname) {
        result = result.filter(target => {
          return target.nickname.match(this.nickname);
        });
      }
      if (this.start) {
        result = result.filter(target => {
         return target.age >= this.start;
        });
      }
      if (this.end) {
        result = result.filter(target => {
          return target.age <= this.end;
        });
      }
        return result;
    }
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
  },
  created : async function(){
  console.log("created")
  const headers={'Authorization': 'mtiToken'};
  
  try{
    /*global  fetch*/
    const res = await fetch(baseUrl + `/users`,{
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
    console.log(jsonData)
    
    //成功時の処理
    this.users=jsonData
  } catch(e){
    //エラー時の処理
    console.log(e)
    }
  }

}
</script>

<style scoped>
/* このコンポーネントだけに適用するCSSはここに記述する */
</style>
