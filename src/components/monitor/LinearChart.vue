<template>

  <div ref="linearChart" :style="{width: '45%', height: '300px'}"></div>

</template>

<script type="text/babel">
  import echarts from 'echarts'
  import {mapActions, mapState, mapMutations} from 'vuex'

  export default {
    name: 'linear-chart',
    components: {},
    data() {
      return {
        xList: [],
        yList: []
      }
    },
    props: ['y', 'title'],
    watch: {
      y() {
        if (this.yList.length > 50) {
          this.xList.shift();
          this.yList.shift();
        }
        this.yList.push(parseFloat(this.y));
        this.xList.push(new Date().getMinutes() + ':' + new Date().getSeconds());
        this.setEchart()
      }
    },
    methods: {
      setEchart() {
        let myChart = echarts.init(this.$refs.linearChart);
        let option = {
          title:{
            text: this.title,
            x: 'center',
          },
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'category',
            data: this.xList
          },
          yAxis: {
            type: 'value',
            max: 'dataMax',
            min: 'dataMin',
            boundaryGap: [0, '100%'],
          },
          series: [{
            type: 'line',
            data: this.yList
          }]
        };
        myChart.setOption(option)
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.setEchart()
      })
    }
  }
</script>
