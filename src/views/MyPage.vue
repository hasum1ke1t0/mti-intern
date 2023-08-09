<template>
  <div class="ui main container"> 
    <div class="ui segment">
      <p>ようこそ、{{ userName }}さん</p>
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
             <input v-model = "dish2.date" type="date" placeholder="日にち">
           </div>
          </div>
  
          <div class="field">        
          <div class="ui input">
             <input v-model = "dish2.dishkind" type="food" placeholder="ごはん">
           </div>
          </div>
          
          <div class="field">
           <div class="ui input">
             <input v-model = "dish2.kcal" type="cal" placeholder="カロリー">
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
        <form class="ui large form" @submit.prevent="getdishkind">
          <h2>記録確認(カロリー)</h2>
        
        <div class="field">
           <div class="ui input">
             <input v-model="dish.date" type="date" placeholder="">
           </div>
          </div>
          
        <div class="field">
          <p>朝ご飯: {{ dish.dishkind[0] }}kcal</p>
          <p>昼ご飯: {{ dish.dishkind[1] }}kcal</p>
          <p>夜ご飯: {{ dish.dishkind[2] }}kcal</p>
        </div>
        
        <button class="ui huge green fluid button" type="submit">
            確認
        </button>
       
        </form>
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
      dish2: {
        userId: window.localStorage.getItem('userId'),
        timestamp: null,
        date: null,
        dishkind: null,
        kcal: null
      },
      dishes:[],
      recipe: [],
      userName:null,
      dish:{
        userId: window.localStorage.getItem('userId'),
        date: null,
        dishkind: [null,null,null]
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
        userId: this.dish2.userId,
        date: this.dish2.date,
        dishkind: this.dish2.dishkind,
        kcal: this.dish2.kcal,
        timestamp: this.dish2.timestamp,
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
        this.dish2.date = "";
        this.dish2.dishkind = "";
        this.dish2.kcal = "";
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
    async getdishkind() {
      const {userId, date, dishkind} = this.dish;
      
      const qs = `?date=${date}&userId=${userId}&dishkind=朝`;
      console.log(qs)
      const qs2 = `?date=${date}&userId=${userId}&dishkind=昼`;
      console.log(qs2)
      const qs3 = `?date=${date}&userId=${userId}&dishkind=夜`;
      console.log(qs3)
      try {
        /* global fetch */
        const res = await fetch(baseUrl + `/dish${qs}`, {
          method: "GET",
          headers,
        });

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {};
        console.log(res)

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }
        
        const res2 = await fetch(baseUrl + `/dish?${qs2}`, {
          method: "GET",
          headers,
        });

        const text2 = await res2.text();
        const jsonData2 = text2 ? JSON.parse(text2) : {};
        console.log(res2)

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res2.ok) {
          const errorMessage2 =
            jsonData2.message2 ?? "エラーメッセージがありません";
          throw new Error(errorMessage2);
        }
        
        const res3 = await fetch(baseUrl + `/dish?${qs3}`, {
          method: "GET",
          headers,
        });

        const text3 = await res3.text();
        const jsonData3 = text3 ? JSON.parse(text3) : {};
        console.log(res3)

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res3.ok) {
          const errorMessage3 =
            jsonData3.message3 ?? "エラーメッセージがありません";
          throw new Error(errorMessage3);
        }
        
        dishkind[0] = jsonData.kcal;
        dishkind[1] = jsonData2.kcal;
        dishkind[2] = jsonData3.kcal;
      }
      catch (e) {
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
