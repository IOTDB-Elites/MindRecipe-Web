<template>

  <div class="comment-list-wrapper">
    <div class="comment-area">
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

    <div class="pagination-wrapper">
      <el-pagination
        layout="prev, pager, next"
        :total=totalCount/10
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import SingleComment from './SingleComment.vue'
  import {Pagination, Avatar, Input, Button, Message} from 'element-ui'
  import {mapState, mapMutations, mapActions} from 'vuex'
  import DivHeader from "../layout/DivHeader.vue";

  export default {
    name: 'comment-list',
    components: {
      DivHeader,
      SingleComment,
      elAvatar: Avatar,
      elPagination: Pagination,
      elInput: Input,
      elButton: Button,
      Message
    },
    data() {
      return {
        totalPage: this.totalCount / 10,
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
    props: ['totalCount'],
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
      },
      handleCurrentChange(val) {
        this.saveCurrentPage(val)
        window.scrollTo(0, 0)
//          this.fetchJobList({
//            searchInfo: searchInfo,
//            onSuccess: (success) => {
//              Message({
//                message: success,
//                type: 'success'
//              })
//            },
//            onError: (error) => {
//              Message.error(error)
//            }
//          })
      }
    }
  }
</script>

<style scoped src="./CommentList.css"></style>
