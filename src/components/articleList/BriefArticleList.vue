<template>

  <div class="article-list-wrapper">
    <single-brief-article v-for="(item, index) in articleList" :key="item.aid" :singleArticle="item" :index="index + 1"></single-brief-article>
  </div>

</template>

<script>
  import SingleBriefArticle from './SingleBriefArticle.vue'
  import {Pagination, Message} from 'element-ui'
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    name: 'articleList-list',
    components: {
      SingleBriefArticle,
      elPagination: Pagination,
      Message
    },
    data() {
      return {}
    },
    props: ['articleList'],
    methods: {}
  }
</script>
