<template>

  <div class="single-article-wrapper">
    <div class="article-name">
      <p @click="goToArticlePage">{{singleArticle.title}}</p>
      <span class="article-author"> / {{singleArticle.authors}} </span>
      <span
        class="article-time"> {{new Date(Number(singleArticle.timestamp)).toLocaleDateString().replace(/\//g, "-")}}</span>
    </div>
    <div class="abstract-wrapper">
      <span class="article-abstract">{{singleArticle.abstract}}</span>
      <br>
      <div class="tag el-icon-collection-tag"> {{singleArticle.articleTags}}</div>
      <div class="tag el-icon-s-flag"> {{singleArticle.language === 'en' ? 'English' : 'Chinese'}}</div>

      <div class="feedback">
        <el-tooltip effect="dark" :content="'agreed number'" placement="bottom">
          <div class="feedback el-icon-star-on" @click="goToArticlePage"> {{singleArticle.agreeNum}}</div>
        </el-tooltip>

        <el-tooltip effect="dark" :content="'comment number'" placement="bottom">
          <div class="feedback el-icon-s-comment" @click="goToArticlePage"> {{singleArticle.commentNum}}</div>
        </el-tooltip>

        <el-tooltip effect="dark" :content="'shared number'" placement="bottom">
          <div class="feedback el-icon-share" @click="goToArticlePage"> {{singleArticle.shareNum}}</div>
        </el-tooltip>

        <el-tooltip effect="dark" :content="'read number'" placement="bottom">
          <div class="feedback el-icon-s-order" @click="goToArticlePage"> {{singleArticle.readNum}}</div>
        </el-tooltip>
      </div>
    </div>
  </div>


</template>

<script>
  import {router} from '../../main'
  import {mapMutations, mapState} from 'vuex'
  import {Tooltip} from 'element-ui'

  export default {
    name: 'single-articleList',
    components: {
      elTooltip: Tooltip
    },
    data() {
      return {}
    },
    props: ['singleArticle'],
    methods: {
      goToArticlePage() {
        router.push({name: 'ArticlePage', params: {aid: this.singleArticle.aid}})
      }
    }
  }
</script>

<style scoped src="./SingleArticle.css"></style>
