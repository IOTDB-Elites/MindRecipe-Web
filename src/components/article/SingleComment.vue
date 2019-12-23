<template>

  <div class="single-comment-wrapper">
    <div class="comment-user">
      <el-tooltip effect="dark" :content="'user' + singleComment.uid" placement="bottom">
        <el-avatar>user{{singleComment.uid}}</el-avatar>
      </el-tooltip>
    </div>
    <div class="comment-detail">
      <div class="comment-username">user{{singleComment.uid}}</div>
      {{singleComment.commentDetail}}
    </div>
  </div>

</template>

<script>
  import {router} from '../../main'
  import {mapMutations, mapState} from 'vuex'
  import {Avatar, Tooltip, Message} from 'element-ui'

  export default {
    name: 'single-articleList',
    components: {
      elAvatar: Avatar,
      elTooltip: Tooltip
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
