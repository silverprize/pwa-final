<template>
  <div v-if="data" :class="qualityClass">
    <h1>{{ data.MSRSTE_NM }}</h1>
    <div v-if="qualityClass === 'good'" class="icon">
      <i class="far fa-smile"></i>
    </div>
    <div v-if="qualityClass === 'normal'" class="icon">
      <i class="fas fa-meh"></i>
    </div>
    <div v-if="qualityClass === 'bad'" class="icon">
      <i class="fas fa-frown"></i>
    </div>
    <h3>{{data.IDEX_MVL}}</h3>
    <h3>{{ data.IDEX_NM }}</h3>
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
  computed: {
    qualityClass () {
      if (this.data.IDEX_MVL < 50) return 'good'
      else if (this.data.IDEX_MVL < 60) return 'normal'
      else return 'bad'
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
.icon {
  font-size: 10rem;
}
  .good {
    color: olive;
  }

  .normal {
    color: cornflowerblue;
  }

  .bad {
    color: firebrick;
  }
</style>
