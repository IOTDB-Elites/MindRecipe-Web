<template>

  <div>
    <div class="article-detailed-wrapper">
      <div-header :header="article.title"></div-header>
      <span class="article-tag el-icon-user-solid"> {{ article.authors }} </span>
      <span
        class="article-tag el-icon-time"> {{ new Date(Number(article.timestamp)).toLocaleDateString().replace(/\//g, "-")
        }}</span>
      <span class="article-tag el-icon-collection-tag"> {{ article.articleTags }}</span>
      <span class="article-tag el-icon-s-flag"> {{ article.language === 'en' ? 'English' : 'Chinese' }}</span>

      <div class="article-text">
        <p>{{ article.text }}</p>
      </div>

      <div class="feedback-wrapper">
        <el-button class="el-icon-star-off" type="text" @click="agree" v-if="!agreed"> Agree</el-button>
        <el-button class="el-icon-star-on" type="text" @click="cancelAgree" v-else> Cancel Agree</el-button>
        <span class="feedback-number">({{agreedNumber}})</span>
      </div>

      <div class="feedback-wrapper">
        <el-button class="el-icon-share" type="text" @click="share" v-if="!shared"> Share</el-button>
        <el-button class="el-icon-share" type="text" @click="cancelShare" v-else> Cancel Share</el-button>
        <span class="feedback-number">({{sharedNumber}})</span>
      </div>
    </div>

    <div class="article-reader-wrapper">
      <div-header :header="'All Readers'"></div-header>
      <readers :readerList="articleFeedback.readUidList" :dialogTitle="'All Readers'"></readers>
    </div>

    <div class="article-reader-wrapper">
      <div-header :header="'Agreed Readers'"></div-header>
      <readers :readerList="articleFeedback.agreeUidList" :dialogTitle="'Agreed Readers'"></readers>
    </div>

    <div class="article-reader-wrapper">
      <div-header :header="'Shared Readers'"></div-header>
      <readers :readerList="articleFeedback.shareUidList" :dialogTitle="'Shared Readers'"></readers>
    </div>
  </div>
</template>

<script>
  import {Button, Message} from 'element-ui'
  import {mapState, mapMutations, mapActions} from 'vuex'
  import Readers from "../article/Readers.vue";
  import DivHeader from '../layout/DivHeader.vue'
  import {router, store} from '../../main'

  export default {
    name: 'articleList-list',
    components: {
      Message,
      Readers,
      elButton: Button,
      DivHeader
    },
    data() {
      return {
        agreed: this.user === null ? false : this.articleFeedback.agreeUidList.indexOf(this.user.uid) !== -1,
        shared: this.user === null ? false : this.articleFeedback.shareUidList.indexOf(this.user.uid) !== -1,
        agreedNumber: this.articleFeedback.agreeNum,
        sharedNumber: this.articleFeedback.shareNum,
        time: 0
      }
    },
    props: ['article', 'articleFeedback', 'user'],
    computed: {
      ...mapState('article', {
        comment: state => state.comment,
      })
    },
    created() {
      this.time = new Date().getTime();
    },
    destroyed() {
      if (this.user !== null) {
        const time = new Date().getTime() - this.time;
        const feedbackInfo = {
          uid: this.user.uid,
          region: this.user.region,
          category: this.article.category,
          aid: this.article.aid,
          readTimeLength: time,
          timestamp: new Date().getTime(),
          readSequence: 2,
          readOrNot: 1,
          agreeOrNot: this.agreed ? 1 : 0,
          commentOrNot: this.comment === undefined ? 0 : 1,
          commentDetail: this.comment === undefined ? '' : this.comment,
          shareOrNot: this.shared ? 1 : 0
        };
        this.feedback({
          feedbackInfo,
          onSuccess: (success) => {
            if (time < 60000) {
              Message.success('You have read the article for ' + (time / 1000).toFixed(0) + ' seconds : )')
            } else {
              Message.success('You have read the article for ' + (time / 60000).toFixed(0) + ' minutes : )')
            }
          },
          onError: (error) => {
            Message.error(error)
          }
        })
      }
    },
    methods: {
      ...mapActions('article', [
        'feedback'
      ]),
      checkSignIn() {
        if (this.user === null) {
          Message.warning('Please sign in first!');
          router.push({name: 'LoginPage'});
          return false
        }
        return true
      },
      agree() {
        if (this.checkSignIn()) {
          this.agreed = true;
          this.agreedNumber++;
        }
      },
      cancelAgree() {
        if (this.checkSignIn()) {
          this.agreed = false;
          this.agreedNumber--;
        }
      },
      share() {
        if (this.checkSignIn()) {
          this.shared = true;
          this.sharedNumber++;
        }
      },
      cancelShare() {
        if (this.checkSignIn()) {
          this.shared = false;
          this.sharedNumber--;
        }
      }
    }
  }
</script>

<style scoped src="./Article.css"></style>
