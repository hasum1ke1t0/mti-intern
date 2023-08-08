<template>
  <div class="ui main container">
    <div class="ui segment">
        <form class="ui form" @submit.prevent="getSearchedRecipes">

          <div class="field">
            <label for="title">メニューキーワード</label>
            <label for="title2">選択した食べ物をすべて含んだメニューが検索されます。</label>
            <input v-model="search.material[0]" type="checkbox" id = "q0" value = "green_pepper">ピーマン
            <input v-model="search.material[1]" type="checkbox" id = "q1" value = "tomato">トマト
            <input v-model="search.material[2]" type="checkbox" id = "q2" value = "eggplant">なす
            <input v-model="search.material[3]" type="checkbox" id = "q3" value = "onion">玉ねぎ
            <input v-model="search.material[4]" type="checkbox" id = "q4" value = "mushroom">しいたけ
            <input v-model="search.material[5]" type="checkbox" id = "q5" value = "goya">ゴーヤ
            <input v-model="search.material[6]" type="checkbox" id = "q6" value = "carrot">にんじん
            <input v-model="search.material[7]" type="checkbox" id = "q7" value = "cabbege">キャベツ
            <input v-model="search.material[8]" type="checkbox" id = "q8" value = "asparagus">アスパラガス
            <input v-model="search.material[9]" type="checkbox" id = "q9" value = "pumpkin">かぼちゃ
          </div>
          
          
          <div class="right-align">
            <button
              class="ui green button"
              type="submit"
              v-bind:disabled="isSearchButtonDisabled"
            >
              検索
            </button>
          </div>
        </form>
      </div>
      
      
    <div class="ui segment">
        <ul class="ui comments divided recipe-list">
          <template v-for="(recipe, index) in recipes" :key="index">
            <li class="comment">
              <div class="content">
                <span class="recipe_title">{{ recipe.recipeTitle }}</span>
                <p class="age">年齢: {{ recipe.age }}歳向け</p>
                <p class="kcal">総カロリー: {{ recipe.kcal }}kcal</p>
                <p class="text" style=white-space:pre-wrap>
                  {{ recipe.recipeContent }}
                </p>
                <div class="ui divider"></div>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
</template>

<script>
import { baseUrl } from "@/assets/config.js";
const headers = { Authorization: "mtiToken" };
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';

export default {
  name: 'Recipe',

  components: {
    // 読み込んだコンポーネント名をここに記述する
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      recipes: [],
      search: {
        material: [null,null,null,null,null,null,null,null,null,null]
      },
    };
  },
  
  created: async function () {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    // apiからarticleを取得する
    await this.getRecipes();
  },
  

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    isSearchButtonDisabled() {
      return !this.search.material;
    },
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    async getRecipes() {

      try {
        /* global fetch */
        const res = await fetch(baseUrl + "/recipes", {
          method: "GET",
          headers,
        });

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {};
        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }
        
        // 記事がなかった場合undefinedとなり、記事追加時のunshiftでエラーとなるため、空のarrayを代入
        this.recipes = jsonData.recipes ?? [];
        
        console.log(this.recipes);
      } catch (e) {
        console.log(e)
      }
    },
    async getSearchedRecipes() {
      const {material} = this.search;
      
      let tmp = ``;
      console.log(tmp)
      tmp += `material=`;
      for(let i = 0;i < 10;i++){
        if(this.search.material[i] == true){
          tmp += `true,`
        }else{
          tmp += `false,`
        }
      }
      const qs = tmp;
      console.log(qs)
      try {
        /* global fetch */
        const res = await fetch(baseUrl + `/recipes?${qs}`, {
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

        this.recipes = jsonData.recipes;
      } catch (e) {
        
      }
      
    },
  },
}
</script>

<style scoped>
/* このコンポーネントだけに適用するCSSはここに記述する */

.card{
  list-style:none;
  margin-top: 1.5rem;
}

</style>
