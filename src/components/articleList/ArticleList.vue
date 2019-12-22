<template>

  <div class="article-list-wrapper">
    <single-article v-for="item in articleList" :key="item.aid" :singleArticle="item"></single-article>

    <div class="pagination-wrapper">
      <el-pagination
        layout="prev, pager, next"
        :total="total / 10"
        background
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import SingleArticle from './SingleArticle.vue'
  import {Pagination, Message} from 'element-ui'
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    name: 'article-list',
    components: {
      SingleArticle,
      elPagination: Pagination,
      Message
    },
    data() {
      return {}
    },
    props: ['articleList', 'total'],
    methods: {
      ...mapMutations('article', [
        'saveCurrentPage'
      ]),
      ...mapActions('article', [
        'fetchArticleList'
      ]),
      ...mapState('article', {
        category: state => state.category,
      }),
      handleCurrentChange(val) {
        this.saveCurrentPage(val);
        window.scrollTo(0, 0);
        this.fetchArticleList()
      }
    }
  }
</script>

<style scoped src="./ArticleList.css"></style>
