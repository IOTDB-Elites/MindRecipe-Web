<template>
  <div class="single-worker-wrapper">
    <div-header :header="'worker ' + workerData.url"></div-header>
    <linear-chart class="linear-chart" :y="workerData.info.cpu"></linear-chart>
    <linear-chart class="linear-chart" :y="workerData.info.memory"></linear-chart>
  </div>

</template>

<script>
  import Vue from 'vue'
  import {Table, TableColumn} from 'element-ui'
  import {mapState} from 'vuex'
  import DivHeader from "../layout/DivHeader.vue";
  import LinearChart from "./LinearChart.vue";

  export default {
    name: 'SingleWorker',
    components: {
      LinearChart,
      DivHeader,
      elTable: Table,
      elTableColumn: TableColumn
    },
    data() {
      return {}
    },
    props: ['workerData'],
    methods: {}
  }
</script>

<style scoped src="./SingleWorker.css"></style>
