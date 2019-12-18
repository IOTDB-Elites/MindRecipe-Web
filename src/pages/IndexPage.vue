<template>
  <div class="body-wrapper">
    <layout>
      <div class="container">
        <div class="map-wrapper">
          <div-header :header="'Reading List'"></div-header>
        </div>

        <div class="right-wrapper">
          <div class="config-wrapper">
            <div-header :header="'User Info'"></div-header>
          </div>
          <div class="rank-wrapper">
            <div-header :header="'Popular Rank'"></div-header>
          </div>
        </div>
      </div>
    </layout>
  </div>

</template>

<script>
  import Layout from '../components/layout/Layout.vue'
  import DivHeader from '../components/layout/DivHeader.vue'

  import { Message } from 'element-ui'

  export default {
    name: 'index-page',
    components: {
      Layout,
      Message,
      DivHeader,
    },
    data () {
      return {}
    }
  }
</script>

<style scoped src="./IndexPage.css"></style>
