<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <user-info :user="user"></user-info>
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
    computed: {
      ...mapState('auth', {
        user: state => state.user
      })
    },
    methods: {},
    beforeRouteEnter(to, from, next) {
      store.dispatch('auth/refreshUser', {
        onSuccess: (success) => {
        },
        onError: (error) => {
          Message.error(error)
          router.push({name: 'IndexPage'})
        }
      });
      next(true)
    }
  }
</script>
