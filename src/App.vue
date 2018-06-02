<template>
  <div id="app">
    <div v-if="$bus.loading" ref="loader" class="loader"></div>
    <gnb class="gnb"></gnb>
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
  body {
    margin: 0;
    padding: 0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  margin:0;
  padding:0;
}

  .loader {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: progress;
  }
</style>
