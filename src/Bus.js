import Vue from 'vue'
import axios from 'axios'

export default new Vue({
  data () {
    const user = localStorage.getItem('user') || null
    return {
      user: user,
      isLogin: Boolean(user),
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
    getAirQualityTimeline (timeline) {
      return this.getLocation().then((guName) => {
        return Promise.all(timeline.map((time) => {
          return axios.get(`http://openapi.seoul.go.kr:8088/746a5361636a6f7337336e4f656579/json/TimeAverageCityAir/1/25/${time}`)
        })).then((responses) => {
          return responses.reduce((acc, response) => {
            if (response.data.TimeAverageCityAir) {
              response.data.TimeAverageCityAir.row.forEach(item => {
                if (item.MSRSTE_NM === guName) {
                  acc.push(item)
                  return false
                }
              })
            }
            return acc
          }, [])
        })
      })
    },
    getAirQuality () {
      return this.getLocation().then((guName) => {
        return axios.get('http://openapi.seoul.go.kr:8088/746a5361636a6f7337336e4f656579/json/RealtimeCityAir/1/25').then((response) => {
          const airData = response.data.RealtimeCityAir.row
          let data = null
          airData.forEach(item => {
            if (item.MSRSTE_NM === guName) {
              data = item
              return false
            }
          })
          return data
        })
      })
    },
    getLocation () {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
          const tm128 = naver.maps.TransCoord.fromLatLngToTM128(new naver.maps.LatLng(position.coords.latitude, position.coords.longitude))
          naver.maps.Service.reverseGeocode({
            location: tm128,
            coordType: naver.maps.Service.CoordType.TM128
          }, (status, response) => {
            if (status === naver.maps.Service.Status.ERROR) {
              alert('Something Wrong!')
              reject(new Error())
              return
            }
            const items = response.result.items
            const guName = items[0].addrdetail.sigugun
            resolve(guName)
          })
        })
      })
    }
  }
})
