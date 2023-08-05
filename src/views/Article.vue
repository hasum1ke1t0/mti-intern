<template>
  <div class="ui segment">
    <form class="ui large form" @submit.prevent="postArticle">
          <div class ="field">
            <div class="ui left input">
              <p style="white-space: pre-line;">{{ message }} </p>
              <textarea v-model="post.text" placeholder="記事をここに書く"></textarea>
            </div>
          </div>
          <div class="inline fields">
            <div class="">
            <label>カテゴリー</label>
            </div>
            <div class ="field">
                <div class="ui input">
                  <input v-model="post.category" type="text" placeholder="">
                </div>
            </div>
              <div class ="field">
                <button @click="Articlepost" class="ui green fluid button" type="submit">
                  投稿
                </button>
              </div>
          </div>
    </form>
  </div>
  
  <div class="ui segment">
        <form class="ui form" @submit.prevent="getSearchedArticle">
          <div class="field">
            <label for="nickname">ユーザーID</label>
            <input v-model="nickname" type="text" name="nickname" placeholder="">
          </div>
          
          <div class="field">
            <label for="nickname">カテゴリー名</label>
            <input v-model="nickname" type="text" name="nickname" placeholder="">
          </div>
          
          <div class="field">
            <label>投稿日時</label>
            <div class="inline fields">
              <div class="field">
                <input v-model.number="start" type="text" name="agestart">
                <label for="agestart">から</label>
              </div>
              
              <div class="field">
                <input v-model.number="end" type="text" name="ageend">
                <label for="ageend">まで</label>
              </div>
            </div>
          </div>
          
          <button class="ui green fluid button" type="submit">
            検索
          </button>
        </form>
      </div>
      
  
  
  <div class="ui segment">
      <ul class="ui column grid">

          <li class="column">
            <div class="ui card fluid" >
              <div class="content">
                  <div class="field">
                    <h2 class="header">
                      ゆーざー１
                    </h2>
                  </div>
                  <div class="field">
                    <button class="ui green button" type="submit">
                      削除
                    </button>
                  </div>
                <p class="meta">投稿日時</p>
                <p class="meta">わーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーい<br>わーーい</p>
                <p class="meta">カテゴリー１</p>
              </div>
              
              
              <div class="content">
                <h2 class="header">
                  ゆーざー２
                </h2>
                <span class="meta">やっほーー</span>
              </div>
            </div>
          </li>

      </ul>
  </div>
</template>

<script>
import {baseUrl} from '@/assets/config.js';
// 必要なものはここでインポートする
// @は/srcの同じ意味です
// import something from '@/components/something.vue';

export default {
  name: 'Article',

  components: {
    // 読み込んだコンポーネント名をここに記述する
    
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      post:{
        userId: window.localStorage.getItem('userId'),
        text: null,
        category: null,
        timestamp: null,
      },
    };
  },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
    
  },

  methods: {
    async Articlepost() {
      const {userId, text, category, timestamp} = this.post;
      const headers={'Authorization': 'mtiToken'};
      const requestBody = {
        userId: this.post.userId,
        text: this.post.text,
        category: this.post.category,
        timestamp: this.post.timestamp,
      };
      try {
        /* global fetch */
        const res = await fetch(baseUrl + '/article',  {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers,
        });
        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {}

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage = jsonData.message ?? 'エラーメッセージがありません';
          throw new Error(errorMessage);
        }
        window.localStorage.setItem('userId',this.post.userId)
        window.localStorage.setItem('text',this.post.text)
        window.localStorage.setItem('category',this.post.category)
        window.localStorage.setItem('timestamp',this.post.timestamp)
        // 成功時の処理
        console.log(jsonData);
      } catch (e) {
        // エラー時の処理
        console.log(e)
      }
      
    }
  },
}
</script>

<style scoped>
/* このコンポーネントだけに適用するCSSはここに記述する */

</style>