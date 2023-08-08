<template>
  <div class="ui main container"> 
    <div class="ui segment">
      <p>ようこそ、{{ }}さん</p>
    </div>
  </div>
  
    <div class="ui main container">  
            <div class="ui segment">
              <h1>今日のおすすめメニュー</h1>
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
    
    <!-- 見える部分だけ実装 -->
    <div class="ui main container">  
      <div class="ui segment">
        <form class="ui large form">
          <h2>食事登録</h2>
          
          
         <div class="field">
           <div class="ui input">
             <input type="date" placeholder="日にち">
           </div>
          </div>
  
          <div class="field">        
          <div class="ui input">
             <input type="food" placeholder="ごはん">
           </div>
          </div>
          
          <div class="field">
           <div class="ui input">
             <input type="cal" placeholder="カロリー">
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
             <input type="date" placeholder="">
           </div>
          </div>
          
        <div class="field">
          <p>朝ご飯</p>
          <p>昼ご飯</p>
          <p>夜ご飯</p>
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

export default {
  name: 'MyPage',

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
