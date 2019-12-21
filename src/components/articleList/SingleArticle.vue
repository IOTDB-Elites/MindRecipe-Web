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
        <div class="feedback el-icon-star-on" @click="goToArticlePage"> {{singleArticle.agreeNum}}</div>
        <div class="feedback el-icon-s-comment" @click="goToArticlePage"> {{singleArticle.commentNum}}</div>
        <div class="feedback el-icon-share" @click="goToArticlePage"> {{singleArticle.shareNum}}</div>
        <div class="feedback el-icon-s-order" @click="goToArticlePage"> {{singleArticle.readNum}}</div>
      </div>
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
