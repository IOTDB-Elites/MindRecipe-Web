<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <div class="article-wrapper">
          <div-header :header="'Reading List'"></div-header>
          <div class="radio-button-wrapper">
            <el-radio-group v-model="category" size="mini">
              <el-radio-button label="Science"></el-radio-button>
              <el-radio-button label="Technology"></el-radio-button>
            </el-radio-group>
          </div>
          <article-list></article-list>
        </div>

        <div class="right-wrapper">
          <!--<div class="config-wrapper">-->
          <!--<div-header :header="'User Info'"></div-header>-->
          <!--</div>-->
          <div class="rank-wrapper">
            <div-header :header="'Popular Rank'"></div-header>
            <div class="radio-button-wrapper">
              <el-radio-group v-model="temporalGranularity" size="mini">
                <el-radio-button label="Daily"></el-radio-button>
                <el-radio-button label="Weekly"></el-radio-button>
                <el-radio-button label="Monthly"></el-radio-button>
              </el-radio-group>
            </div>
            <brief-article-list></brief-article-list>
          </div>
        </div>
      </div>
    </layout>
  </div>

</template>

<script>
  import Layout from '../components/layout/Layout.vue'
  import DivHeader from '../components/layout/DivHeader.vue'

  import {RadioGroup, RadioButton, Message} from 'element-ui'
  import ArticleList from "../components/articleList/ArticleList.vue";
  import BriefArticleList from "../components/articleList/BriefArticleList.vue";

  export default {
    name: 'index-page',
    components: {
      ArticleList,
      BriefArticleList,
      Layout,
      Message,
      elRadioGroup: RadioGroup,
      elRadioButton: RadioButton,
      DivHeader,
    },
    data() {
      return {
        temporalGranularity: 'Daily',
        category: 'Science'
      }
    }
  }
</script>

<style scoped src="./IndexPage.css"></style>
