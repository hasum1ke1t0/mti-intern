<template>
  <div class="ui main container"> 
    <div class="ui segment">
      <p>ようこそ、{{userName}}さん</p>
    </div>
  </div>

  
    <div class="ui main container">  
            <div class="ui segment">
              <h1>今日のおすすめメニュー</h1>
              
              <div class="content">
                <h4>{{ recipe.recipeTitle }}</h4>
                <p>年齢: {{ recipe.age }}歳向け</p>
                <p>総カロリー: {{ recipe.kcal }}kcal</p>
                <p style=white-space:pre-wrap>
                  {{ recipe.recipeContent }}
                </p>
                <div class="ui divider"></div>
              </div>
            
            </div>
    </div>
    
    <!-- 見える部分だけ実装 -->
    <div class="ui main container">  
      <div class="ui segment">
        <form class="ui large form" @submit.prevent="postDish">
          <h2>食事登録</h2>
          
          
         <div class="field">
           <div class="ui input">
             <input v-model = "dish.date" type="date" placeholder="日にち">
           </div>
          </div>
  
          <div class="field">        
          <div class="ui input">
             <input v-model = "dish.dishkind" type="food" placeholder="ごはん">
           </div>
          </div>
          
          <div class="field">
           <div class="ui input">
             <input v-model = "dish.kcal" type="cal" placeholder="カロリー">
           </div>
          </div>
          
          <button class="ui huge green fluid button" type="submit">
            登録
          </button>
        </form>
      </div>
    </div>
    
    <div class="ui main container">  
      <div class="ui segment">
        <form class="ui large form">
          <h2>記録確認</h2>
        </form>
        
        <div class="field">
           <div class="ui input">
             <input @change="changeDate()" v-model="dishRecode.date" type="date" placeholder="">
           </div>
          </div>
          
        <div class="field">
          <p>朝ご飯：{{dishRecode.breakfast}} kcal</p>
          <p>昼ご飯：{{dishRecode.lunch}} kcal</p>
          <p>夜ご飯：{{dishRecode.dinner}} kcal</p>
        </div>
          
      </div>
    </div>
    
    <div class="ui main container">  
      <button class="ui grey fluid button" type="submit">
            退会
      </button>
    </div>

</template>

<script>
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';
import { baseUrl } from "@/assets/config.js";
const headers = { Authorization: "mtiToken" };

export default {
  name: 'MyPage',

  components: {
    // 読み込んだコンポーネント名をここに記述する
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {

      dish: {
        userId: window.localStorage.getItem('userId'),
        timestamp: null,
        date: null,
        dishkind: null,
        kcal: null
      },
      dishes:[],
      recipe: [],
      userName:null,
      dishRecode:{
        date:null,
        breakfast:null,
        lunch:null,
        dinner:null,
      }
    };
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    
  },
  
  created: async function () {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    this.userName=window.localStorage.getItem('userName');
    // apiからarticleを取得する
    await this.getRecipe();
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    async postDish() {

      const requestBody = {
        userId: this.dish.userId,
        date: this.dish.date,
        dishkind: this.dish.dishkind,
        kcal: this.dish.kcal,
        // timestamp: this.dish.timestamp,
      };
      try {
        /* global fetch */
        const res = await fetch(baseUrl + "/dish", {
          method: "POST",
          body: JSON.stringify(requestBody),
          headers,
        });
        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {};
        
        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }
        this.dishes=jsonData;
        this.dish.date = "";
        this.dish.dishkind = "";
        this.dish.kcal = "";
      } catch (e) {
        console.log(e)
      }
    },
    
     async getRecipe() {

      try {
        /* global fetch */
        const res = await fetch(baseUrl + "/recipe", {
          method: "GET",
        });

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {};
        console.log(jsonData);
        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }

        // 記事がなかった場合undefinedとなり、記事追加時のunshiftでエラーとなるため、空のarrayを代入
        this.recipe = jsonData.articles ?? [];
        console.log(this.recipe);
      } catch (e) {
        
      }
    },
    async changeDate(){
      try{
        /* global fetch */
        const res = await fetch(baseUrl + "/dish?userid="+window.localStorage.getItem('userId')+"&date="+this.dishRecode.date+"&dishkind="+"朝", {
          method: "GET",
        });
        
        const text = await res.text()
        const jsonData = text ? JSON.parse(text) : {};
        
        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
          throw new Error(errorMessage);
        }
        console.log("kcal",jsonData.kcal)
        this.dishRecode.breakfast=jsonData.kcal
      
      }catch(e){
        console.log(e)
      }
      try{
        /* global fetch */
        const res = await fetch(baseUrl + "/dish?userid="+window.localStorage.getItem('userId')+"&date="+this.dishRecode.date+"&dishkind="+"昼", {
          method: "GET",
        });
        
        const text = await res.text()
        const jsonData = text ? JSON.parse(text) : {};
        
        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
          throw new Error(errorMessage);
        }
        console.log("kcal",jsonData.kcal)
        this.dishRecode.lunch=jsonData.kcal
      
      }catch(e){
        console.log(e)
      }
      try{
        /* global fetch */
        const res = await fetch(baseUrl + "/dish?userid="+window.localStorage.getItem('userId')+"&date="+this.dishRecode.date+"&dishkind="+"夜", {
          method: "GET",
        });
        
        const text = await res.text()
        const jsonData = text ? JSON.parse(text) : {};
        
        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
          throw new Error(errorMessage);
        }
        console.log("kcal",jsonData.kcal)
        this.dishRecode.dinner=jsonData.kcal
      
      }catch(e){
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
/* このコンポーネントだけに適用するCSSはここに記述する */

.card{
  list-style:none;
  margin-top: 1.5rem;
}

</style>



