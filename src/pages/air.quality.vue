<template>
  <div v-if="data">
    {{ data.MSRSTE_NM }}, {{ data.IDEX_NM }}, {{ data.IDEX_MVL }}
  </div>
</template>

<script>

export default {
  name: 'air_quality',
  data () {
    return {
      position: null,
      data: null
    }
  },
  created () {
    if (this.$bus.mapContentLoaded) this.getPosition()
    else {
      this.$watch('$bus.mapContentLoaded', this.getPosition)
    }
  },
  methods: {
    getPosition () {
      this.$bus.loading = true
      navigator.geolocation.getCurrentPosition((position) => {
        const tm128 = naver.maps.TransCoord.fromLatLngToTM128(new naver.maps.LatLng(position.coords.latitude, position.coords.longitude));

        naver.maps.Service.reverseGeocode({
          location: tm128,
          coordType: naver.maps.Service.CoordType.TM128
        }, (status, response) => {
          if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something Wrong!');
          }

          const items = response.result.items
          this.$bus.getAirQuality().then((res) => {
            const guName = items[0].addrdetail.sigugun
            let data = null
            res.data.RealtimeCityAir.row.forEach(item => {
              if (item.MSRSTE_NM === guName) {
                data = item;
                return false;
              }
            })
            this.data = data
            this.$bus.loading = false
          })
        });
      });
    }
  },
  destroyed () {
    this.data = null
  }
}
</script>

<style scoped>

</style>
