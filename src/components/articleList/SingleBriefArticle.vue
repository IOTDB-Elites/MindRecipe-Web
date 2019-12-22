<template>

  <div class="brief-article-wrapper">
    <div class="brief-article-name">
      <span class="brief-article-index">{{index}}</span>
      <p @click="goToArticlePage">{{singleArticle.title}}</p>
      <!--<span class="article-author">{{new Date(Number(singleArticle.timestamp)).toLocaleDateString().replace(/\//g, "-")}}</span>-->
    </div>
    <div class="brief-feedback-wrapper">
      <el-tooltip effect="dark" :content="'read number'" placement="bottom">
        <div class="feedback el-icon-s-order" @click="goToArticlePage">{{singleArticle.readNum}}</div>
      </el-tooltip>

      <el-tooltip effect="dark" :content="'shared number'" placement="bottom">
        <div class="feedback el-icon-share" @click="goToArticlePage">{{singleArticle.shareNum}}</div>
      </el-tooltip>

      <el-tooltip effect="dark" :content="'agreed number'" placement="bottom">
        <div class="feedback el-icon-star-on" @click="goToArticlePage">{{singleArticle.agreeNum}}</div>
      </el-tooltip>

      <el-tooltip effect="dark" :content="'comment number'" placement="bottom">
        <div class="feedback el-icon-s-comment" @click="goToArticlePage">{{singleArticle.commentNum}}</div>
      </el-tooltip>
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
    props: ['singleArticle', 'index'],
    methods: {
      goToArticlePage() {
        router.push({name: 'ArticlePage', params: {aid: this.singleArticle.aid}})
      }
    }
  }
</script>

<style scoped src="./SingleArticle.css"></style>
