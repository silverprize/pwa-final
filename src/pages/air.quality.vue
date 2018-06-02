<template>
  <div v-if="data">
    {{ data.MSRSTE_NM }}, {{ data.IDEX_NM }}, {{ data.IDEX_MVL }}
  </div>
</template>

<script>
import mockData from '../air'
import axios from 'axios'

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
      console.log('good')
      navigator.geolocation.getCurrentPosition((position) => {
        var tm128 = naver.maps.TransCoord.fromLatLngToTM128(new naver.maps.LatLng(position.coords.latitude, position.coords.longitude));

        naver.maps.Service.reverseGeocode({
          location: tm128,
          coordType: naver.maps.Service.CoordType.TM128
        }, (status, response) => {
          if (status === naver.maps.Service.Status.ERROR) {
            return alert('Something Wrong!');
          }

          var items = response.result.items,
            htmlAddresses = [];
          axios.get('http://openapi.seoul.go.kr:8088/746a5361636a6f7337336e4f656579/json/RealtimeCityAir/1/25').then((res) => {
            const guName = items[0].addrdetail.sigugun
            let data = null
            res.data.RealtimeCityAir.row.forEach(item => {

              console.log(item)
              if (item.MSRSTE_NM === guName) {
                data = item;
                return false;
              }
            })
            this.data = data
          })
        });
      });
    }
  },
  destroyed () {
    this.data = null
  }
}
//
// function searchCoordinateToAddress(latlng) {
//   var tm128 = naver.maps.TransCoord.fromLatLngToTM128(latlng);
//
//   naver.maps.Service.reverseGeocode({
//     location: tm128,
//     coordType: naver.maps.Service.CoordType.TM128
//   }, function(status, response) {
//     if (status === naver.maps.Service.Status.ERROR) {
//       return alert('Something Wrong!');
//     }
//
//     var items = response.result.items,
//       htmlAddresses = [];
//
//     for (var i=0, ii=items.length, item, addrType; i<ii; i++) {
//       item = items[i];
//       addrType = item.isRoadAddress ? '[도로명 주소]' : '[지번 주소]';
//
//       htmlAddresses.push((i+1) +'. '+ addrType +' '+ item.address);
//     }
//
//     infoWindow.setContent([
//       '<div style="padding:10px;min-width:200px;line-height:150%;">',
//       '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
//       htmlAddresses.join('<br />'),
//       '</div>'
//     ].join('\n'));
//
//     infoWindow.open(map, latlng);
//   });
// }
</script>

<style scoped>

</style>
