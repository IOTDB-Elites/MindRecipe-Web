<template>
  <div class="reader-wrapper">
    <div>
      <div class="reader" v-for="item in sublist" :key="item">
        <el-tooltip effect="dark" :content="'user' + item" placement="bottom">
          <el-avatar>user{{item}}</el-avatar>
        </el-tooltip>
      </div>
      <span class="other-reader-wrapper" v-if="readerList.length > 10">
        and <span class="other-reader" @click="openDetailedReader">other {{readerList.length - 10}} people</span>
        ...
      </span>
    </div>

    <el-dialog
      fullscreen
      :title="dialogTitle"
      :visible.sync="detailedReader">
      <div class="reader" v-for="item in readerList" :key="item">
        <el-tooltip effect="dark" :content="'user' + item" placement="bottom">
          <el-avatar>user{{item}}</el-avatar>
        </el-tooltip>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import {Avatar, Dialog, Tooltip, Message} from 'element-ui'
  import {mapState} from 'vuex'

  export default {
    name: 'readers',
    components: {
      Message,
      elAvatar: Avatar,
      elDialog: Dialog,
      elTooltip: Tooltip
    },
    data() {
      return {
        detailedReader: false,
        sublist: this.readerList.slice(0, 10)
      }
    },
    props: ['readerList', 'dialogTitle'],
    methods: {
      openDetailedReader() {
        this.detailedReader = true
      }
    }
  }
</script>

<style scoped src="./Readers.css"></style>
