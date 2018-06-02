<template>
    <canvas/>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: 'chartjs',
  props: ['data'],
  mounted () {
    /* eslint-disable */
    new Chart(this.$el, this.data);
    this.$watch(() => {
      return this.data.data.datasets;
    }, () => {
      new Chart(this.$el, this.data);
    });
  }
}
</script>
