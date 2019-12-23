<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <div class="table-wrapper">
          <div-header :header="'Workers'"></div-header>
          <monitor-table :monitorData="monitorData"></monitor-table>
        </div>

        <div v-for="singleWorker in monitorData">
          <single-worker :workerData="singleWorker" :key="singleWorker.url"></single-worker>
        </div>
      </div>
    </layout>
  </div>

</template>

<script>
  import Layout from '../components/layout/Layout.vue'
  import MonitorTable from '../components/monitor/MonitorTable.vue'
  import SingleWorker from '../components/monitor/SingleWorker.vue'
  import {store} from '../main'
  import {mapState} from 'vuex'
  import DivHeader from "../components/layout/DivHeader.vue";

  export default {
    name: 'monitor-page',
    components: {
      DivHeader,
      Layout,
      MonitorTable,
      SingleWorker
    },
    data() {
      return {}
    },
    computed: {
      ...mapState('monitor', {
        monitorData: state => state.monitorData
      })
    },
    beforeRouteUpdate(to, from, next) {
      store.dispatch('monitor/fetchMonitorData');
      next(true)
    },
    beforeRouteEnter(to, from, next) {
      store.dispatch('monitor/fetchMonitorData');
      next(true)
    },
    methods: {}
  }
</script>

<style scoped src="./MonitorPage.css"></style>
