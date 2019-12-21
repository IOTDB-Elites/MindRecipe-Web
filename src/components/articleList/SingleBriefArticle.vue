<template>

  <div class="brief-article-wrapper">
    <div class="brief-article-name">
      <p @click="goToArticlePage">{{singleArticle.title}}</p>
      <span class="article-author">{{new Date(Number(singleArticle.timestamp)).toLocaleDateString().replace(/\//g, "-")}}</span>
    </div>
    <div class="brief-feedback-wrapper">
      <div class="feedback el-icon-s-order" @click="goToArticlePage">{{singleArticle.readNum}}</div>
      <div class="feedback el-icon-share" @click="goToArticlePage">{{singleArticle.shareNum}}</div>
      <div class="feedback el-icon-star-on" @click="goToArticlePage">{{singleArticle.agreeNum}}</div>
      <div class="feedback el-icon-s-comment" @click="goToArticlePage">{{singleArticle.commentNum}}</div>
    </div>
  </div>
</template>

<script>
  import {router} from '../../main'
  import {mapMutations, mapState} from 'vuex'

  export default {
    name: 'single-articleList',
    components: {},
    data() {
      return {}
    },
    props: ['singleArticle'],
    methods: {
//      ...mapMutations('job', [
//        'saveCurrentJob'
//      ]),
      goToArticlePage() {
//        this.saveCurrentJob(this.singleArticle)
        router.push({name: 'ArticlePage', params: {aid: this.singleArticle.aid}})
      }
    }
  }
</script>

<style scoped src="./SingleArticle.css"></style>
