<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <div class="article-wrapper">
          <div-header :header="'Article'"></div-header>
          <article></article>
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
  import Article from "../components/article/Article.vue";
  import CommentList from "../components/article/CommentList.vue";

  export default {
    name: 'article-page',
    components: {
      CommentList,
      Article,
      Layout,
      Message,
      elRadioGroup: RadioGroup,
      elRadioButton: RadioButton,
      DivHeader,
    },
    data() {
      return {}
    }
  }
</script>

<style scoped src="./IndexPage.css"></style>
