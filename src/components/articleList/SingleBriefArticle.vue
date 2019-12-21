<template>

  <div class="brief-article-wrapper">
    <div class="brief-article-name">
      <p>{{singleArticle.title}}</p>
      <span class="article-author">{{new Date(Number(singleArticle.timestamp)).toLocaleDateString().replace(/\//g, "-")}}</span>
    </div>
    <div class="brief-feedback-wrapper">
      <div class="feedback el-icon-s-order">{{singleArticle.readNum}}</div>
      <div class="feedback el-icon-share">{{singleArticle.shareNum}}</div>
      <div class="feedback el-icon-star-on">{{singleArticle.agreeNum}}</div>
      <div class="feedback el-icon-s-comment">{{singleArticle.commentNum}}</div>
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
//      goToJobDetailsPage() {
//        this.saveCurrentJob(this.singleArticle)
//        router.push({name: 'JobDetailsPage', params: {jobId: this.singleArticle.jobId}})
//      }
    }
  }
</script>

<style scoped src="./SingleArticle.css"></style>
