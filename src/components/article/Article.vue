<template>

  <div class="job-list-wrapper">

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
      return {
        article: {
          timestamp: "1506000000000",
          title: "title0",
          articleTags: "tags43",
          authors: "author1596",
          text: 'text',
          image: null,
          video: null
        }
      }
    },
    props: ['totalCount'],
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
