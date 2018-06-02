<template>
  <div>
    <h1>Chart</h1>
    <chartjs v-if="data.data.datasets[0].data.length" :data="data"/>
  </div>
</template>

<script>
import Chartjs from '../components/Chartjs'

export default {
  name: 'chart',
  components: { Chartjs },
  mounted () {
    const hour = 1000 * 60 * 60
    const timeline = []
    for (let i = 0; i < 7; i++) {
      let time = new Date(Date.now() - (new Date().getTimezoneOffset() * 60 * 1000) - (hour * i)).toISOString()
      time = time.substring(0, 13)
      time = time.replace(/[-T]/g, '')
      timeline.push(time + '00')
    }
    this.data.data.datasets = []
    this.data.data.datasets.push({
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    })
    this.data.data.datasets.push({
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    })
    this.data.data.datasets.push({
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    })
    this.$bus.getAirQualityTimeline(timeline).then(list => {
      list.forEach((data) => {
        this.data.data.labels.push(data.MSRDT)
        this.data.data.datasets[0].label = `${data.MSRSTE_NM} 미세먼지 1시간`
        this.data.data.datasets[0].data.push(data.PM10)
        this.data.data.datasets[1].label = `${data.MSRSTE_NM} 미세먼지 24시간`
        this.data.data.datasets[1].data.push(data.PM24)
        this.data.data.datasets[2].label = `${data.MSRSTE_NM} 초미세먼지`
        this.data.data.datasets[2].data.push(data.PM25)
      })
    })
  },
  data () {
    return {
      MSRSTE_NM: '',
      data: {
        type: 'bar',
        data: {
          labels: [],
          datasets: [{data: []}]
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          }
        }
      }
    }
  }
}
</script>
