<template>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
      <div class="ui segment">
        <form class="ui form">
          <div class="field">
            <label for="keyword">キーワード検索</label>
            <input v-model="keyword" type="text" name="keyword" placeholder="">
          </div>
        </form>
      </div>
    </div>
      
      
    <div class="ui segment">
        <ul class="ui comments divided recipe-list">
          <template v-for="(recipe, index) in recipes" :key="index">
            <li class="comment">
              <div class="content">
                <span class="recipe_title">{{ recipe.recipeTitle }}</span>
                <p class="age">年齢: {{ recipe.age }}歳向け</p>
                <p class="kcal">総カロリー: {{ recipe.kcal }}</p>
                <p class="text">
                  {{ recipe.recipeContent }}
                </p>
                <div class="ui divider"></div>
              </div>
            </li>
          </template>
        </ul>
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
    };
  },
  
  created: async function () {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    // apiからarticleを取得する
    await this.getRecipes();
  },
  

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
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
