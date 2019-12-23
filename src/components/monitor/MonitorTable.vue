<template>
  <div>
    <div v-if="monitorData === null" :style="{textAlign: 'center'}">
    <img src="../../assets/img/loading.gif" width="200"/>
    </div>
    <div v-else>
      <el-table
        :data="monitorData"
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          width="100">
        </el-table-column>
        <el-table-column
          prop="status"
          label="Status"
          width="100">
        </el-table-column>
        <el-table-column
          prop="url"
          label="URL">
        </el-table-column>
        <el-table-column
          prop="location"
          label="Location"
          width="250">
        </el-table-column>
        <el-table-column
          prop="info.disk"
          label="Disk">
        </el-table-column>
        <el-table-column
          prop="info.memory"
          label="Memory">
        </el-table-column>
        <el-table-column
          prop="info.cpu"
          label="CPU">
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue'
  import {Table, TableColumn} from 'element-ui'
  import {mapState} from 'vuex'

  export default {
    name: 'MonitorTable',
    components: {
      elTable: Table,
      elTableColumn: TableColumn
    },
    data() {
      return {}
    },
    props: ['monitorData'],
    methods: {}
  }
</script>
