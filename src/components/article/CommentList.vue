<template>

  <div class="comment-list-wrapper">
    <div class="comment-area">
      <div-header :header="'留言'"></div-header>
      <el-input
        ref="commentInput"
        type="textarea"
        :rows="4"
        placeholder="输入你的留言..."
        v-model="comment">
      </el-input>
      <div class="comment-button-wrapper">
        <el-button type="text" @click="addComment">留言</el-button>
      </div>
    </div>

    <div class="comment-list">
      <div-header :header="'留言列表'"></div-header>
      <div class="comment-list-length">( <span class="comment-list-length-num">{{commentList.length}}</span> 条留言 ) </div>
      <single-comment v-for="item in commentList" :key="item.uid" :singleComment="item"></single-comment>
    </div>
  </div>

</template>

<script>
  import SingleComment from './SingleComment.vue'
  import {Avatar, Input, Button, Message} from 'element-ui'
  import {mapState, mapMutations, mapActions} from 'vuex'
  import DivHeader from "../layout/DivHeader.vue";
  import {router, store} from '../../main'

  export default {
    name: 'comment-list',
    components: {
      DivHeader,
      SingleComment,
      elAvatar: Avatar,
      elInput: Input,
      elButton: Button,
      Message
    },
    data() {
      return {
        comment: undefined
      }
    },
    computed: {
      ...mapState('auth', {
        user: state => state.user
      })
    },
    props:['commentList'],
    methods: {
      ...mapMutations('article', [
        'saveComment'
      ]),
      addComment() {
        if (this.comment === undefined || this.comment === '') {
          Message.error('留言为空!')
        } else if(this.user === null) {
          Message.warning('请先登录!');
          router.push({name: 'LoginPage'})
        } else {
          this.commentList.unshift({
            name: this.user.name,
            commentDetail: this.comment
          });
          this.saveComment(this.comment);
          this.comment = '';
          Message.success('留言成功!');
        }
      }
    }
  }
</script>

<style scoped src="./CommentList.css"></style>
