<template>

  <div>
    <div class="article-detailed-wrapper">
      <div-header :header="article.title"></div-header>
      <span class="article-tag el-icon-user-solid"> {{ article.authors }} </span>
      <span
        class="article-tag el-icon-time"> {{ new Date(Number(article.timestamp)).toLocaleDateString().replace(/\//g, "-")
        }}</span>
      <span class="article-tag el-icon-collection-tag"> {{ article.articleTags }}</span>
      <span class="article-tag el-icon-s-flag"> {{ article.language === 'en' ? 'English' : 'Chinese' }}</span>

      <div class="article-text">
        <p>{{ article.text }}</p>
      </div>
    </div>

    <div class="article-reader-wrapper">
      <div-header :header="'All Readers'"></div-header>
      <readers :readerList="feedback.readUidList" :dialogTitle="'All Readers'"></readers>
    </div>

    <div class="article-reader-wrapper">
      <div-header :header="'Agreed Readers'"></div-header>
      <readers :readerList="feedback.agreeUidList" :dialogTitle="'Agreed Readers'"></readers>
    </div>

    <div class="article-reader-wrapper">
      <div-header :header="'Shared Readers'"></div-header>
      <readers :readerList="feedback.shareUidList" :dialogTitle="'Shared Readers'"></readers>
    </div>
  </div>
</template>

<script>
  import {Message} from 'element-ui'
  import {mapState, mapMutations, mapActions} from 'vuex'
  import Readers from "../article/Readers.vue";
  import DivHeader from '../layout/DivHeader.vue'

  export default {
    name: 'articleList-list',
    components: {
      Message,
      Readers,
      DivHeader
    },
    data() {
      return {}
    },
    props: ['article', 'feedback'],
    methods: {}
  }
</script>

<style scoped src="./Article.css"></style>
