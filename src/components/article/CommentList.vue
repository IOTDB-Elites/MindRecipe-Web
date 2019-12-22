<template>

  <div class="comment-list-wrapper">
    <div class="comment-area">
      <div-header :header="'Comment'"></div-header>
      <el-input
        ref="commentInput"
        type="textarea"
        :rows="4"
        placeholder="Input your comments..."
        v-model="comment">
      </el-input>
      <div class="comment-button-wrapper">
        <el-button type="text" @click="addComment">Comment</el-button>
      </div>
    </div>

    <div class="comment-list">
      <div-header :header="'Comment List'"></div-header>
      <single-comment v-for="item in commentList" :key="item.uid" :singleComment="item"></single-comment>
    </div>
  </div>

</template>

<script>
  import SingleComment from './SingleComment.vue'
  import {Avatar, Input, Button, Message} from 'element-ui'
  import {mapState, mapMutations, mapActions} from 'vuex'
  import DivHeader from "../layout/DivHeader.vue";

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
        commentList: [{
          name: 'user1',
          commentDetail: 'comments to this article: (778,8075)'
        }, {
          name: 'user2',
          commentDetail: 'comments to this article: (778,8075)'
        }],
        comment: undefined
      }
    },
    methods: {
      ...mapMutations('article', [
        'saveCurrentPage'
      ]),
      addComment() {
        if (this.comment === undefined || this.comment === '') {
          Message.error('Comment is blank!')
        } else {
          this.commentList.unshift({
            name: 'user3',
            commentDetail: this.comment
          });
          Message.success('Successfully commented!');
        }
      }
    }
  }
</script>

<style scoped src="./CommentList.css"></style>
