<template>
  <div id="contents">
    <GmapMap
      id="gmap"
      ref="gmap"
      :center="{lat: 0, lng: 0}"
      :zoom="1.6"
      map-type-id="hybrid"
      :options="gmapOptions"
      @click="clickCountry"
    ></GmapMap>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// @ts-ignore
import { gmapApi } from 'vue2-google-maps'
// @ts-ignore
import { countryModule } from '@/store/modules/country'
declare var google: any
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

  get country() {
    return countryModule.country
  }

  clickCountry(e: any) {
    const latLng = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng())
    new google.maps.Geocoder().geocode(
      { latLng } as any,
      (results: any, status: any) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            let country: string = ''
            let countryCode = null

            for (let r = 0, rl = results.length r < rl r += 1) {
              const result = results[r]

              if (!country && result.types[0] === 'country') {
                country = result.address_components[0].long_name
                countryModule.CHANGE_NAME(country)
                countryCode = result.address_components[0].short_name
                console.log(this.country)
              }
            }

            console.log(
              'Country: ' + country + ', Country Code: ' + countryCode
            )
          }
        }
      }
    )
  }
}
</script>

<style scoped>
#gmap {
  width: 768px
  min-height: 768px
  padding: 0
}
</style>
