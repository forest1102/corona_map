<template>
<div id="contents">
  <GmapMap id="gmap" ref="gmap" :center="{lat: 0, lng: 0}" :zoom="1.6" map-type-id="hybrid" :options="gmapOptions" @click="clickCountry"></GmapMap>
</div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { gmapApi } from 'vue2-google-maps'

@Component({})
export default class App extends Vue {
  gmapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    disableDefaultUi: false,
    draggable: true,
    minZoom: 1.6,
    maxZoom: 4
  }
  get google() {
    return gmapApi
  }
  mounted() {
    this.$refs.gmap.$mapPromise.then((map) => {})
  }

  clickCountry(e) {
    const latLng = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
    new google.maps.Geocoder().geocode({ latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          let country = null
          let countryCode = null

          for (let r = 0, rl = results.length; r < rl; r += 1) {
            const result = results[r]

            if (!country && result.types[0] === 'country') {
              country = result.address_components[0].long_name
              countryCode = result.address_components[0].short_name
            }
          }

          console.log('Country: ' + country + ', Country Code: ' + countryCode)
        }
      }
    })
  }
}
</script>

<style scoped>
#gmap {
  width: 768px;
  min-height: 768px;
  padding: 0;
}
</style>
