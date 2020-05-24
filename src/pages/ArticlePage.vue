<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <div v-if="article === null || feedback === null" :style="{textAlign: 'center'}" class="loading-wrapper">
          <img src="../assets/img/loading.gif" width="200"/>
        </div>

        <div v-if="article !== null && feedback !== null" class="article-wrapper">
          <article-detail :article="article" :articleFeedback="feedback" :user="user"></article-detail>
        </div>

        <div class="right-wrapper">
          <div class="rank-wrapper" v-if="feedback !== null">
            <comment-list :commentList="feedback.commentList"></comment-list>
          </div>
        </div>
      </div>
    </layout>
  </div>

</template>

<script>
  import Layout from '../components/layout/Layout.vue'
  import DivHeader from '../components/layout/DivHeader.vue'

  import {RadioGroup, RadioButton, Avatar, Dialog, Message} from 'element-ui'
  import ArticleDetail from "../components/article/Article.vue";
  import CommentList from "../components/article/CommentList.vue";
  import {mapState, mapMutations} from 'vuex'
  import {store} from '../main'

  export default {
    name: 'article-page',
    components: {
      CommentList,
      ArticleDetail,
      Layout,
      Message,
      elRadioGroup: RadioGroup,
      elRadioButton: RadioButton,
      elAvatar: Avatar,
      elDialog: Dialog,
      DivHeader,
    },
    data() {
      return {
        detailedReader: false,
      }
    },
    computed: {
      ...mapState('article', {
        article: state => state.article,
        feedback: state => state.feedback,
      }),
      ...mapState('auth', {
        user: state => state.user
      })
    },
    beforeRouteUpdate(to, from, next) {
      store.dispatch('article/fetchArticle', to.params.aid);
      store.dispatch('article/fetchFeedback', to.params.aid);
      store.commit('article/saveFeedback', null);
      store.commit('article/saveArticle', null);
      next(true)
    },
    beforeRouteEnter(to, from, next) {
      store.dispatch('article/fetchArticle', to.params.aid);
      store.dispatch('article/fetchFeedback', to.params.aid);
      store.commit('article/saveFeedback', null);
      store.commit('article/saveArticle', null);
      next(true)
    },
    methods: {
      ...mapMutations('article', [
        'saveFeedback',
        'saveArticle'
      ]),
      openDetailedReader() {
        this.detailedReader = true
      }
    }
  }
</script>

<style scoped src="./ArticlePage.css"></style>
