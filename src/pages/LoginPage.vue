<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <login-form></login-form>

      </div>
    </layout>
  </div>

</template>

<script>
  import Layout from '../components/layout/Layout.vue'
  import LoginForm from '../components/auth/LoginForm.vue'

  export default {
    name: 'login-page',
    components: {
      Layout,
      LoginForm
    },
    data () {
      return {}
    },
    methods: {}
  }
</script>

<!--<style scoped src="./LoginPage.css"></style>-->
