<template>

  <div class="job-list-wrapper">
    <single-article v-for="item in articleList" :key="item.aid" :singleArticle="item"></single-article>

    <div class="pagination-wrapper">
      <el-pagination
        layout="prev, pager, next"
        :total=totalCount/10
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import SingleArticle from './SingleArticle.vue'
  import SingleBriefArticle from './SingleBriefArticle.vue'
  import {Pagination, Message} from 'element-ui'
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    name: 'articleList-list',
    components: {
      SingleArticle,
      SingleBriefArticle,
      elPagination: Pagination,
      Message
    },
    data() {
      return {
        totalPage: this.totalCount / 10,
        articleList: [{
          authors : "author1596",
          articleTags : "tags43",
          abstract : "abstract of articleList 0",
          timestamp : "1506000000000",
          title : "title0",
          language : "en",
          readNum: 82,
          commentNum: 27,
          agreeNum: 19,
          shareNum: 10,
          aid: 1
        }, {
          authors : "author1596",
          articleTags : "tags43",
          abstract : "abstract of articleList 0",
          timestamp : "1506000000000",
          title : "title0",
          language : "en",
          readNum: 82,
          commentNum: 27,
          agreeNum: 19,
          shareNum: 10,
          aid: 2
        }]
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
