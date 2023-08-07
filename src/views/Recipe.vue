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
      
      
    <div class="ui main container">  
      <div class="ui column">
  
          <div class="column card">
            <div class="ui segment">
              <h2>メニュー名</h2>
              <h4>材料</h4>
              <ul>
                <li>ピーマン</li>
                <li>油揚げ</li>
              </ul>
              <h4>手順</h4>
              <ol>
                <li>ピーマン、油揚げを切る</li>
                <li>焼く</li>
              </ol>
            </div>
          </div>
          
          <div class="column card">
            <div class="ui segment">
              <h2>メニュー名</h2>
              <h4>材料</h4>
              <ul>
                <li>にんじん</li>
                <li>たまご</li>
              </ul>
              <h4>手順</h4>
              <ol>
                <li>にんじんを切る</li>
                <li>焼く</li>
              </ol>
            </div>
          </div>
          
          <div class="column card">
            <div class="ui segment">
              <h2>メニュー名</h2>
              <h4>材料</h4>
              <ul>
                <li>にんじん</li>
                <li>たまご</li>
              </ul>
              <h4>手順</h4>
              <ol>
                <li>にんじんを切る</li>
                <li>焼く</li>
              </ol>
            </div>
          </div>

      </div>
    </div>
</template>

<script>
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
    };
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
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
