import Vue from 'vue'
import axios from 'axios'

export default new Vue({
  data () {
    return {
      // user: null,
      // isLogin: false,
      user: {},
      isLogin: true,
      mapContentLoaded: false,
      loading: false
    }
  },
  watch: {
    user () {
      this.isLogin = Boolean(this.user)
    }
  },
  methods: {
    getAirQuality () {
      return axios.get('http://openapi.seoul.go.kr:8088/746a5361636a6f7337336e4f656579/json/RealtimeCityAir/1/25')
    }
  }
})
