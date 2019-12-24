<template>
  <div>
    <div v-if="monitorData === null" :style="{textAlign: 'center'}">
      <img src="../../assets/img/loading.gif" width="200"/>
    </div>
    <div v-else>
      <el-table
        :data="monitorData.slice(0, 2)"
        stripe
        :align="'center'"
        style="width: 100%">
        <el-table-column
          type="index"
          width="100">
        </el-table-column>
        <el-table-column
          prop="status"
          label="Status"
          width="100">
          <template slot-scope="scope">
            <div slot="reference">
              <el-tag type="success" size="medium">{{ scope.row.status }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="url"
          label="URL">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.url }}</span>
          </template>
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
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleAdd(scope.$index, scope.row)">Add DBMS
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-table
        :data="monitorData.slice(2)"
        :showHeader="false"
        v-if="monitorData.length > 2"
        :align="'center'"
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          width="100">
          <template slot-scope="scope">
            <span>{{scope.$index + 3}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="Status"
          width="100">
          <template slot-scope="scope">
            <div slot="reference">
              <el-tag type="success" size="medium">{{ scope.row.status }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="url"
          label="URL">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.url }}</span>
          </template>
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
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)">Delete DBMS
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue'
  import {Table, TableColumn, Button, Message, Tag, MessageBox} from 'element-ui'
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'MonitorTable',
    components: {
      elTable: Table,
      elButton: Button,
      elTableColumn: TableColumn,
      elTag: Tag,
      Message
    },
    data() {
      return {}
    },
    props: ['monitorData'],
    methods: {
      ...mapActions('monitor', [
        'addDBMS',
        'deleteDBMS'
      ]),
      handleAdd(index, row) {
        MessageBox.prompt('Please input ip address:', 'New DBMS', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
//          inputPattern: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
//          inputErrorMessage: 'Wrong IP address format'
        }).then(({value}) => {
          this.addDBMS({
            ip: value,
            db_port: row.url.endsWith('1') ? '10001' : '10002'
          });
          Message.success('Your new DBMS IP address: ' + value)
        }).catch(() => {
          Message.info('Cancel adding new DBMS');
        });
      },
      handleDelete(index, row) {
        MessageBox.confirm('Delete DBMS' + row.url + '? This will not be recovered!', 'Delete DBMS', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.deleteDBMS({
            ip: row.url
          });
          Message.success('Successfully deleted!')
        }).catch(() => {
          Message.info('Cancel deleting');
        });
      }
    }
  }
</script>
