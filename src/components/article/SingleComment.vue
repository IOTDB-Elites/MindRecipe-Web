<template>

  <div class="single-comment-wrapper">
    <div class="comment-user">
      <el-avatar> {{singleComment.name}} </el-avatar>
    </div>
    <div class="comment-detail">
      <div class="comment-username">{{singleComment.name}}</div>
      {{singleComment.commentDetail}}
    </div>
  </div>

</template>

<script>
  import {router} from '../../main'
  import {mapMutations, mapState} from 'vuex'
  import {Avatar, Message} from 'element-ui'

  export default {
    name: 'single-articleList',
    components: {
      elAvatar: Avatar
    },
    data() {
      return {}
    },
    props: ['singleComment'],
    methods: {
//      ...mapMutations('job', [
//        'saveCurrentJob'
//      ]),
    }
  }
</script>

<style scoped src="./SingleComment.css"></style>
