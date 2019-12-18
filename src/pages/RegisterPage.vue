<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <register-form></register-form>

      </div>
    </layout>
  </div>

</template>

<script>
  import Layout from '../components/layout/Layout.vue'
  import RegisterForm from '../components/auth/RegisterForm.vue'

  export default {
    name: 'register-page',
    components: {
      Layout,
      RegisterForm
    },
    data () {
      return {}
    },
    methods: {}
  }
</script>
