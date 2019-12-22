<template>

  <div class="article-list-wrapper">
    <single-brief-article v-for="item in articleList" :key="item.aid" :singleArticle="item"></single-brief-article>
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
      return {
        totalPage: this.totalCount / 10,
        articleList: []
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
//      ]),
      handleCurrentChange(val) {
        this.saveCurrentPage(val)
        window.scrollTo(0, 0)
//          this.fetchJobList({
//            searchInfo: searchInfo,
//            onSuccess: (success) => {
//              Message({
//                message: success,
//                type: 'success'
//              })
//            },
//            onError: (error) => {
//              Message.error(error)
//            }
//          })
      }
    }
  }
</script>
