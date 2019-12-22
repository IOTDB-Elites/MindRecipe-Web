<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <user-info v-if="user !== null" :user="user"></user-info>
      </div>
    </layout>
  </div>

</template>

<script>
  import Layout from '../components/layout/Layout.vue'
  import UserInfo from '../components/admin/UserInfo.vue'
  import {Row, Message} from 'element-ui'
  import {router, store} from '../main'
  import {mapState} from 'vuex'

  export default {
    name: 'home-page',
    components: {
      Layout,
      UserInfo,
      Message
    },
    data() {
      return {}
    },
    methods: {},
    computed: {
      ...mapState('auth', {
        user: state => state.user
      })
    }
  }
</script>
