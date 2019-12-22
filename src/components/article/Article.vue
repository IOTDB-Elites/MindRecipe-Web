<template>

  <div class="">
    <div class="article-author"> {{ article.authors }} </div>
    <div
      class="article-time"> {{ new Date(Number(article.timestamp)).toLocaleDateString().replace(/\//g, "-") }}</div>

    <div class="el-icon-collection-tag"> {{ article.articleTags }}</div>
    <div class="el-icon-s-flag"> {{ article.language === 'en' ? 'English' : 'Chinese' }}</div>
    <p>{{ article.text }}</p>
  </div>

</template>

<script>
  import {Message} from 'element-ui'
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    name: 'articleList-list',
    components: {
      Message
    },
    data() {
      return {}
    },
    props: ['article'],
    methods: {
      ...mapMutations('article', [
        'saveCurrentPage'
      ]),
//      ...mapActions('job', [
//        'fetchJobList',
//        'fetchRecommendJobList'
//      ]),
//      ...mapActions('search', [
//        'fetchJobSearchResult',
//      ])
    }
  }
</script>
