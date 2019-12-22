<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <div class="article-wrapper">
          <div-header :header="'Reading List'"></div-header>
          <div class="radio-button-wrapper">
            <el-radio-group v-model="category" size="mini" @change="handleCategory">
              <el-radio-button label="science">Science</el-radio-button>
              <el-radio-button label="technology">Technology</el-radio-button>
            </el-radio-group>
          </div>
          <article-list :articleList="articleList" :total="total"></article-list>
        </div>

        <div class="right-wrapper">
          <!--<div class="config-wrapper">-->
          <!--<div-header :header="'User Info'"></div-header>-->
          <!--</div>-->
          <div class="rank-wrapper">
            <div-header :header="'Popular Rank'"></div-header>
            <div class="radio-button-wrapper">
              <el-radio-group v-model="temporalGranularity" size="mini">
                <el-radio-button label="Daily"></el-radio-button>
                <el-radio-button label="Weekly"></el-radio-button>
                <el-radio-button label="Monthly"></el-radio-button>
              </el-radio-group>
            </div>
            <brief-article-list></brief-article-list>
          </div>
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
        temporalGranularity: 'Daily',
        category: 'science'
      }
    },
    computed: {
      ...mapState('article', {
        articleList: state => state.articleList,
        total: state => state.total
      })
    },
    beforeRouteEnter(to, from, next) {
      store.dispatch('article/fetchArticleList');
//      store.dispatch('article/fetchPopularList');
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
        this.saveCategory(this.category)
        this.fetchArticleList()
      }
    }
  }
</script>

<style scoped src="./IndexPage.css"></style>
