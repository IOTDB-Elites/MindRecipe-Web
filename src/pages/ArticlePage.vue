<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <div class="article-wrapper">
          <div-header :header="article.title"></div-header>
          <article-detail :article="article"></article-detail>
        </div>

        <div class="right-wrapper">
          <div class="rank-wrapper">
            <div-header :header="'Comment'"></div-header>
            <comment-list></comment-list>
          </div>
        </div>
      </div>
    </layout>
  </div>

</template>

<script>
  import Layout from '../components/layout/Layout.vue'
  import DivHeader from '../components/layout/DivHeader.vue'

  import {RadioGroup, RadioButton, Message} from 'element-ui'
  import ArticleDetail from "../components/article/Article.vue";
  import CommentList from "../components/article/CommentList.vue";

  export default {
    name: 'article-page',
    components: {
      CommentList,
      ArticleDetail,
      Layout,
      Message,
      elRadioGroup: RadioGroup,
      elRadioButton: RadioButton,
      DivHeader,
    },
    data() {
      return {
        article: {
          timestamp: "1506000000000",
          title: "title0",
          articleTags: "tags43",
          authors: "author1596",
          text: 'text',
          image: [],
          video: []
        }
      }
    }
  }
</script>

<style scoped src="./IndexPage.css"></style>
