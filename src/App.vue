<template>
  <div id="app">
    <gnb></gnb>
    <router-view/>
  </div>
</template>

<script>
import gnb from './components/gnb'

export default {
  name: 'App',
  components: {
    gnb
  },
  created () {
    naver.maps.onJSContentLoaded = () => {
      this.$bus.mapContentLoaded = true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
