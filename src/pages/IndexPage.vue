<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <div class="right-wrapper">
          <div class="rank-wrapper">
            <div-header :header="'热度排名'"></div-header>
            <div class="radio-button-wrapper">
              <el-radio-group v-model="temporalGranularity" size="mini" @change="handleTemporalGranularity">
                <el-radio-button label="日榜"></el-radio-button>
                <el-radio-button label="周榜"></el-radio-button>
                <el-radio-button label="月榜"></el-radio-button>
              </el-radio-group>
            </div>
            <brief-article-list
              :articleList="popularList === undefined ? popularDailyList : popularList"></brief-article-list>
          </div>

          <div class="rank-wrapper" v-if="readList.length != 0">
            <div-header :header="'最近阅读'"></div-header>
            <brief-article-list
              :articleList="readList.slice(0, 5)"></brief-article-list>
          </div>

          <div class="rank-wrapper" v-if="readList.length != 0">
            <div-header :header="'最近点赞'"></div-header>
            <brief-article-list
              :articleList="agreedList.slice(0, 5)"></brief-article-list>
          </div>

          <div class="rank-wrapper" v-if="readList.length != 0">
            <div-header :header="'最近分享'"></div-header>
            <brief-article-list
              :articleList="sharedList.slice(0, 5)"></brief-article-list>
          </div>
        </div>

        <div class="article-wrapper">
          <div-header :header="'文章列表'"></div-header>
          <div class="radio-button-wrapper">
            <el-radio-group v-model="category" size="mini" @change="handleCategory">
              <el-radio-button label="science">科学</el-radio-button>
              <el-radio-button label="technology">技术</el-radio-button>
            </el-radio-group>
          </div>
          <article-list :articleList="articleList" :total="total"></article-list>
        </div>
      </div>
    </layout>
  </div>

</template>

<script>
  import Layout from '../components/layout/Layout.vue'
  import DivHeader from '../components/layout/DivHeader.vue'

  import {router, store} from '../main'
  import {RadioGroup, RadioButton, Message} from 'element-ui'
  import ArticleList from "../components/articleList/ArticleList.vue";
  import BriefArticleList from "../components/articleList/BriefArticleList.vue";
  import {mapState, mapMutations, mapActions} from 'vuex'

  export default {
    name: 'index-page',
    components: {
      ArticleList,
      BriefArticleList,
      Layout,
      Message,
      elRadioGroup: RadioGroup,
      elRadioButton: RadioButton,
      DivHeader,
    },
    data() {
      return {
        temporalGranularity: '日榜',
        category: 'science',
        popularList: this.popularDailyList
      }
    },
    computed: {
      ...mapState('article', {
        articleList: state => state.articleList,
        total: state => state.total,
        popularDailyList: state => state.popularDailyList,
        popularWeeklyList: state => state.popularWeeklyList,
        popularMonthlyList: state => state.popularMonthlyList,
      }),
      ...mapState('auth', {
        readList: state => state.readList,
        agreedList: state => state.agreedList,
        sharedList: state => state.sharedList
      })
    },
    beforeRouteEnter(to, from, next) {
      store.dispatch('article/fetchArticleList');
      store.dispatch('article/fetchPopularList');
      store.dispatch('auth/fetchReadList');
      next(true)
    },
    methods: {
      ...mapActions('article', [
        'fetchArticleList'
      ]),
      ...mapMutations('article', [
        'saveCategory'
      ]),
      handleCategory() {
        this.saveCategory(this.category);
        this.fetchArticleList()
      },
      handleTemporalGranularity() {
        if (this.temporalGranularity === '日榜') {
          this.popularList = this.popularDailyList
        } else if (this.temporalGranularity === '周榜') {
          this.popularList = this.popularWeeklyList
        } else if (this.temporalGranularity === '月榜') {
          this.popularList = this.popularMonthlyList
        }
      }
    }
  }
</script>

<style scoped src="./IndexPage.css"></style>
